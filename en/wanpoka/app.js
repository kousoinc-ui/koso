'use strict';
// Accessible cover exploration; links and product information remain local.
const coverTabs = [...document.querySelectorAll('[role="tab"]')];
function selectCover(tab, moveFocus = false) {
  coverTabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
  });
  if (moveFocus) tab.focus();
}
coverTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCover(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % coverTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + coverTabs.length) % coverTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = coverTabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectCover(coverTabs[next], true); }
  });
});
const contactShortcut = document.querySelector('.mobile-contact');
function updateShortcut() {
  const heroBottom = document.querySelector('.hero').offsetTop + document.querySelector('.hero').offsetHeight;
  contactShortcut.classList.toggle('visible', window.scrollY > heroBottom);
}
window.addEventListener('scroll', updateShortcut, { passive: true });
updateShortcut();
if ('IntersectionObserver' in window) {
  new IntersectionObserver(entries => {
    contactShortcut.classList.toggle('at-contact', entries[0].isIntersecting);
  }, { threshold: 0.15 }).observe(document.querySelector('#contact'));
}
