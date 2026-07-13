const heroSlides = [...document.querySelectorAll(".hero-slide")];
let heroIndex = 0;

if (heroSlides.length > 0) {
  setInterval(() => {
    heroSlides[heroIndex].classList.remove("is-active");
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add("is-active");
  }, 4500);
}

const areaVisual = document.querySelector(".area-visual");
const areaCards = [...document.querySelectorAll(".area-card")];
const areaImages = {
  pet: "var(--area-pet)",
  human: "var(--area-human)",
  oem: "var(--area-oem)",
  future: "var(--area-future)",
};

const activateArea = (card) => {
  areaCards.forEach((item) => item.classList.remove("is-active"));
  card.classList.add("is-active");
  if (areaVisual) areaVisual.style.backgroundImage = areaImages[card.dataset.area];
};

areaCards.forEach((card) => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");

  card.addEventListener("mouseenter", () => activateArea(card));
  card.addEventListener("click", () => activateArea(card));
  card.addEventListener("focusin", () => activateArea(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      activateArea(card);
    }
  });
});

const tabGroups = [...document.querySelectorAll("[data-tabs]")];

tabGroups.forEach((group) => {
  const tabs = [...group.querySelectorAll("[role='tab'][data-tab-target]")];
  const panels = [...group.querySelectorAll("[role='tabpanel'][data-tab-panel]")];

  const activateTab = (tab) => {
    const target = tab.dataset.tabTarget;

    tabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
      item.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  };

  tabs.forEach((tab, index) => {
    tab.setAttribute("tabindex", tab.classList.contains("is-active") ? "0" : "-1");

    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      const keyMap = {
        ArrowRight: 1,
        ArrowDown: 1,
        ArrowLeft: -1,
        ArrowUp: -1,
      };

      if (event.key === "Home" || event.key === "End") {
        event.preventDefault();
        const nextTab = event.key === "Home" ? tabs[0] : tabs[tabs.length - 1];
        activateTab(nextTab);
        nextTab.focus();
      }

      if (event.key in keyMap) {
        event.preventDefault();
        const nextIndex = (index + keyMap[event.key] + tabs.length) % tabs.length;
        activateTab(tabs[nextIndex]);
        tabs[nextIndex].focus();
      }
    });
  });
});

document.body.classList.add("is-locked");

const header = document.querySelector(".site-header");
const revealItems = [
  ...document.querySelectorAll(
    ".section-label, .section-kicker, .philosophy-copy, .belief-lines p, .catalyst-inner > *, .mission-copy > *, .section-head, .area-card, .area-visual, .story-step, .brand-feature, .brand-coming, .future-copy, .recruit > *, .contact > *, .company-hero > *, .company-intro > *, .profile-list div, .company-visual > *, .enzyme-hero-copy > *, .enzyme-orbit, .enzyme-intro > *, .enzyme-fact-list div, .reaction-copy > *, .reaction-stage, .enzyme-type-grid article, .condition-layout article, .enzyme-regulation > *, .regulation-grid article, .digestion-grid article, .food-enzyme-layout article, .enzyme-classification > *, .history-track article, .fermentation-link > *, .microbiome-grid article, .enzyme-note > *, .hagumi-hero-copy > *, .hagumi-hero-panel, .hagumi-tab-list, .hagumi-tab-panel.is-active > *, .hagumi-note > *, .wankoso-hero-copy > *, .wankoso-hero-panel, .wankoso-tab-list, .wankoso-tab-panel.is-active > *, .wankoso-note > *, .pet-health-hero-copy > *, .pet-physio > *, .physio-fact-list div, .gap-copy > *, .gap-visual-inner > *, .postbiotics-grid article, .axis-layout article, .pet-health-summary > *",
  ),
];

revealItems.forEach((item, index) => {
  item.classList.add("reveal", `reveal-delay-${index % 4}`);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.08,
  },
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  { threshold: 0.28 },
);

document
  .querySelectorAll(".future, .mission, .catalyst, .company-visual")
  .forEach((section) => sectionObserver.observe(section));

const parallaxTargets = [
  { element: document.querySelector(".ghost-type"), strength: -0.08, axis: "x" },
  { element: document.querySelector(".mission-bg"), strength: 0.12, axis: "y" },
  { element: document.querySelector(".hero-media"), strength: 0.1, axis: "y" },
  { element: document.querySelector(".future-grid"), strength: -0.08, axis: "y" },
  { element: document.querySelector(".enzyme-orbit"), strength: -0.05, axis: "y" },
].filter((target) => target.element);

parallaxTargets.forEach(({ element }) => element.classList.add("parallax-soft"));

let ticking = false;

const updateMotion = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  if (header) header.classList.toggle("is-scrolled", scrollY > 80);

  parallaxTargets.forEach(({ element, strength, axis }) => {
    const rect = element.getBoundingClientRect();
    const centerOffset = rect.top + rect.height / 2 - window.innerHeight / 2;
    const movement = Math.max(Math.min(centerOffset * strength, 80), -80);
    const transform =
      axis === "x" ? `translate3d(${movement}px, 0, 0)` : `translate3d(0, ${movement}px, 0)`;
    element.style.transform = transform;
  });

  ticking = false;
};

const requestMotionUpdate = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateMotion);
    ticking = true;
  }
};

window.addEventListener("scroll", requestMotionUpdate, { passive: true });
window.addEventListener("resize", requestMotionUpdate);
updateMotion();
