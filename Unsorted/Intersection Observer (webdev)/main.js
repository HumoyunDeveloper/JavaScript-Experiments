const cards = document.getElementsByClassName("card");

const intersectionObserver = new IntersectionObserver(_entries => {
    for (const entry of _entries) {
        entry.target.classList.toggle("show", entry.isIntersecting);
    }
});

for (const card of cards) {
    intersectionObserver.observe(card);
}
