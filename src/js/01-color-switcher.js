const refs = {
    start: document.querySelector("button[data-start]"),
    stop: document.querySelector("button[data-stop]"),
}
let timerId = null;
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.start.addEventListener("click", () => {
    if (timerId !== null) { return }
    timerId = setInterval(() => {
        const bodyEl = document.querySelector("body");
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000)

});
refs.stop.addEventListener("click", () => {
    clearInterval(timerId);
    timerId = null;
})


