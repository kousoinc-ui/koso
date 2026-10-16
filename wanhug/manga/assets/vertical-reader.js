(() => {
  'use strict';
  const production = ['kouso-inc.com','www.kouso-inc.com'].includes(location.hostname);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const seen = new Set();
  function send(name, page, extra = {}) {
    if (!production || typeof window.gtag !== 'function') return;
    window.gtag('event', name, {send_to:'G-S64B0PLYYG',manga_id:'kidney_support',reader_format:'vertical',page_number:page,...extra});
  }
  const scenes = Array.from(document.querySelectorAll('.story-scene'));
  function reached(scene) {
    const page = Number(scene.dataset.pageNumber);
    if (seen.has(page)) return;
    seen.add(page);send('manga_page_view',page);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {if(entry.isIntersecting){reached(entry.target);observer.unobserve(entry.target);}});
    },{rootMargin:'0px 0px -35% 0px',threshold:0});
    scenes.forEach(scene => observer.observe(scene));
    if(!motion.matches){
      const fade = new IntersectionObserver(entries => entries.forEach(entry => {
        if(entry.isIntersecting){entry.target.classList.add('panel-enter');fade.unobserve(entry.target);}
      }),{threshold:0,rootMargin:'0px 0px -5% 0px'});
      document.querySelectorAll('.manga-panel').forEach(panel => fade.observe(panel));
    }
  } else {
    function scan(){scenes.forEach(scene=>{const r=scene.getBoundingClientRect();if(r.top<innerHeight*.65 && r.bottom>0)reached(scene);});}
    window.addEventListener('scroll',scan,{passive:true});window.addEventListener('resize',scan);scan();
  }
  function click(event){
    if(event.defaultPrevented || (event.type==='auxclick' && event.button!==1))return;
    const link=event.target.closest?.('a.p15-cta,a.p15-details-link');if(!link)return;
    const scene=link.closest('.story-scene');if(!scene)return;
    const url=new URL(link.href,location.href);
    send('manga_cta_click',Number(scene.dataset.pageNumber),{cta_type:link.classList.contains('p15-details-link')?'product_details':'trial_purchase',link_url:url.origin+url.pathname});
  }
  document.addEventListener('click',click);document.addEventListener('auxclick',click);
  // Reveal each speech box at its own reading position, rather than starting
  // all the text animations when the long page loads. Static content remains
  // visible if JavaScript, IntersectionObserver or Web Animations is unavailable.
  const effects=Array.from(document.querySelectorAll('[data-motion]'));
  if(effects.length && 'IntersectionObserver' in window){
    const played=new WeakSet(),active=new Map();
    function stop(target){
      const animations=active.get(target);
      if(!animations)return;
      active.delete(target);animations.forEach(animation=>animation.cancel());
    }
    function stopAll(){Array.from(active.keys()).forEach(stop);}
    function reveal(target){
      if(played.has(target)||motion.matches||document.hidden||typeof target.animate!=='function')return;
      played.add(target);
      const type=target.dataset.motion;
      const frames=[
        {opacity:0,translate:'0 9px',scale:type==='bubble'?'.975':'1'},
        {opacity:1,translate:'0 0',scale:'1'}
      ];
      const animations=[target.animate(frames,{duration:850,easing:'cubic-bezier(.2,.65,.3,1)',iterations:1})];
      active.set(target,animations);
      let remaining=animations.length;
      animations.forEach(animation=>{
        const complete=()=>{remaining--;if(remaining===0){active.delete(target);effectObserver.unobserve(target);}};
        animation.onfinish=complete;animation.oncancel=complete;
      });
    }
    const effectObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting)reveal(entry.target);else stop(entry.target);
    }),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    effects.forEach(target=>effectObserver.observe(target));
    document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAll();});
    window.addEventListener('pagehide',stopAll);
    motion.addEventListener?.('change',()=>{if(motion.matches)stopAll();});
  }
  const tabs=Array.from(document.querySelectorAll('.p7-tab'));
  const stages=tabs.map(tab=>document.getElementById(tab.getAttribute('aria-controls')));
  function select(index,focus=false){
    tabs.forEach((tab,i)=>{const active=i===index;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;stages[i].hidden=!active;stages[i].classList.remove('p7-switching');});
    if(!motion.matches){void stages[index].offsetWidth;stages[index].classList.add('p7-switching');}
    if(focus)tabs[index].focus();
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(index));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
      else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;
      event.preventDefault();select(next,true);
    });
  });
  const video=document.querySelector('.feeding-block video');
  if(video){
    let inView=false,userPaused=false,manualPlay=false;
    video.muted=true;
    function label(){const playing=!video.paused&&!video.ended;video.setAttribute('aria-pressed',String(playing));video.setAttribute('aria-label',playing?'犬の食事動画。一時停止するにはタップまたはEnterキー。':'犬の食事動画。再生するにはタップまたはEnterキー。');}
    function sync(){if(inView&&!document.hidden&&!userPaused&&(!motion.matches||manualPlay)){if(video.paused)video.play().catch(label);}else video.pause();label();}
    function toggle(){if(!video.paused){userPaused=true;video.pause();label();}else{manualPlay=true;userPaused=false;sync();}}
    video.addEventListener('click',toggle);
    video.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();toggle();}});
    ['play','pause','ended','error'].forEach(type=>video.addEventListener(type,label));
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting&&entries[0].intersectionRatio>=.2;sync();},{threshold:.2});observer.observe(video);}
    else{const scanVideo=()=>{const r=video.getBoundingClientRect();inView=r.top<innerHeight&&r.bottom>0;sync();};window.addEventListener('scroll',scanVideo,{passive:true});window.addEventListener('resize',scanVideo);scanVideo();}
    document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>video.pause());window.addEventListener('pageshow',sync);
    motion.addEventListener?.('change',()=>{if(motion.matches)manualPlay=false;sync();});label();
  }
  const progress=document.querySelector('.reading-progress div');let frame=0;
  function updateProgress(){frame=0;const distance=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${distance>0?Math.max(0,Math.min(1,scrollY/distance)):0})`;}
  function schedule(){if(!frame)frame=requestAnimationFrame(updateProgress);}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('load',schedule);schedule();
})();
