(() => {
  'use strict';
  const comic = document.getElementById('comic');
  if (!comic || !('PointerEvent' in window)) return;
  const links = Array.from(document.querySelectorAll('.controls a.page-link'));
  const previous = links.find(link => (link.getAttribute('aria-label') || '').startsWith('前のページ'));
  const next = links.find(link => (link.getAttribute('aria-label') || '').startsWith('次のページ'));
  const interactive = 'a,button,input,textarea,select,label,video,[role="button"],[role="tab"],[contenteditable="true"],.p7-interactive,.p13-video-zone';
  let gesture = null;
  let navigating = false;
  let suppressClickUntil = 0;

  // More than one finger means zooming, not a page turn.
  window.addEventListener('pointerdown', event => {
    if (gesture && event.pointerType === 'touch' && event.pointerId !== gesture.id) gesture = null;
  }, { capture: true, passive: true });

  comic.addEventListener('pointerdown', event => {
    if (navigating || !event.isPrimary || event.button !== 0 || !['touch', 'pen'].includes(event.pointerType)) return;
    if (event.target.closest?.(interactive)) return;
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, started: event.timeStamp, axis: null };
  }, { passive: true });

  window.addEventListener('pointermove', event => {
    if (!gesture || event.pointerId !== gesture.id || gesture.axis) return;
    const x = Math.abs(event.clientX - gesture.x);
    const y = Math.abs(event.clientY - gesture.y);
    if (Math.max(x, y) < 12) return;
    if (y > x * 1.1) gesture.axis = 'vertical';
    else if (x > y * 1.5) {
      gesture.axis = 'horizontal';
      // Capture only after a horizontal drag; ordinary taps keep their target.
      try { comic.setPointerCapture(event.pointerId); } catch (_) {}
    }
  }, { passive: true });

  window.addEventListener('pointerup', event => {
    if (!gesture || event.pointerId !== gesture.id) return;
    const start = gesture;
    gesture = null;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    const threshold = Math.max(56, Math.min(110, comic.getBoundingClientRect().width * .18));
    if (start.axis === 'vertical' || Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy) * 1.6 || event.timeStamp - start.started > 1200) return;
    suppressClickUntil = performance.now() + 500;
    const destination = dx < 0 ? next : previous;
    if (!destination || navigating) return;
    navigating = true;
    window.location.assign(destination.href);
  }, { passive: true });

  window.addEventListener('pointercancel', event => {
    if (gesture?.id === event.pointerId) gesture = null;
  }, { passive: true });
  window.addEventListener('blur', () => { gesture = null; });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) gesture = null;
  });
  window.addEventListener('pageshow', () => { navigating = false; gesture = null; });
  comic.addEventListener('click', event => {
    if (performance.now() >= suppressClickUntil || event.detail === 0) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, { capture: true });
})();
