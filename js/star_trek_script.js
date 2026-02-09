console.log("JavaScript is connected!");

fetch("references.json")
    .then(res => res.json())
    .then(data => {
        const references = document.getElementById("references");

        data.events.forEach(event => {
            const content = document.createElement("div");
            content.className = "reference";

            const p = document.createElement("p");
            p.className = "reference_text";
            p.textContent = "test";

            content.appendChild(p);
            references.appendChild(content)
        });
    })
    .catch(err => console.error(err));