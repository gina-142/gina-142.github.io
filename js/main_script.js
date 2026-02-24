console.log("JavaScript is connected!");

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
        if(event.case_type === "major_study") {
            a.href = event.href
        } else {
            a.dataset.popup = event.href;
        }

        const bubble = document.createElement("div");
        bubble.className = `bubble ${index % 2 === 0 ? "left" : "right"}`;

        const content = document.createElement("div");
        content.className = "content";

        const title = document.createElement("h2");
        title.textContent = `${event.id} (${event.year})`;
        content.appendChild(title);

        let data;
        if(event.case_type === "major_study") {
            data = document.createElement("p");
            data.textContent = event.text;
        } else {
            data = document.createElement("img");
            data.src = event.image;
            data.style.borderRadius = "6px";
            data.style.marginTop = "10px";
        }

        content.appendChild(data);
        bubble.appendChild(content);
        a.appendChild(bubble);
        timeline.appendChild(a);

      return bubble;
    });

    const images = timeline.getElementsByTagName("img");
    const totalImages = images.length;
    if(totalImages === 0){
      positionBubbles(bubbles);
    } else {
      let loadedCount = 0;
      for(let img of images){
        img.onload = img.onerror = () => {
          loadedCount++;
          if(loadedCount === totalImages){
            positionBubbles(bubbles);
          }
        };
      }
    }

    function positionBubbles(bubbles){
      let leftBottom = 0;
      let rightBottom = 0;

      bubbles.forEach(bubble => {
        const sideClass = bubble.classList.contains("left") ? "left" : "right";
        let top;
        if(sideClass === "left"){
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

document.addEventListener('click', (e) => {
    const link = e.target.closest('a.timeline_link');

    if (!link) return;

    if (link.dataset.caseType == "minor_study") {
        e.preventDefault();
        const popupSelector = link.dataset.popup;
        const modal = document.querySelector(popupSelector);
        modal.style.display = 'block';

        modal.querySelector('.close').onclick = () => {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    } else {
        //window.location.assign(link.href);
    }
});

