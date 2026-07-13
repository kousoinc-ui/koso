// KOUSO Inc. — top page interactions

// Hero slideshow + dot indicators
const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".hero-dots button")];
let slideIndex = 0;
let slideTimer = null;

const showSlide = (next) => {
  slides[slideIndex].classList.remove("is-active");
  dots[slideIndex]?.classList.remove("is-active");
  slideIndex = (next + slides.length) % slides.length;
  slides[slideIndex].classList.add("is-active");
  dots[slideIndex]?.classList.add("is-active");
};

const startSlideshow = () => {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => showSlide(slideIndex + 1), 5200);
};

if (slides.length > 0) {
  startSlideshow();
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      startSlideshow();
    });
  });
}

// Header state on scroll
const header = document.getElementById("gh");
const onScroll = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 60);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Fullscreen menu
const burger = document.getElementById("ghBurger");
const menu = document.getElementById("ghMenu");

const setMenu = (open) => {
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", String(open));
  burger.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  menu.setAttribute("aria-hidden", String(!open));
};

burger.addEventListener("click", () => {
  setMenu(!document.body.classList.contains("menu-open"));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

// Tabs (wankoso / hagumi product panels)
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
      const keyMap = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
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

// Auto-apply reveal to sub-page content (skip elements inside tab panels
// so hidden panels never get stuck invisible)
if (document.body.classList.contains("sub-page")) {
  const autoSelector = [
    ".company-hero > p",
    ".company-hero > h1",
    ".enzyme-hero-copy > *",
    ".wankoso-hero-copy > *",
    ".hagumi-hero-copy > *",
    ".pet-health-hero-copy > *",
    ".wankoso-hero-panel",
    ".hagumi-hero-panel",
    ".section-label",
    ".section-kicker",
    ".section-head",
    ".section > h2",
    ".section > p",
    ".company-intro > div > *",
    ".profile-list > div",
    ".company-visual > div > *",
    ".enzyme-intro > div > *",
    ".enzyme-fact-list > div",
    ".reaction-copy > *",
    ".reaction-stage",
    ".enzyme-type-grid > article",
    ".condition-layout > article",
    ".enzyme-regulation > div > *",
    ".regulation-grid > article",
    ".digestion-grid > article",
    ".enzyme-classification > div > *",
    ".enzyme-classification ol > li",
    ".history-track > article",
    ".food-enzyme-layout > article",
    ".fermentation-link > div > *",
    ".fermentation-photo",
    ".microbiome-grid > article",
    ".enzyme-note > *",
    ".physio-fact-list > div",
    ".gap-copy > *",
    ".gap-visual-inner > *",
    ".postbiotics-grid > article",
    ".axis-layout > article",
    ".pet-health-summary > *",
    ".wankoso-note > *",
    ".hagumi-note > *",
    ".sub-hero > *",
    ".news-item",
    ".news-note",
    ".oem-intro > div > *",
    ".feature-grid > article",
    ".flow-steps > article",
    ".oem-cat-grid > article",
    ".oem-cta > *",
    ".policy-block",
    ".policy-updated",
  ].join(",");

  document.querySelectorAll(autoSelector).forEach((el) => {
    if (!el.closest("[role='tabpanel']")) el.classList.add("reveal");
  });
}

// Scroll reveal (staggered per viewport entry)
const revealItems = [...document.querySelectorAll(".reveal")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    let delay = 0;
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      target.style.transitionDelay = `${delay}ms`;
      target.classList.add("is-visible");
      revealObserver.unobserve(target);
      delay += 90;
    });
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
);

revealItems.forEach((item) => revealObserver.observe(item));
