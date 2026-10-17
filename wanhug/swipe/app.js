'use strict';
const suppliedPages = [
 {file:'01',w:1065,h:1477,title:'まだ元気だから、大丈夫？',chapter:'愛犬の健康について',text:'まだ元気だし、ごはんも食べてる。だから大丈夫。本当に？'},
 {file:'2',w:1065,h:1477,title:'腎臓のこと、シニアになってから？',chapter:'愛犬の健康について',text:'腎臓のことって、シニアになってから考えればいい？ いいえ。'},
 {file:'3',w:1065,h:1477,title:'小さな変化、見逃していませんか？',chapter:'愛犬の健康について',text:'水を飲む量、寝ている時間、食欲、歩く時間、おしっこ、なんとなく元気がない。日々の小さな変化に気づくことから。'},
 {file:'4',w:1066,h:1476,title:'からだの中は見えません',chapter:'愛犬の健康について',text:'元気そうに見えても、からだの中は見えません。だからこそ毎日の健康管理が大切。'},
 {file:'5',w:1065,h:1476,title:'健康を考えるのに、まだ早いはありません',chapter:'愛犬の健康について',text:'健康を考えるのに「まだ早い」はありません。毎日の積み重ねだから。'},
 {file:'6',w:1066,h:1476,title:'毎日の食事管理、正直難しい',chapter:'いつものごはんにプラス',text:'フードを変える？ 手作りする？ 成分を全部調べる？ 正直、難しい。'},
 {file:'7',w:1065,h:1476,title:'いつものごはんに、＋1',chapter:'いつものごはんにプラス',text:'だったら、いつものごはんに＋1。今の食事はそのまま、プラスするだけ。'},
 {file:'8',w:1065,h:1477,title:'私たちが考えたのは、発酵',chapter:'いつものごはんにプラス',text:'私たちが考えたのは、発酵。毎日のごはんに、発酵という選択を。'},
 {file:'9',w:1065,h:1477,title:'毎日の健康を考えた、発酵習慣',chapter:'わん酵素のご紹介',text:'毎日の健康を考えた発酵習慣。わん酵素。いつものごはんに、かけるだけ。'},
 {file:'10',w:1065,h:1476,title:'かんたん3ステップ',chapter:'わん酵素のご紹介',text:'個包装を開ける、ごはんにかける、いつもの食事。体重に合わせて与える、続けやすい液体タイプ。'},
 {file:'11',w:1065,h:1476,title:'発酵とは？',chapter:'発酵へのこだわり',text:'素材の力を、発酵で引き出すこと。多様な素材、発酵・熟成、発酵後の成分を含む液体へ。「素材を混ぜただけ」ではありません。'},
 {file:'12',w:1065,h:1476,title:'時間をかけて、つくっています',chapter:'発酵へのこだわり',text:'わん酵素は、時間をかけてつくっています。多様な素材、発酵、熟成、ブレンドの工程。'},
 {file:'13',w:1065,h:1476,title:'ひとつではなく、多様な素材から',chapter:'発酵へのこだわり',text:'野菜類、果物類、植物素材、穀物・その他。さまざまな素材の力を、発酵というチカラで引き出しています。'},
 {file:'14.15',w:1519,h:1035,crop:[0,0,754,1035],title:'私たちが注目したのは、発酵したあと',chapter:'発酵へのこだわり',text:'生きた菌そのものではなく、発酵の力で生まれた成分をお届けする発酵飲料です。'},
 {file:'15-no-sachet',w:1070,h:1470,title:'腎臓の健康を考えた専用設計',chapter:'腎臓サポートの設計',text:'とうもろこしのひげ：お茶にも使われる、とうもろこしのひげの恵み。タンポポ根：食用としても活用されてきた、タンポポの根。クコ：薬膳料理にも親しまれる、小さな赤い果実。サンシュユ：古くから和漢に用いられてきた、果実由来の素材。オオバコ：葉や種子が活用されてきた、身近な植物素材。これらの植物素材を中心に、愛犬の腎臓の健康を考えて配合しています。'},
 {file:'16-copy-v2',w:1061,h:1482,title:'植物素材の力',chapter:'腎臓サポートの設計',text:'とうもろこしのひげ：お茶にも使われる、とうもろこしのひげの恵み。タンポポ根：食用としても活用されてきた、タンポポの根。クコ：薬膳料理にも親しまれる、小さな赤い果実。これらの植物素材をはじめ、100種類以上の素材を使用しています。'},
 {file:'17-copy-v2',w:1062,h:1480,title:'さらにこだわりの植物素材を配合',chapter:'腎臓サポートの設計',text:'サンシュユ：古くから和漢に用いられてきた、果実由来の素材。オオバコ：葉や種子が活用されてきた、身近な植物素材。その他にも、野菜・果物・和漢植物など、100種類以上の素材を使用しています。自然の恵みと発酵の力で、愛犬の毎日の健康をサポートします。'},
 {file:'18',w:1065,h:1476,title:'毎日続けるものだから、面倒にしない',chapter:'毎日の取り入れ方',text:'サッと開けてかけるだけ。1包10mLの個包装。計量の手間なし、持ち運びに便利、使いやすい液体タイプ。'},
 {file:'19',w:1065,h:1476,title:'かける。混ぜる。それだけ',chapter:'毎日の取り入れ方',text:'ごはんにかける、お水に混ぜる、そのまま与える。いろいろな与え方で取り入れられる液体タイプです。'},
 {file:'20',w:1065,h:1476,title:'体重に合わせて、ちょうどいい量を',chapter:'与え方の目安',text:'1日の目安：2kg以下は半包（5mL）、2〜5kgは1包（10mL）、5〜10kgは2包（20mL）、10〜15kgは3包（30mL）、15〜20kgは4包（40mL）。少量から様子を見ながら与えてください。'},
 {file:'21',w:1065,h:1476,title:'家でも、旅行でも、いつもの習慣を',chapter:'毎日の取り入れ方',text:'家でも、お出かけでも、旅行でも。個包装で持ち歩ける、いつもの発酵習慣。'},
 {file:'22.23',w:1505,h:1045,crop:[0,0,734,1045],title:'実際に続けている飼い主さまの声',chapter:'飼い主さまの声',text:'ごはんの食いつき、散歩の様子、毎日の習慣についての飼い主さまの体験談。個人の感想であり、効果・効能を保証するものではありません。'},
 {file:'22.23',w:1505,h:1045,crop:[770,0,735,1045],title:'わん酵素と一緒に感じた変化',chapter:'飼い主さまの声',text:'お水を飲む量、日々の元気や体調についての飼い主さまの体験談。個人の感想であり、効果・効能を保証するものではありません。'},
 {file:'24',w:1065,h:1476,title:'大切な家族に、3つのこだわり',chapter:'3つのこだわり',text:'発酵へのこだわり、研究・文献調査、国内製造・品質管理。大切な家族に、安心して続けてほしいから。'},
 {file:'25',w:1065,h:1476,title:'よくあるご質問',chapter:'よくあるご質問',text:'いつ与えるのがいいですか？ 何歳から与えられますか？ フードと一緒に与えてもいいですか？ 日々の与え方に関するご質問。'},
 {file:'26',w:1065,h:1476,title:'与え方についてのご質問',chapter:'よくあるご質問',text:'いつもの食事のタイミングで。パピーからシニアまで、ごはんやお水に混ぜるなど、与え方のご案内。'},
 {file:'27',w:1065,h:1476,title:'わん酵素 腎臓サポートが選ばれる3つの理由',chapter:'毎日続けやすい理由',text:'発酵、専用設計、続けやすい10mL個包装。いつも、これからも、ずっと一緒に。だから毎日続けやすい。'},
 {file:'28',w:1065,h:1476,title:'まずは5包から、わん酵素を始める',chapter:'初めての方へ',text:'わん酵素 腎臓サポート。10mL×5包、980円（税込）、送料無料のご案内。詳しい条件は商品ページでご確認ください。'},
 {file:'29',w:1065,h:1476,title:'はじめてでも安心、4つのポイント',chapter:'初めての方へ',text:'続けやすい価格、5包から試せる、配送、定期の縛りなし。詳しい購入条件は商品ページでご確認ください。'},
 {file:'30',w:1065,h:1476,title:'今日から、毎日のごはんに発酵を',chapter:'愛犬の健康習慣をはじめる',text:'これからも、一緒に歩いていきたいから。今日から、毎日のごはんに発酵を。愛犬の健康習慣をはじめる。'},
 {file:'31-product-info',w:1000,h:1228,title:'商品情報・原材料・栄養成分',chapter:'商品情報',text:'商品名：わん酵素（腎臓サポート）。内容量：10mL×5包（50mL）。賞味期限：製造後2年間。原材料：植物抽出発酵液（フラクトオリゴ糖、トウモロコシのひげ、鶏肉粉末、タンポポの根、サンシュユ、クコ、乳酸菌、オオバコ、ナデシコ、甘草、ナシ、リンゴ、みかん）果物発酵液（果実（ミカン、メロン、リンゴ、ナツミカン、パイナップル、ナシ、レモン、スイカ、イチゴ、カキ）、イソマルトオリゴ糖シラップ、植物発酵エキス）野菜発酵液（野菜（山芋、レンコン、キャベツ、大根、ニンジン、キュウリ、トマト、カリフラワー、アスパラガス、チンゲンサイ）、イソマルトオリゴ糖シラップ、植物発酵エキス）。栄養成分表示：粗蛋白0.12％、粗脂肪0.26％、粗繊維0.0％、水分56.1％、カロリー175kcal/100g。'}
];
// Keep stable source page IDs when removing the repeated FAQ page.
const flow=LPConversion.flowName(location.search);
// Source ID 0 identifies the new FV; existing source IDs stay stable.
const firstView={file:'fv-1007-v2',w:1106,h:1422,sourcePage:0,title:'7歳を過ぎた愛犬に、毎日の食事から腎臓サポート',chapter:'わん酵素 腎臓サポート',text:'いつものごはんに、かけるだけ。7歳を過ぎた愛犬に。毎日の食事からはじめる、わん酵素 腎臓サポート。100種類以上の植物・果物・野菜。10年熟成の発酵原液を使用。10mL×5包お試しセット、980円（税込）、送料無料、定期購入なし。'};
const pages=[firstView,...LPConversion.selectPages(suppliedPages,location.search)];
const campaign=LPConversion.attribution(location.search);
window.dataLayer=window.dataLayer||[];

