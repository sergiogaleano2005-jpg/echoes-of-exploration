/* Echoes V5.6: elementos ornamentales solamente. No altera lógica de misiones. */
(() => {
  'use strict';
  function start(){
    const hero=document.querySelector('.intro');
    if(hero && !hero.querySelector('.space-v56-hero')){
      const layer=document.createElement('div');layer.className='space-v56-hero';layer.setAttribute('aria-hidden','true');
      const root='/static/images/design/';
      for(const [file,cls] of [['rocket.svg','space-v56-rocket'],['saturn.svg','space-v56-saturn'],['satellite.svg','space-v56-satellite']]){
        const picture=document.createElement('img');picture.src=root+file;picture.alt='';picture.className=cls;picture.loading='eager';layer.appendChild(picture);
      }
      for(const cls of ['one','two','three']){const star=document.createElement('span');star.className='v56-star '+cls;star.textContent='✦';layer.appendChild(star)}
      hero.prepend(layer);
    }
    const panel=document.querySelector('.expedition-panel');
    const objective=panel?.querySelector('.objective-banner');
    if(panel && objective && !panel.querySelector('.expedition-v56-art')){
      const decorative=document.createElement('div');decorative.className='expedition-v56-art';decorative.setAttribute('aria-hidden','true');
      decorative.innerHTML='<span class="v56-note">Tu próximo descubrimiento ✦</span><img src="/static/images/design/rocket.svg" alt="" loading="lazy">';
      objective.before(decorative);
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
