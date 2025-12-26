const track = document.querySelector(".gallery-track");
const cards = document.querySelectorAll(".card");
const wrapper = document.querySelector(".gallery-wrapper");

let index = 0;
let focusMode = false;

/* ===============================
   CORE
   =============================== */
function updateCarousel() {
  cards.forEach(card => card.classList.remove("active"));
  cards[index].classList.add("active");

  const cardWidth = cards[0].offsetWidth + 32;
  const offset =
    -(index * cardWidth) +
    (window.innerWidth / 2 - cards[0].offsetWidth / 2);

  track.style.transform = `translateX(${offset}px)`;
}

updateCarousel();

/* ===============================
   TOUCH + CLICK GESTURE LOGIC
   =============================== */
let startX = 0;
let startY = 0;
let moved = false;

track.addEventListener("touchstart", e => {
  if (e.target.closest(".comment-box")) return;

  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  moved = false;
});

track.addEventListener("touchmove", e => {
  if (e.target.closest(".comment-box")) return;

  const dx = e.touches[0].clientX - startX;
  const dy = e.touches[0].clientY - startY;

  // vertical swipe → ignore carousel
  if (Math.abs(dy) > Math.abs(dx)) return;

  if (Math.abs(dx) > 40) {
    moved = true;

    if (dx < 0 && index < cards.length - 1) index++;
    if (dx > 0 && index > 0) index--;

    startX = e.touches[0].clientX;
    updateCarousel();
  }
});

/* ===============================
   FOCUS MODE TOGGLE (FIXED)
   =============================== */
cards.forEach(card => {
  const img = card.querySelector("img");

  // desktop click
  img.addEventListener("click", () => {
    if (!card.classList.contains("active")) return;

    focusMode = !focusMode;
    wrapper.classList.toggle("focus-mode", focusMode);
  });

  // mobile tap
  img.addEventListener("touchend", e => {
    if (moved) return; // ignore swipe
    if (!card.classList.contains("active")) return;

    focusMode = !focusMode;
    wrapper.classList.toggle("focus-mode", focusMode);
  });
});