const $ = id => document.getElementById(id);
const slides=$('slides'),stage=$('stage');
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
let current=0,requested=0,scrollFrame=0,overviewBuilt=false;
let purchaseGesture=null;
let lastReadPage=-1;
let stableTimer=0,stablePage=-1,visibleStarted=0;const visited=new Set();
let sessionId;try{sessionId=sessionStorage.getItem("wankoso_lp_session")||crypto.randomUUID();sessionStorage.setItem("wankoso_lp_session",sessionId);}catch{sessionId="temporary";}
// Apply generated clean background only inside the baked pagination badges.
// The original photographs, text and purchase artwork remain underneath unchanged.
const cleanPageCorners={
 '22.23':[[0,0,100,40],[770,0,100,40]],
 '24':[[0,0,162,68]],'25':[[0,0,162,68]],'27':[[0,0,162,68]],
 '28':[[0,0,162,68]],'29':[[0,0,162,68]],'30':[[0,0,162,68]]
};
let artworkSerial=0;
function artwork(page,eager=false,withAction=false){
 const box=document.createElement('div');box.className='artwork';
 const [x,y,w,h]=page.crop||[0,0,page.w,page.h];box.style.setProperty('--ratio',w/h);
 const cleanCorners=cleanPageCorners[page.file];
 if(page.crop||cleanCorners){
  const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),image=document.createElementNS(ns,'image');
  svg.setAttribute('viewBox',`${x} ${y} ${w} ${h}`);svg.setAttribute('role','img');svg.setAttribute('aria-label',page.text);
  image.setAttribute('href',`assets/${page.file}.webp`);image.setAttribute('width',page.w);image.setAttribute('height',page.h);svg.append(image);
  if(cleanCorners){
   const clipId=`clean-page-corner-${++artworkSerial}`,defs=document.createElementNS(ns,'defs'),clip=document.createElementNS(ns,'clipPath');
   clip.setAttribute('id',clipId);clip.setAttribute('clipPathUnits','userSpaceOnUse');
   cleanCorners.forEach(([rx,ry,rw,rh])=>{const rect=document.createElementNS(ns,'rect');rect.setAttribute('x',rx);rect.setAttribute('y',ry);rect.setAttribute('width',rw);rect.setAttribute('height',rh);clip.append(rect);});defs.append(clip);svg.append(defs);
   const background=document.createElementNS(ns,'image');background.setAttribute('href',`assets/no-page-number-${page.file}.webp`);background.setAttribute('width',page.w);background.setAttribute('height',page.h);background.setAttribute('preserveAspectRatio','none');background.setAttribute('clip-path',`url(#${clipId})`);svg.append(background);
  }
  box.append(svg);
 }else{
  const img=document.createElement('img');img.src=`assets/${page.file}.webp`;img.alt=page.text;img.width=page.w;img.height=page.h;img.draggable=false;img.loading=eager?'eager':'lazy';img.decoding='async';if(eager)img.fetchPriority='high';box.append(img);
 }
 if(withAction){const link=document.createElement('a');link.className='image-cta';link.href=LPConversion.destination('checkout',page.sourcePage,campaign,flow);link.setAttribute('aria-label','初回限定5包980円の購入手続きへ');link.style.top=page.file==='30'?'80.4%':'83.3%';link.style.height='9.1%';link.addEventListener('click',event=>handlePurchase(event,'image',page.sourcePage));box.append(link);}
 return box;
}
pages.forEach((page,i)=>{const section=document.createElement('section');section.className='slide'+((page.sourcePage>=1&&page.sourcePage<=7)||page.sourcePage===14||page.file==='25'?' dark':'');section.setAttribute('aria-roledescription','スライド');section.setAttribute('aria-label',`${i+1} / ${pages.length}：${page.title}`);section.append(artwork(page,i===0,['28','29','30'].includes(page.file)));slides.append(section);});
function emit(name,detail){const payload={lp_id:'wankoso-kidney-swipe',lp_version:'fv-20261017',flow,session_id:sessionId,...detail};window.dispatchEvent(new CustomEvent(name,{detail:payload}));window.dataLayer.push({event:name,...payload});}
function flushDwell(){if(stablePage<0||!visibleStarted)return;const elapsed=Math.round(performance.now()-visibleStarted);if(elapsed>0)emit('lp_slide_dwell',{page:stablePage+1,source_page:pages[stablePage].sourcePage,visible_ms:elapsed});visibleStarted=0;}
function markStable(){
 if(document.visibilityState!=='visible'||document.querySelector('dialog[open]'))return;
 if(stablePage!==current){flushDwell();stablePage=current;const first=!visited.has(current);visited.add(current);emit('lp_slide_view',{page:current+1,source_page:pages[current].sourcePage,previous_source_page:lastReadPage<0?null:pages[lastReadPage].sourcePage,title:pages[current].title,total:pages.length,first_view:first});lastReadPage=current;if(current===pages.length-1&&first)emit('lp_complete',{total:pages.length});}
 if(!visibleStarted)visibleStarted=performance.now();
}
function scheduleStable(){clearTimeout(stableTimer);stableTimer=setTimeout(markStable,500);}
function handlePurchase(event,placement,sourcePage=pages[current].sourcePage){if(purchaseGesture?.moved&&performance.now()-purchaseGesture.time<700){event.preventDefault();return;}flushDwell();const anchor=event.currentTarget;anchor.href=LPConversion.destination('checkout',sourcePage,campaign,flow);emit('lp_purchase_click',{page:current+1,source_page:sourcePage,placement,value:980,currency:'JPY',destination:anchor.href});}
function updateLinks(){const sourcePage=pages[current].sourcePage;$('shop').href=LPConversion.destination('checkout',sourcePage,campaign,flow);$('offer-details').href=LPConversion.destination('details',sourcePage,campaign,flow);}

