/*
 * エリカ健康道場専用LP /wanhug/swipe/erika/
 * 購入ボタンの遷移先を指定された Shopify カートインURLに統一します。
 * 既存 /wanhug/swipe/total/ は変更しません。
 *
 * Load after /wanhug/swipe/total/conversion.js, before app.js.
 */
(function () {
  'use strict';
  if (!window.LPConversion || typeof LPConversion.destination !== 'function') {
    console.error('erika-attribution.js: conversion.js が読み込まれていません。');
    return;
  }

  // ご指定のURLは変更せずそのまま使います。
  // ページごとの閲覧・購入クリックは元の app.js の dataLayer に引き続き記録されます。
  const cartInUrl = 'https://wanhugplus.com/cart/50053198872853:1?storefront=true';
  const originalDestination = LPConversion.destination.bind(LPConversion);

  LPConversion.destination = function (kind, sourcePage, campaign = {}, flow = 'full') {
    if (kind !== 'details') return cartInUrl;

    // 「内容・条件を確認」は引き続き商品説明ページを表示します。
    const nextCampaign = { ...campaign };
    if (!nextCampaign.utm_source) nextCampaign.utm_source = 'erika_kenkodojo';
    if (!nextCampaign.utm_medium) nextCampaign.utm_medium = 'partner';
    if (!nextCampaign.utm_campaign) nextCampaign.utm_campaign = 'erika_wankoso_trial';
    return originalDestination(kind, sourcePage, nextCampaign, flow);
  };

  // LP閲覧イベントは従来どおり計測し、一般向けLPと区別します。
  window.dataLayer = window.dataLayer || [];
  const push = window.dataLayer.push;
  window.dataLayer.push = function (...entries) {
    for (const entry of entries) {
      if (entry && typeof entry === 'object' && entry.lp_id === 'wankoso-total-swipe') {
        entry.lp_id = 'wankoso-erika-swipe';
        entry.lp_version = 'erika-33-cart-20261117';
      }
    }
    return push.apply(this, entries);
  };
})();
