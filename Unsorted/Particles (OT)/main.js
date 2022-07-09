let mouseActive = false;

window.addEventListener("mousedown", _ => {
    mouseActive = true;
});

window.addEventListener("mouseup", _ => {
    mouseActive = false;
});

window.addEventListener("mousemove", _ => {
    if (mouseActive) {
        let element = document.createElement("span");
        element.style.left = _.touches
            ? _e.touches[0].clientX
            : _.clientX - 10 + "px";
        element.style.top = _.touches
            ? _e.touches[0].clientY
            : _.clientY - 10 + "px";
        document.body.appendChild(element);
        element.style.animation = "fade-in 3s linear";
        element.addEventListener("animationend", () => {
            element.remove();
        });
    }
});
