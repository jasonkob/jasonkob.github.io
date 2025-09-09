// Minimal JS for theme toggle, filtering, active nav
(function(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const THEME_KEY = 'site-theme';
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem(THEME_KEY);
  function setTheme(mode){
    root.setAttribute('data-theme', mode);
    btn && (btn.textContent = mode === 'dark' ? '🌙' : '☀️');
  }
  if(saved){ setTheme(saved); } else if(prefersDark.matches){ setTheme('dark'); }
  if(btn){
    btn.addEventListener('click', ()=>{
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light':'dark';
      setTheme(next); localStorage.setItem(THEME_KEY, next);
    });
  }
  prefersDark.addEventListener('change', e=>{
    if(!localStorage.getItem(THEME_KEY)) setTheme(e.matches ? 'dark':'light');
  });

  // Active nav highlight on scroll
  const sections = Array.from(document.querySelectorAll('main section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-list a'));
  function onScroll(){
    const offset = window.scrollY + 140; // header + margin
    let currentId = '';
    for(const s of sections){
      if(s.offsetTop <= offset) currentId = s.id;
    }
    navLinks.forEach(a=>{
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Filter projects
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  buttons.forEach(b=>b.addEventListener('click', ()=>{
    const f = b.getAttribute('data-filter');
    buttons.forEach(x=>x.classList.toggle('is-active', x===b));
    cards.forEach(card => {
      if(f==='all'){ card.style.display='flex'; return; }
      const tags = card.getAttribute('data-tags') || '';
      card.style.display = tags.split(/\s+/).includes(f) ? 'flex' : 'none';
    });
  }));

  // Current year
  const yEl = document.getElementById('year');
  if(yEl) yEl.textContent = String(new Date().getFullYear());
})();
