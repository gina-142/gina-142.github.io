console.log("JavaScript is connected!");

// Bubble generator
fetch("page_data.json")
  .then(res => res.json())
  .then(data => {
    const timeline = document.getElementById("timeline");
    const spineSpacing = 80;
    const sideSpacing = 30;

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
        //have both text...
        inner = document.createElement("div");
        const inner_text = document.createElement("p");
        inner_text.textContent = event.text;
        //...and image...
        const inner_img = document.createElement("img");
        inner_img.src = event.image;
        inner_img.style.borderRadius = "6px";
        inner_img.style.marginTop = "10px";
        inner_img.style.display = "block";
        inner_img.style.width = "100%";
        inner_img.style.height = "auto";
        //...in the same bubble
        inner.appendChild(inner_img);
        inner.appendChild(inner_text);
      } else {
        inner = document.createElement("img");
        inner.src = event.image;
        inner.style.borderRadius = "6px";
        inner.style.margin = "10px auto 0 auto";
        inner.style.display = "block";
        inner.style.maxWidth = event.vertical ? "220px" : "320px";
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
      positionBubbles();
    } else {
      let loadedCount = 0;
      for (let img of images) {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            positionBubbles();
          }
        };
      }
    }

    function positionBubbles() {
      let previousSpineY = 0;
      let leftBottom = 0;
      let rightBottom = 0;

      bubbles.forEach((bubble, index) => {
        const isLeft = bubble.classList.contains("left");
        const bubbleHeight = bubble.offsetHeight;

        const sideBottom = isLeft ? leftBottom : rightBottom;
        let spineY = index === 0 ? bubbleHeight / 2 : previousSpineY + spineSpacing;

        const minSpineForSide = sideBottom + (bubbleHeight / 2) + sideSpacing;
        spineY = Math.max(spineY, minSpineForSide);

        const top = spineY - (bubbleHeight / 2);
        bubble.style.top = `${top}px`;

        const newBottom = top + bubbleHeight;
        if (isLeft) leftBottom = newBottom;
        else rightBottom = newBottom;

        previousSpineY = spineY;
        const timelineRect = timeline.getBoundingClientRect();
        const centerX = timelineRect.left + timelineRect.width / 2;
        const bubbleRect = bubble.getBoundingClientRect();
        const connectorWidth = isLeft
          ? centerX - bubbleRect.right
          : bubbleRect.left - centerX;

        bubble.style.setProperty("--connector-width", `${connectorWidth}px`);
      });

      timeline.style.height = `${Math.max(leftBottom, rightBottom) + 100}px`;
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

        const ref = document.createElement("p");
        ref.textContent = event.reference;
        ref.style.fontStyle = "italic";

        content.appendChild(close);
        content.appendChild(title);
        content.appendChild(body);
        modal.appendChild(content);
        modalsContainer.appendChild(modal);
        content.appendChild(ref);
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
