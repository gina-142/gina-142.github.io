console.log("JavaScript is connected!");

// Bubble generator
fetch("page_data.json")
  .then(res => res.json())
  .then(data => {
    const timeline = document.getElementById("timeline");
    const spacing = 30;
    const sideOffset = 30;

    const bubbles = data.events.map((event, index) => {
      const a = document.createElement("a");
      a.className = "timeline_link";
      a.dataset.caseType = event.case_type;

      if (event.case_type === "major_study") {
        a.href = event.href;
      } else {
        a.dataset.popup = `#${event.name}`;
      }

      const bubble = document.createElement("div");
      bubble.className = `bubble ${index % 2 === 0 ? "left" : "right"}`;

      const content = document.createElement("div");
      content.className = "content";

      const title = document.createElement("h2");
      title.textContent = `${event.id} (${event.year})`;
      content.appendChild(title);

      let inner;
      if (event.case_type === "major_study") {
        inner = document.createElement("p");
        inner.textContent = event.text;
      } else {
        inner = document.createElement("img");
        inner.src = event.image;
        inner.style.borderRadius = "6px";
        inner.style.margin = "10px auto 0 auto"; // center the image
        inner.style.display = "block";
        if (event.vertical) {
            inner.style.maxWidth = "220px";     
        } else {
            inner.style.maxWidth = "320px";  
        }
      }

      content.appendChild(inner);
      bubble.appendChild(content);
      a.appendChild(bubble);
      timeline.appendChild(a);

      return bubble;
    });

    const images = timeline.getElementsByTagName("img");
    const totalImages = images.length;
    if (totalImages === 0) {
      positionBubbles(bubbles);
    } else {
      let loadedCount = 0;
      for (let img of images) {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            positionBubbles(bubbles);
          }
        };
      }
    }

    function positionBubbles(bubbles) {
      let leftBottom = 0;
      let rightBottom = 0;

      bubbles.forEach(bubble => {
        const sideClass = bubble.classList.contains("left") ? "left" : "right";
        let top;

        if (sideClass === "left") {
          top = leftBottom;
          bubble.style.top = `${top}px`;
          leftBottom = top + bubble.offsetHeight + spacing;
        } else {
          top = rightBottom + sideOffset;
          bubble.style.top = `${top}px`;
          rightBottom = top + bubble.offsetHeight + spacing;
        }

        const timelineRect = timeline.getBoundingClientRect();
        const centerX = timelineRect.left + timelineRect.width / 2;
        const bubbleRect = bubble.getBoundingClientRect();
        let connectorWidth = sideClass === "left"
          ? centerX - bubbleRect.right
          : bubbleRect.left - centerX;
        bubble.style.setProperty('--connector-width', `${connectorWidth}px`);
      });

      timeline.style.height = `${Math.max(leftBottom, rightBottom)}px`;
    }
  })
  .catch(err => console.error(err));

// Popup generator
fetch("page_data.json")
  .then(res => res.json())
  .then(data => {
    const modalsContainer = document.getElementById("modals");

    data.events.forEach(event => {
      if (event.case_type === "minor_study") {
        const modal = document.createElement("div");
        modal.className = "modal";
        modal.id = event.name;
        modal.style.display = "none";

        const content = document.createElement("div");
        content.className = "modal-content";

        const close = document.createElement("span");
        close.className = "close";
        close.innerHTML = "&times;";
        close.setAttribute("aria-label","Close");
        close.onclick = () => modal.style.display = "none";

        const title = document.createElement("h2");
        title.textContent = event.id;

        const body = document.createElement("p");
        body.textContent = event.text;

        content.appendChild(close);
        content.appendChild(title);
        content.appendChild(body);
        modal.appendChild(content);
        modalsContainer.appendChild(modal);
      }
    });
  })
  .catch(err => console.error(err));

// Button click listener
document.addEventListener('click', (e) => {
  const link = e.target.closest('a.timeline_link');
  if (!link) return;

  if (link.dataset.caseType === "minor_study") {
    e.preventDefault();

    const modal = document.querySelector(link.dataset.popup);
    if (!modal) return;

    modal.style.display = "block";

    const clickOutside = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        window.removeEventListener('click', clickOutside);
      }
    };
    window.addEventListener('click', clickOutside);
  } else {
  }
});
