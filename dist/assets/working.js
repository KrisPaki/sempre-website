(() => {
  const entries = {
    sempre: {label:'MARKA GŁÓWNA',title:'Twój pomysł.<br>Nasza energia.',description:'Sempre łączy ludzi, doświadczenie i rozwiązania, dzięki którym Twój biznes nabiera kształtu. Porozmawiajmy o tym, co chcesz stworzyć.',cta:'Zacznijmy współpracę',href:'#kontakt',image:'assets/team-hero-light.webp',alt:'Wizualizacja ludzi współpracujących w lodziarni',number:'01 / 03'},
    cukieteria: {label:'SKŁADNIKI I INSPIRACJE',title:'Wszystko do<br>tworzenia.',description:'Cukieteria to miejsce dla tych, którzy codziennie tworzą smak. Składniki, formy i akcesoria dla cukierni, lodziarni oraz gastronomii.',cta:'Odkryj Cukieterię',href:'https://www.cukieteria.pl/',image:'assets/cukieteria-scene.webp',alt:'Wizualizacja produktów i pracy cukierniczej',number:'02 / 03'},
    wapas: {label:'SZKOLENIA CUKIERNICZE',title:'Wiedza w<br>dobrych rękach.',description:'WAPAS rozwija umiejętności w praktyce. Szkolenia cukiernicze i lodziarskie, doświadczeni trenerzy i pomysły gotowe do wykorzystania.',cta:'Poznaj Akademię WAPAS',href:'https://www.wapas.pl/',image:'assets/wapas-training.webp',alt:'Wizualizacja praktycznego szkolenia cukierniczego',number:'03 / 03'}
  };
  const panel=document.querySelector('#world-panel');
  const switcher=document.querySelector('.world-switch');
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){switcher.classList.add('in-view');observer.disconnect()}},{threshold:.15});observer.observe(switcher)}else switcher.classList.add('in-view');
  const tabs=[...document.querySelectorAll('[data-world]')];
  const image=document.querySelector('#world-image');
  let current='sempre';
  Object.values(entries).forEach(entry=>{const preload=new Image();preload.src=entry.image});
  function select(key){
    if(!entries[key] || key===current)return;
    current=key;
    const entry=entries[key];
    tabs.forEach(tab=>{const active=tab.dataset.world===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1});
    panel.classList.remove('world-is-changing');
    void panel.offsetWidth;
    panel.dataset.active=key;
    switcher.dataset.active=key;
    panel.setAttribute('aria-labelledby','world-tab-'+key);
    document.querySelector('#world-label').textContent=entry.label;
    document.querySelector('#world-title').innerHTML=entry.title;
    document.querySelector('#world-description').textContent=entry.description;
    const link=document.querySelector('#world-link');
    link.firstChild.textContent=entry.cta+' ';
    link.href=entry.href;
    if(entry.href.startsWith('http')){link.target='_blank';link.rel='noopener'}else{link.removeAttribute('target');link.removeAttribute('rel')}
    image.src=entry.image;
    image.alt=entry.alt;
    document.querySelector('.world-stage-count').textContent=entry.number;
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)panel.classList.add('world-is-changing');
  }
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>select(tab.dataset.world));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key==='ArrowRight')next=(index+1)%tabs.length;
      else if(event.key==='ArrowLeft')next=(index-1+tabs.length)%tabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=tabs.length-1;
      else return;
      event.preventDefault();tabs[next].focus();select(tabs[next].dataset.world);
    });
  });
})();
