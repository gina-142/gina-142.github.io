console.log("JavaScript is connected!");

fetch("references.json")
    .then(res => res.json())
    .then(data => {
        const references = document.getElementById("references");

        data.star_trek_refs.forEach((event, index) => {
            const content = document.createElement("div");
            content.className = "reference";

            const p = document.createElement("p");
            p.className = "reference_text";
            p.innerHTML = `<b>[${index+1}]</b>   ${event.authors}, "${event.paper_title}" <i>${event.journal_name}</i>, <b>${event.volume}</b>, ${event.issue}, (${event.year}), doi: ${event.doi}.`;

            content.appendChild(p);
            references.appendChild(content)
        });
    })
    .catch(err => console.error(err));