function update(index){
 const changed=current!==index;if(changed){flushDwell();stablePage=-1;}current=index;
 document.querySelector('.scrollbar').setAttribute('aria-valuemax',pages.length);$('scroll-thumb').style.height=`${100/pages.length}%`;updateLinks();$('scroll-thumb').style.top=`${current/pages.length*100}%`;document.querySelector('.scrollbar').setAttribute('aria-valuenow',current+1);
 $('previous').disabled=current===0;$('next').disabled=current===pages.length-1;
 $('footer-next').textContent=current===pages.length-1?'最初から ↑':'続きを読む ↑';
 if(current>0)$('swipe-hint').classList.add('dismissed');
 if(changed){$('announcement').textContent=`${current+1} / ${pages.length}。${pages[current].title}`;history.replaceState(null,'',`#page=${current+1}`);}
 scheduleStable();
 for(let i=current+1;i<=Math.min(current+2,pages.length-1);i++){const img=slides.children[i].querySelector('img');if(img)img.loading='eager';}
}
function goTo(index,instant=false){requested=Math.max(0,Math.min(pages.length-1,index));slides.scrollTo({top:requested*slides.clientHeight,behavior:instant||reducedMotion?'instant':'smooth'});if(instant)update(requested);}
new ResizeObserver(()=>{stage.style.setProperty('--available-height',`${stage.clientHeight}px`);goTo(current,true);}).observe(stage);
slides.addEventListener('scroll',()=>{cancelAnimationFrame(scrollFrame);scrollFrame=requestAnimationFrame(()=>{const index=Math.max(0,Math.min(pages.length-1,Math.round(slides.scrollTop/slides.clientHeight)));if(index!==current)update(index);});},{passive:true});
slides.addEventListener('scrollend',()=>requested=current);
$('previous').addEventListener('click',()=>goTo(current-1));$('next').addEventListener('click',()=>goTo(current+1));
$('shop').addEventListener('click',event=>handlePurchase(event,'fixed'));
$('offer-details').addEventListener('click',()=>emit('lp_details_click',{page:current+1,source_page:pages[current].sourcePage}));
$('footer-next').addEventListener('click',()=>goTo(current===pages.length-1?0:current+1));
document.addEventListener('keydown',e=>{
 if(document.querySelector('dialog[open]')||e.ctrlKey||e.metaKey||e.altKey)return;
 if(['ArrowDown','PageDown',' '].includes(e.key)&&!['BUTTON','A'].includes(e.target.tagName)){e.preventDefault();goTo(current+1);}
 if(['ArrowUp','PageUp'].includes(e.key)){e.preventDefault();goTo(current-1);}
 if(e.key==='Home'){e.preventDefault();goTo(0);}if(e.key==='End'){e.preventDefault();goTo(pages.length-1);}
});
// One wheel/trackpad gesture advances one story, matching the reference's vertical slider.
let wheelSum=0,wheelDirection=0,wheelConsumed=false,wheelLast=0;
slides.addEventListener('wheel',e=>{
 if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;
 e.preventDefault();const now=performance.now(),direction=Math.sign(e.deltaY);if(!direction)return;
 if(now-wheelLast>220||direction!==wheelDirection){wheelSum=0;wheelConsumed=false;}wheelLast=now;wheelDirection=direction;
 if(wheelConsumed)return;wheelSum+=Math.abs(e.deltaY)*(e.deltaMode===1?16:e.deltaMode===2?slides.clientHeight:1);
 if(wheelSum>=26){wheelConsumed=true;goTo(current+direction);}
},{passive:false});
// Touch uses native vertical snapping; desktop users can also drag a page vertically.
let pointerStart=null;
slides.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button===0&&!e.target.closest('a'))pointerStart={x:e.clientX,y:e.clientY};});
window.addEventListener('pointerup',e=>{if(!pointerStart)return;const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;pointerStart=null;if(Math.abs(dy)>45&&Math.abs(dy)>Math.abs(dx))goTo(current+(dy<0?1:-1));});
window.addEventListener('pointercancel',()=>pointerStart=null);
$('overview-open').addEventListener('click',()=>{
 if(!overviewBuilt){pages.forEach((page,i)=>{const btn=document.createElement('button');btn.className='page-choice';btn.setAttribute('aria-label',`${i+1}ページ目：${page.title}`);btn.append(artwork(page));const caption=document.createElement('span');caption.className='choice-caption';const num=document.createElement('b');num.textContent=String(i+1).padStart(2,'0');const title=document.createElement('span');title.textContent=page.title;caption.append(num,title);btn.append(caption);btn.addEventListener('click',()=>{$('overview').close();goTo(i,true);});$('overview-grid').append(btn);});overviewBuilt=true;}
 [...$('overview-grid').children].forEach((b,i)=>b.setAttribute('aria-current',String(i===current)));flushDwell();clearTimeout(stableTimer);$('overview').showModal();
});
$('zoom-open').addEventListener('click',()=>{$('zoom-title').textContent=`${String(current+1).padStart(2,'0')} / ${pages.length}`;$('zoom-content').replaceChildren(artwork(pages[current],true));flushDwell();clearTimeout(stableTimer);$('zoom').showModal();$('zoom-content').scrollTo(0,0);});
document.querySelectorAll('.close-dialog').forEach(btn=>btn.addEventListener('click',()=>btn.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}}));
function readHash(){const match=location.hash.match(/^#page=(\d+)$/);if(match)goTo(Number(match[1])-1,true);}
window.addEventListener('hashchange',readHash);update(0);readHash();scheduleStable();setTimeout(()=>$('swipe-hint').classList.add('dismissed'),2000);

document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'){clearTimeout(stableTimer);flushDwell();}else scheduleStable();});
window.addEventListener('pagehide',()=>{flushDwell();emit('lp_session_end',{last_page:current+1,source_page:pages[current].sourcePage,pages_viewed:visited.size});});

window.addEventListener('pageshow',scheduleStable);

document.querySelectorAll('dialog').forEach(dialog=>dialog.addEventListener('close',scheduleStable));
document.addEventListener('pointerdown',event=>{if(event.target.closest('.action,.image-cta'))purchaseGesture={id:event.pointerId,x:event.clientX,y:event.clientY,moved:false,time:performance.now()};else purchaseGesture=null;},{passive:true});
window.addEventListener('pointermove',event=>{if(purchaseGesture&&event.pointerId===purchaseGesture.id){if(Math.hypot(event.clientX-purchaseGesture.x,event.clientY-purchaseGesture.y)>12)purchaseGesture.moved=true;purchaseGesture.time=performance.now();}},{passive:true});
window.addEventListener('pointerup',event=>{if(purchaseGesture&&event.pointerId===purchaseGesture.id)purchaseGesture.time=performance.now();},{passive:true});
