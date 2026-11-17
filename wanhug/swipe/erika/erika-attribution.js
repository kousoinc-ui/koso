/*
 * エリカ健康道場専用LP 購入流入識別（/total/ 側には影響しません）
 * Load after ../total/conversion.js, before ../total/app.js.
 */
(function () {
  'use strict';
  if (!window.LPConversion || typeof LPConversion.destination !== 'function') {
    console.error('erika-attribution.js: conversion.js が読み込まれていません。');
    return;
  }
  const originalDestination = LPConversion.destination.bind(LPConversion);
  LPConversion.destination = function (kind, sourcePage, campaign = {}, flow = 'full') {
    const nextCampaign = { ...campaign };
    // 外部広告に既存UTMがある場合はそれを尊重します。
    if (!nextCampaign.utm_source) nextCampaign.utm_source = 'erika_kenkodojo';
    if (!nextCampaign.utm_medium) nextCampaign.utm_medium = 'partner';
    if (!nextCampaign.utm_campaign) nextCampaign.utm_campaign = 'erika_wankoso_trial';

    const u = new URL(originalDestination(kind, sourcePage, nextCampaign, flow));
    if (kind !== 'details') {
      u.searchParams.set('ref', 'wankoso-erika-swipe');
      u.searchParams.set('attributes[lp]', 'erika-swipe');
      u.searchParams.set('attributes[lp_version]', 'erika-33-20261117');
    }
    return u.toString();
  };

  // 既存LPの dataLayer イベントを、エリカ専用LPとして区別します。
  window.dataLayer = window.dataLayer || [];
  const push = window.dataLayer.push;
  window.dataLayer.push = function (...entries) {
    for (const entry of entries) {
      if (entry && typeof entry === 'object' && entry.lp_id === 'wankoso-total-swipe') {
        entry.lp_id = 'wankoso-erika-swipe';
        entry.lp_version = 'erika-33-20261117';
      }
    }
    return push.apply(this, entries);
  };
})();
