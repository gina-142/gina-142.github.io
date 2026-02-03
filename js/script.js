console.log("JavaScript is connected!");

const elements = document.querySelectorAll('[class="content"]');

if (elements.length === 0) {
    alert("Timeline button search failed.");
} else {
    elements.forEach(timeline_button => {
        timeline_button.addEventListener('click', () => {
            
        })
    });
}
