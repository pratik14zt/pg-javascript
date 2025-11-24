const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach(item => {
    const title = item.querySelector(".accordion-title");
    const content = item.querySelector(".accordion-content");
    const arrow = item.querySelector(".arrow");

    title.addEventListener("click", () => {

        // Close other accordions
        accordionItems.forEach(other => {
            if (other !== item) {
                other.classList.remove("active");
                other.querySelector(".accordion-content").style.maxHeight = null;
                other.querySelector(".arrow").style.transform = "rotate(0deg)";
            }
        });

        // Toggle this one
        item.classList.toggle("active");

        if (item.classList.contains("active")) {
            content.style.maxHeight = content.scrollHeight + "px";
            arrow.style.transform = "rotate(180deg)";
        } else {
            content.style.maxHeight = null;
            arrow.style.transform = "rotate(0deg)";
        }
    });
});
