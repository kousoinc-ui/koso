// KOUSO Inc. — top page interactions

// Hero slideshow + dot indicators
const slides = [...document.querySelectorAll(".hero-slide")];
const dots = [...document.querySelectorAll(".hero-dots button")];
const heroCount = document.querySelector(".hero-count b");
let slideIndex = 0;
let slideTimer = null;

const showSlide = (next) => {
  slides[slideIndex].classList.remove("is-active");
  dots[slideIndex]?.classList.remove("is-active");
  slideIndex = (next + slides.length) % slides.length;
  slides[slideIndex].classList.add("is-active");
  dots[slideIndex]?.classList.add("is-active");
  if (heroCount) heroCount.textContent = String(slideIndex + 1).padStart(2, "0");
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
const progressBar = document.querySelector(".page-progress span");
const heroMedia = document.querySelector(".hero-media");
const missionGhost = document.querySelector(".mission-ghost");
const companyBg = document.querySelector(".company-bg");
const mosaic = document.querySelector(".mosaic");
const wankoProductStage = document.querySelector(".wankoso-product-stage");
const wankoDailyGhost = document.querySelector(".wanko-daily-ghost");
const wankoFermentationImage = document.querySelector(".wanko-fermentation-media img");
const wankoShopProduct = document.querySelector(".wanko-shop-visual img");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionFrame = null;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const updateScrollMotion = () => {
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  const scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  const progress = scrollY / scrollMax;

  header?.classList.toggle("is-scrolled", scrollY > 60);
  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;

  if (!reduceMotion.matches) {
    if (heroMedia) heroMedia.style.transform = `translate3d(0, ${scrollY * 0.12}px, 0)`;

    if (mosaic) {
      const rect = mosaic.getBoundingClientRect();
      const range = Math.max(mosaic.offsetHeight - window.innerHeight, 1);
      const mosaicProgress = clamp(-rect.top / range, 0, 1);
      const inverse = 1 - mosaicProgress;
      mosaic.style.setProperty("--mosaic-progress", mosaicProgress.toFixed(4));
      mosaic.style.setProperty("--mosaic-scale", (1.05 + inverse * 0.11).toFixed(4));
      mosaic.style.setProperty("--mosaic-overlay", (0.18 + inverse * 0.08).toFixed(3));
      mosaic.style.setProperty("--mosaic-copy-opacity", (0.35 + mosaicProgress * 0.65).toFixed(3));
      mosaic.style.setProperty("--mosaic-copy-y", `${(inverse * 8).toFixed(2)}vh`);
      mosaic.style.setProperty("--panel-1-x", `${(inverse * -8).toFixed(2)}vw`);
      mosaic.style.setProperty("--panel-1-y", `${(inverse * -5).toFixed(2)}vh`);
      mosaic.style.setProperty("--panel-1-r", `${(inverse * -2).toFixed(2)}deg`);
      mosaic.style.setProperty("--panel-2-x", `${(inverse * 7).toFixed(2)}vw`);
      mosaic.style.setProperty("--panel-2-y", `${(inverse * -7).toFixed(2)}vh`);
      mosaic.style.setProperty("--panel-2-r", `${(inverse * 2).toFixed(2)}deg`);
      mosaic.style.setProperty("--panel-3-x", `${(inverse * -6).toFixed(2)}vw`);
      mosaic.style.setProperty("--panel-3-y", `${(inverse * 7).toFixed(2)}vh`);
      mosaic.style.setProperty("--panel-3-r", `${(inverse * 1.5).toFixed(2)}deg`);
      mosaic.style.setProperty("--panel-4-x", `${(inverse * 8).toFixed(2)}vw`);
      mosaic.style.setProperty("--panel-4-y", `${(inverse * 6).toFixed(2)}vh`);
      mosaic.style.setProperty("--panel-4-r", `${(inverse * -2).toFixed(2)}deg`);
    }

    if (missionGhost) {
      const rect = missionGhost.parentElement.getBoundingClientRect();
      const shift = clamp((window.innerHeight - rect.top) * 0.09, -30, 110);
      missionGhost.style.transform = `translate3d(${-shift}px, 0, 0)`;
    }

    if (companyBg) {
      const rect = companyBg.parentElement.getBoundingClientRect();
      const shift = clamp((window.innerHeight / 2 - rect.top) * 0.06, -45, 45);
      companyBg.style.transform = `translate3d(0, ${shift}px, 0) scale(1.06)`;
    }

    if (wankoProductStage) {
      const rect = wankoProductStage.getBoundingClientRect();
      const shift = clamp((window.innerHeight / 2 - rect.top) * 0.035, -20, 32);
      wankoProductStage.style.transform = `translate3d(0, ${shift}px, 0)`;
    }

    if (wankoDailyGhost) {
      const rect = wankoDailyGhost.parentElement.getBoundingClientRect();
      const shift = clamp((window.innerHeight - rect.top) * -0.075, -70, 30);
      wankoDailyGhost.style.transform = `translate3d(${shift}px, 0, 0)`;
    }

    if (wankoFermentationImage) {
      const section = wankoFermentationImage.closest(".wanko-fermentation");
      const rect = section.getBoundingClientRect();
      const shift = clamp(rect.top * -0.055, -45, 45);
      wankoFermentationImage.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
    }

    if (wankoShopProduct) {
      const rect = wankoShopProduct.parentElement.getBoundingClientRect();
      const shift = clamp((window.innerHeight - rect.top) * -0.035, -34, 18);
      wankoShopProduct.style.transform = `translate3d(0, ${shift}px, 0) rotate(${shift * -0.035}deg)`;
    }
  }

  motionFrame = null;
};

const requestScrollMotion = () => {
  if (motionFrame === null) motionFrame = window.requestAnimationFrame(updateScrollMotion);
};

window.addEventListener("scroll", requestScrollMotion, { passive: true });
window.addEventListener("resize", requestScrollMotion);
updateScrollMotion();

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
    ".oem-case-card",
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

// A small amount of pointer depth on visual cards. It is intentionally disabled
// for touch input and reduced-motion users.
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduceMotion.matches) {
  document.querySelectorAll(".biz-card, .brand-img, .know-card").forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      item.style.setProperty("--pointer-x", x.toFixed(3));
      item.style.setProperty("--pointer-y", y.toFixed(3));
    });
    item.addEventListener("pointerleave", () => {
      item.style.removeProperty("--pointer-x");
      item.style.removeProperty("--pointer-y");
    });
  });
}

window.addEventListener("load", () => document.body.classList.add("is-ready"), { once: true });
window.setTimeout(() => document.body.classList.add("is-ready"), 900);

// Re-align deep links after images and fonts settle so fixed headers never cover
// the destination on long, image-led pages.
if (document.body.classList.contains("wankoso-page") && window.location.hash) {
  window.addEventListener(
    "load",
    () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      });
    },
    { once: true },
  );
}

// Keep the small lifestyle loops lightweight when they are outside the viewport.
const storyVideos = [...document.querySelectorAll(".wankoso-page video[autoplay]")];
if (storyVideos.length) {
  const videoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.play().catch(() => {});
        else entry.target.pause();
      });
    },
    { rootMargin: "120px 0px", threshold: 0.05 },
  );
  storyVideos.forEach((video) => videoObserver.observe(video));
}
