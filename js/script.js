console.log("JavaScript is connected!");

fetch("page_data.json")
    .then(res => res.json())
    .then(data => {
        const timeline = document.getElementById("timeline");
        console.log("Timeline div:", timeline);

        data.events.forEach(event => {
            const a = document.createElement("a");
            a.href = event.href;
            a.className = "timeline_link";

            const bubble = document.createElement("div");
            bubble.className = `bubble ${event.bubble_class}`;
            bubble.style.setProperty("--bubble_pos", event.bubble_pos);

            const content = document.createElement("div");
            content.className = "content";
            content.id = event.id;
            content.setAttribute("role", "button");

            const title = document.createElement("h2");
            title.textContent = event.year;

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

const elements = document.querySelectorAll('[class="content"]');

if (elements.length === 0) {
    alert("Timeline button search failed.");
} else {
    elements.forEach(timeline_button => {
        timeline_button.addEventListener('click', () => {
            
        })
    });
}
