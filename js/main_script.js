console.log("JavaScript is connected!");

fetch("page_data.json")
    .then(res => res.json())
    .then(data => {
        const timeline = document.getElementById("timeline");

        data.events.forEach(event => {
            const a = document.createElement("a");
            a.className = "timeline_link";
            a.dataset.caseType = event.case_type;

            if (event.case_type == "major_study") {
                a.href = event.href;
            } else {
                a.dataset.popup = event.href;
            }

            const bubble = document.createElement("div");
            bubble.className = `bubble ${event.bubble_class}`;
            bubble.style.setProperty("--bubble_pos", event.bubble_pos);

            const content = document.createElement("div");
            content.className = "content";
            content.id = event.id;
            content.setAttribute("role", "button");

            const title = document.createElement("h2");
            title.textContent = `${event.id} (${event.year})`;

            const body = document.createElement("p");
            body.textContent = event.text;

            content.appendChild(title);
            content.appendChild(body);
            bubble.appendChild(content);
            a.appendChild(bubble);
            timeline.appendChild(a);
        });
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

