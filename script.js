const heroSlides = [...document.querySelectorAll(".hero-slide")];
let heroIndex = 0;

setInterval(() => {
  heroSlides[heroIndex].classList.remove("is-active");
  heroIndex = (heroIndex + 1) % heroSlides.length;
  heroSlides[heroIndex].classList.add("is-active");
}, 5200);

const areaVisual = document.querySelector(".area-visual");
const areaCards = [...document.querySelectorAll(".area-card")];
const areaImages = {
  pet: "var(--area-pet)",
  human: "var(--area-human)",
  oem: "var(--area-oem)",
  future: "var(--area-future)",
};

areaCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    areaCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    areaVisual.style.backgroundImage = areaImages[card.dataset.area];
  });

  card.addEventListener("focusin", () => {
    areaCards.forEach((item) => item.classList.remove("is-active"));
    card.classList.add("is-active");
    areaVisual.style.backgroundImage = areaImages[card.dataset.area];
  });
});
