/* GA4: page reach and CTA clicks. Production domain only. */
(() => {
  'use strict';
  if (!['kouso-inc.com', 'www.kouso-inc.com'].includes(location.hostname)) return;
  if (typeof window.gtag !== 'function' || window.__wanMangaAnalyticsInstalled) return;
  const pageMeta = document.querySelector('meta[name="manga-page-number"]');
  const pageNumber = Number(pageMeta && pageMeta.content);
  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > 15) return;
  window.__wanMangaAnalyticsInstalled = true;
  const measurementId = 'G-S64B0PLYYG';
  function send(name, parameters = {}) {
    window.gtag('event', name, {
      send_to: measurementId,
      manga_id: 'kidney_support',
      page_number: pageNumber,
      ...parameters
    });
  }
  send('manga_page_view');
  // A browser back/forward restoration is another page visit.
  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    window.gtag('event', 'page_view', {send_to: measurementId});
    send('manga_page_view');
  });
  function trackClick(event) {
    if (event.defaultPrevented || (event.type === 'auxclick' && event.button !== 1)) return;
    const link = event.target.closest && event.target.closest('a.p14-cta, a.p15-cta, a.p15-details-link');
    if (!link) return;
    const isDetails = link.classList.contains('p15-details-link');
    const url = new URL(link.href, location.href);
    send('manga_cta_click', {
      cta_type: isDetails ? 'product_details' : 'trial_purchase',
      link_url: url.origin + url.pathname
    });
    // Native links keep opening immediately in a new tab; no navigation interception.
  }
  document.addEventListener('click', trackClick);
  document.addEventListener('auxclick', trackClick);
})();
