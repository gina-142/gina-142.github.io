console.log("JavaScript is connected!");

fetch("page_data.json")
    .then(res => res.json())
    .then(data => {

        const timeline = document.getElementById("timeline");

        let leftBottom = 0;
        let rightBottom = 0;
        const spacing = 70;
        const sideOffset = 30;

        data.events.forEach((event, index) => {
            const a = document.createElement("a");
            a.className = "timeline_link";
            a.dataset.caseType = event.case_type;

            if (event.case_type === "major_study") {
                a.href = event.href;
            } else {
                a.dataset.popup = event.href;
            }

            const bubble = document.createElement("div");
            const sideClass = index % 2 === 0 ? "left" : "right";
            bubble.className = `bubble ${sideClass}`;

            const content = document.createElement("div");
            content.className = "content";

            const title = document.createElement("h2");
            title.textContent = `${event.id} (${event.year})`;

            const body = document.createElement("p");
            body.textContent = event.text;

            content.appendChild(title);
            content.appendChild(body);
            bubble.appendChild(content);
            a.appendChild(bubble);
            timeline.appendChild(a);

            const bubbleRect = bubble.getBoundingClientRect();
            const timelineRect = timeline.getBoundingClientRect();
            const centerX = timelineRect.left + timelineRect.width / 2;
            let topPosition;

            if (sideClass === "left") {
                topPosition = leftBottom;
                bubble.style.top = `${topPosition}px`;
                const height = bubble.offsetHeight;
                leftBottom = topPosition + height + spacing;
                connectorWidth = centerX - bubbleRect.right;
                bubble.style.setProperty('--connector-width', `${connectorWidth}px`);

            } else {
                topPosition = rightBottom + sideOffset;
                bubble.style.top = `${topPosition}px`;
                const height = bubble.offsetHeight;
                rightBottom = topPosition + height + spacing;
                connectorWidth = bubbleRect.left - centerX;
                bubble.style.setProperty('--connector-width', `${connectorWidth}px`);
            }

        });
        timeline.style.height = `${Math.max(leftBottom, rightBottom)}px`;

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

