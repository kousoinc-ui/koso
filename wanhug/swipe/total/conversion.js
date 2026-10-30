(function(root){
 'use strict';
 const trialProduct='https://wanhugplus.com/products/わん酵素-トータルサポート';
 const checkout='https://wanhugplus.com/products/わん酵素-トータルサポート';
 const attributionKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','gclid','gbraid','wbraid','fbclid','msclkid'];
 function attribution(search){const source=new URLSearchParams(search),result={};for(const key of attributionKeys){const value=source.get(key);if(value&&value.length<=300)result[key]=value;}return result;}
 const compactSources=[1,2,3,4,5,6,7,8,9,10,11,12,14,15,18,20,22,24,25,27,28,29,30,31];
 function flowName(search){return new URLSearchParams(search).get('flow')==='compact'?'compact':'full';}
 function selectPages(source,search){const name=flowName(search);return source.map((p,i)=>({...p,sourcePage:i+1})).filter(p=>name==='compact'?compactSources.includes(p.sourcePage):p.file!=='26');}
 function destination(kind,sourcePage,campaign={},flow='full'){
  const url=new URL(kind==='details'?trialProduct:checkout);
  for(const key of attributionKeys)if(campaign[key])url.searchParams.set(key,campaign[key]);
  if(!url.searchParams.has('utm_source'))url.searchParams.set('utm_source','wankoso_swipe');
  if(!url.searchParams.has('utm_medium'))url.searchParams.set('utm_medium','landing_page');
  if(!url.searchParams.has('utm_campaign'))url.searchParams.set('utm_campaign','total_trial');
  if(kind!=='details'){
   url.searchParams.set('ref','wankoso-total-swipe');
   url.searchParams.set('attributes[lp]','total-swipe');
   url.searchParams.set('attributes[lp_version]','total-preview-20261030');
   url.searchParams.set('attributes[lp_flow]',flow==='compact'?'compact':'full');
   url.searchParams.set('attributes[lp_source_page]',String(sourcePage));
  }
  return url.toString();
 }
 const api={trialProduct,checkout,attribution,destination,flowName,selectPages};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LPConversion=api;
})(globalThis);
