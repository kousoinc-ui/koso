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
