/*
 * エリカ健康道場専用LP：開発者のお手紙2枚を追加
 * 読み込み順：conversion.js → app.js → letter-pages.js
 * app.js や style.css は変更せず、既存ページの構成と購入計測を維持します。
 */
(() => {
  'use strict';

  // 元の app.js は classic script のため、トップレベルの pages と
  // artwork/goTo/update を後続の classic script から共有できます。
  if (typeof pages === 'undefined' || !Array.isArray(pages) ||
      typeof artwork !== 'function' || typeof update !== 'function' ||
      typeof goTo !== 'function') {
    console.error('letter-pages.js: app.js の初期化が確認できません。');
    return;
  }

  const slideContainer = document.getElementById('slides');
  if (!slideContainer || pages.length !== 31 || slideContainer.children.length !== 31) {
    console.error('letter-pages.js: 元の31枚構成を確認できません。重複追加は行いません。');
    return;
  }

  const addedPages = [
    {
      file: '../../erika/assets/erika-letter-02', ext: 'png', w: 1065, h: 1476,
      sourcePage: 'letter-02',
      title: 'エリカ健康道場のお客様へ｜開発者からの特別なお手紙',
      chapter: '開発者からのお手紙',
      text: 'エリカ健康道場のお客様へ。以前、優光泉をお届けしていた開発者からのご挨拶。開発者と3匹の愛犬たちの写真。'
    },
    {
      file: '../../erika/assets/erika-letter-03', ext: 'png', w: 1065, h: 1476,
      sourcePage: 'letter-03',
      title: 'なぜエリカ健康道場のお客様にわん酵素をご紹介するのか',
      chapter: '開発者からのお手紙',
      text: '愛犬への想いから生まれたわん酵素。エリカ健康道場の協力を得てご紹介できることになりました。'
    }
  ];

  // 元の2枚目の直前に2ページを差し込みます。
  // 既存31ページの sourcePage は変えないため、計測もそのまま引き継がれます。
  const oldSecondSlide = slideContainer.children[1];
  pages.splice(1, 0, ...addedPages);
  for (let i = 0; i < addedPages.length; i += 1) {
    const page = addedPages[i];
    const section = document.createElement('section');
    section.className = 'slide';
    section.setAttribute('aria-roledescription', 'スライド');
    section.setAttribute('aria-label', `${i + 2} / ${pages.length}：${page.title}`);
    section.append(artwork(page, true, false));
    slideContainer.insertBefore(section, oldSecondSlide);
  }

  // 既存スライドの音声読み上げ用ラベルも33枚構成に更新します。
  Array.from(slideContainer.children).forEach((section, i) => {
    section.setAttribute('aria-label', `${i + 1} / ${pages.length}：${pages[i].title}`);
  });

  document.querySelector('.scrollbar')?.setAttribute('aria-valuemax', String(pages.length));
  const zoomTitle = document.getElementById('zoom-title');
  if (zoomTitle) zoomTitle.textContent = `01 / ${pages.length}`;

  // 進捗バー・前後ボタン・購入ボタンの参照先を33枚構成に再計算します。
  const initialHash = window.__totalLpRequestedHash || window.location.hash;
  const match = initialHash.match(/^#page=(\d+)$/);
  if (match) {
    goTo(Math.max(0, Math.min(pages.length - 1, Number(match[1]) - 1)), true);
  } else {
    goTo(0, true);
  }
})();
