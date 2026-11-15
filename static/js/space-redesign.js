/* Echoes V5.4: transforma visualmente la línea de misiones sin modificar main.js */
(() => {
  'use strict';
  const items = {
    surveyor3: ['surveyor3.svg', '#EBEBD3'],
    apollo11: ['apollo11.svg', '#F7C59F'],
    apollo: ['apollo17.svg', '#F4D35E'],
    viking1: ['viking1.svg', '#F4D35E'],
    sojourner: ['sojourner.svg', '#F7C59F'],
    spirit: ['spirit.svg', '#F46036'],
    opportunity: ['opportunity.svg', '#00AFB9'],
    ingenuity: ['ingenuity.svg', '#AF0069']
  };
  const names = {
    'Surveyor 3': 'surveyor3', 'Apollo 11 · Eagle': 'apollo11',
    'Apollo 17': 'apollo', 'Viking 1': 'viking1', 'Sojourner': 'sojourner',
    'Spirit': 'spirit', 'Opportunity': 'opportunity', 'Ingenuity': 'ingenuity'
  };
  const root = document.querySelector('#timeline');
  if (!root) return;
  const base = document.currentScript?.src?.replace(/js\/space-redesign\.js(?:\?.*)?$/, 'images/missions/') || '/static/images/missions/';
  let scheduled = false;
  function enhance() {
    scheduled = false;
    root.querySelectorAll('.time-item').forEach(button => {
      const name = button.querySelector('.time-name')?.textContent?.trim();
      const meta = items[names[name]];
      if (!meta) return;
      button.style.setProperty('--mission-art', `url("${base}${meta[0]}")`);
      button.style.setProperty('--accent', meta[1]);
      const caption = button.querySelector('.time-type');
      if (caption) caption.textContent = '🚀 Explorar misión →';
    });
  }
  function scheduleEnhance() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(enhance);
  }
  const shell = document.createElement('div');
  shell.className = 'timeline-shell';
  root.parentNode.insertBefore(shell, root);
  shell.appendChild(root);
  for (const [direction, label] of [['prev', 'Misiones anteriores'], ['next', 'Siguientes misiones']]) {
    const arrow = document.createElement('button');
    arrow.type = 'button'; arrow.className = `timeline-arrow ${direction}`;
    arrow.textContent = direction === 'prev' ? '‹' : '›';
    arrow.setAttribute('aria-label', label);
    arrow.addEventListener('click', () => root.scrollBy({left: (direction === 'prev' ? -1 : 1) * Math.min(root.clientWidth * .75, 620), behavior: 'smooth'}));
    shell.appendChild(arrow);
  }
  new MutationObserver(scheduleEnhance).observe(root, {childList:true});
  enhance();
})();
