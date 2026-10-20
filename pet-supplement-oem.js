// Prepare a draft in the visitor's email app; this page does not send messages.
(() => {
  const form = document.getElementById('pet-inquiry');
  const status = document.getElementById('pet-mail-status');
  const retry = document.getElementById('pet-mail-retry');
  if (!form || !status || !retry) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const value = (key) => String(data.get(key) || '').trim();
    const body = [
      '犬用・ペットサプリOEMについて相談します。', '',
      `会社名・屋号：${value('company')}`,
      `お名前：${value('person')}`,
      `メールアドレス：${value('email')}`,
      `検討しているつくり方：${value('development') || '未定'}`,
      `希望数量：${value('quantity') || '未定'}`,
      `ご予算：${value('budget') || '未定'}`, '',
      '【つくりたい商品・希望の発売時期】', value('message')
    ].join('\r\n');
    const href = `mailto:nojiri@kouso-inc.com?subject=${encodeURIComponent('犬用・ペットサプリOEMの相談')}&body=${encodeURIComponent(body)}`;
    retry.href = href;
    retry.hidden = false;
    status.textContent = 'メール作成を開始します。まだ送信されていません。メールアプリで内容を確認して送信してください。開かない場合は、上記のメールアドレスへ直接ご連絡ください。';
    window.location.href = href;
  });
})();

// Progressive enhancement: the page stays readable without motion or JavaScript.
(() => {
  const page = document.querySelector('.pet-oem-page');
  const ribbon = document.querySelector('.pet-ribbon');
  if (!page || !ribbon || !('IntersectionObserver' in window)) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  try {
    paused = paused || sessionStorage.getItem('pet-oem-motion-paused') === 'true';
  } catch (_) { /* Motion controls also work when browser storage is unavailable. */ }

  const shell = document.createElement('div');
  shell.className = 'pet-ribbon-shell';
  ribbon.before(shell);
  shell.append(ribbon);
  const track = document.createElement('div');
  track.className = 'pet-ribbon-track';
  const group = document.createElement('div');
  group.className = 'pet-ribbon-group';
  while (ribbon.firstChild) group.append(ribbon.firstChild);
  track.append(group, group.cloneNode(true), group.cloneNode(true));
  ribbon.append(track);

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'pet-motion-toggle';
  shell.append(toggle);

  const targets = document.querySelectorAll([
    '.pet-intro > h2', '.pet-intro > p:not(.section-kicker)',
    '.intro-badges > div', '.pet-photo-story figure', '.pet-section-heading',
    '.pet-spec-product', '.pet-spec-table > div', '.pet-planning-art',
    '.pet-plan-card', '.pet-case-primary > figure', '.pet-case-primary > div',
    '.pet-case-collab', '.pet-materials > figure', '.pet-materials-copy',
    '.pet-cost-table > div', '.pet-consult-prompt', '.pet-steps > li',
    '.pet-faq-photo', '.pet-faq details', '.pet-contact-layout > div', '.pet-form'
  ].join(','));
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-visible');
      reveal.unobserve(target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

  if (!paused) {
    targets.forEach(target => {
      target.classList.add('pet-reveal');
      // Elements already passed on an anchor/deep link must remain readable.
      if (target.getBoundingClientRect().top < window.innerHeight * 0.94) {
        target.classList.add('is-visible');
      } else {
        reveal.observe(target);
      }
    });
  }

  document.querySelectorAll('.intro-badges, .pet-photo-story, .pet-plan-grid, .pet-steps').forEach(group => {
    [...group.children].forEach((child, index) => {
      child.style.setProperty('--pet-reveal-delay', `${Math.min(index, 4) * 85}ms`);
    });
  });

  const updateMotion = () => {
    page.classList.toggle('pet-motion-paused', paused);
    toggle.disabled = reducedMotion.matches;
    toggle.textContent = reducedMotion.matches ? '動きを控えめに' : paused ? '動きを再生' : '動きを停止';
    toggle.setAttribute('aria-label', reducedMotion.matches ? '端末の設定に合わせて動きを控えています' : paused ? 'ページのアニメーションを再生' : 'ページのアニメーションを停止');
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) {
      reveal.disconnect();
      targets.forEach(target => target.classList.add('is-visible'));
    }
  };
  toggle.addEventListener('click', () => {
    paused = !paused;
    updateMotion();
    try { sessionStorage.setItem('pet-oem-motion-paused', String(paused)); } catch (_) {}
  });
  reducedMotion.addEventListener('change', event => {
    paused = event.matches;
    updateMotion();
  });
  document.addEventListener('focusin', event => {
    const target = event.target.closest('.pet-reveal');
    if (target) {
      target.classList.add('is-visible');
      reveal.unobserve(target);
    }
  });
  // Pause decorative loops outside the viewport and in background tabs.
  const visibility = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => target.classList.toggle('pet-in-view', isIntersecting));
  });
  [document.querySelector('.pet-hero'), shell].filter(Boolean).forEach(target => visibility.observe(target));
  const updateVisibility = () => page.classList.toggle('pet-motion-idle', document.hidden);
  document.addEventListener('visibilitychange', updateVisibility);
  updateVisibility();
  updateMotion();
  page.classList.add('pet-motion-ready');
})();

// The mobile navigation is local to this landing page.
(() => {
  const button = document.getElementById('ghBurger');
  const menu = document.getElementById('ghMenu');
  if (!button || !menu) return;
  const setOpen = (open) => {
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    menu.setAttribute('aria-hidden', String(!open));
    menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false); button.focus();
    }
  });
  window.matchMedia('(max-width: 760px)').addEventListener('change', () => setOpen(false));
  document.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', () => {
    const select = document.querySelector('select[name="development"]');
    if (select) select.value = a.dataset.plan;
  }));
  const sticky = document.querySelector('.pet-floating-contact');
  const contact = document.getElementById('pet-contact');
  if (sticky && contact && 'IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      sticky.classList.toggle('is-hidden', entries[0].isIntersecting);
    }).observe(contact);
  }
})();
