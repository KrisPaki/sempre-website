(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const ease='cubic-bezier(.22,1,.36,1)';
  function appear(el){if(!reduce.matches&&el?.animate){el.getAnimations().forEach(a=>a.cancel());el.animate([{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:ease});}}
  if('IntersectionObserver' in window&&!reduce.matches){
    document.documentElement.classList.add('motion');
    const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveal.unobserve(e.target)}}),{threshold:.08});
    $$('.reveal').forEach(el=>reveal.observe(el));
    reduce.addEventListener('change',()=>{if(reduce.matches){reveal.disconnect();document.documentElement.classList.remove('motion')}});
  }
  const paths={opening:{color:'#f3d29f',rotate:'-7deg',label:'TWÓJ POMYSŁ. WSPÓLNY POCZĄTEK.',copy:'Otwierasz lodziarnię? Pomożemy przejść od pierwszego pomysłu do pierwszych gości.',link:'Porozmawiaj o swoim pomyśle ↗',href:'#kontakt',number:'01 / 03'},running:{color:'#cbded4',rotate:'5deg',label:'TWÓJ LOKAL. NOWE MOŻLIWOŚCI.',copy:'Rozwijasz ofertę? Połącz produkty Cukieterii z doradztwem i wsparciem Sempre.',link:'Poznaj świat Sempre ↗',href:'#grupa',number:'02 / 03'},learning:{color:'#f1cbd0',rotate:'-1deg',label:'TWÓJ ZESPÓŁ. WIĘCEJ WIEDZY.',copy:'Cukiernictwo, czekolada i lody. Odkryj praktyczne szkolenia w Akademii WAPAS.',link:'Zobacz Akademię ↗',href:'#akademia',number:'03 / 03'}};
  $$('[data-path]').forEach(button=>button.addEventListener('click',()=>{
    if(button.getAttribute('aria-selected')==='true')return;
    const d=paths[button.dataset.path];$$('[data-path]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));
    $('.hero').style.background=d.color;$('.header').style.background=d.color;$('.hero').style.setProperty('--cone-rotate',d.rotate);$('#hero-label').textContent=d.label;$('#hero-copy').textContent=d.copy;$('#hero-link').textContent=d.link;$('#hero-link').href=d.href;$('.hero-count').textContent=d.number;appear($('.hero-right'));
  }));
  const steps=[{image:'assets/team-hero-light.webp',label:'RAZEM OD PIERWSZEGO KROKU',alt:'Wizualizacja zespołu pracującego w lodziarni'},{image:'assets/cukieteria-scene.webp',label:'PRODUKTY DOBRANE DO TWOJEJ PRACY',alt:'Wizualizacja doboru składników cukierniczych'},{image:'assets/wapas-training.webp',label:'WIEDZA, KTÓRA PRACUJE Z TOBĄ',alt:'Wizualizacja szkolenia cukierniczego'}];
  let stepIndex=0;
  function updateStep(index){if(index===stepIndex)return;stepIndex=index;const d=steps[index];$('#journey-photo').src=d.image;$('#journey-photo').alt=d.alt;$('.journey-photo-label').textContent=d.label;appear($('#journey-photo'));$$('.journey-step').forEach((s,i)=>s.classList.toggle('active',i===index));}
  if('IntersectionObserver' in window){const watcher=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)updateStep(Number(e.target.dataset.step))}),{rootMargin:'-25% 0px -40% 0px',threshold:0});$$('.journey-step').forEach(s=>watcher.observe(s));}
  const brands={exclusive:{names:'Pernigotti.<br>Babbi. Trucillo.',description:'Marki na wyłączność w Sempre. Składniki do lodów i kawa, które pomagają wyróżnić Twoją ofertę.'},more:{names:'Sosa. Mazzoni.<br>I wiele więcej.',description:'Louis François, Lübecker, marka własna Sempre i inne produkty dla profesjonalistów. Wspólnie dobierzemy je do Twojej oferty.'}};
  $$('[data-brand]').forEach(button=>button.addEventListener('click',()=>{if(button.getAttribute('aria-selected')==='true')return;const d=brands[button.dataset.brand];$$('[data-brand]').forEach(b=>b.setAttribute('aria-selected',String(b===button)));$('#brand-names').innerHTML=d.names;$('#brand-description').textContent=d.description;appear($('.brand-display'));}));
  $$('[role="tablist"]').forEach(list=>list.addEventListener('keydown',e=>{const tabs=$$('[role="tab"]',list),i=tabs.indexOf(document.activeElement);if(i<0||!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;tabs[n].focus();tabs[n].click();}));
  $$('.faq details').forEach(details=>{let animation=null,wanted=details.open;const summary=$('summary',details);summary.addEventListener('click',e=>{if(reduce.matches||!details.animate)return;e.preventDefault();const start=details.getBoundingClientRect().height;wanted=!wanted;if(animation){animation.onfinish=null;animation.cancel();}details.open=true;const end=wanted?details.getBoundingClientRect().height:summary.getBoundingClientRect().height+1;animation=details.animate([{height:`${start}px`},{height:`${end}px`}],{duration:370,easing:ease});animation.onfinish=()=>{details.open=wanted;animation=null;};});});
  $$('[data-topic]').forEach(link=>link.addEventListener('click',()=>{const field=$('#message');if(!field.value.trim())field.value=link.dataset.topic+'. ';}));
  $('#contact-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget),body=`Imię: ${f.get('name')}\nE-mail: ${f.get('email')}\n\n${f.get('message')}`;location.href='mailto:sempre@sempreinfo.pl?subject='+encodeURIComponent('Współpraca z Sempre')+'&body='+encodeURIComponent(body);});
  $('#newsletter-form').addEventListener('submit',e=>{e.preventDefault();location.href='mailto:sempre@sempreinfo.pl?subject='+encodeURIComponent('Informacje o newsletterze')+'&body='+encodeURIComponent('Proszę o informacje o newsletterze. Mój e-mail: '+$('#newsletter-email').value);});
})();
