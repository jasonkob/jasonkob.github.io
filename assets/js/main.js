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

  // Static Repo Modal (Option B)
  (function(){
    const modal = document.getElementById('repoModal');
    if(!modal) return;
    const dialog = modal.querySelector('.modal__dialog');
    const title = modal.querySelector('#repoModalTitle');
    const desc = modal.querySelector('.modal__desc');
    const link = modal.querySelector('.modal__link');
    const roleEl = modal.querySelector('[data-field="role"]');
    const stackEl = modal.querySelector('[data-field="stack"]');
    const yearEl = modal.querySelector('[data-field="year"]');
    let lastFocus = null;
    function open(){
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
      modal.querySelector('.modal__close').focus();
      document.addEventListener('keydown', onKey);
    }
    function close(){
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      document.removeEventListener('keydown', onKey);
      if(lastFocus) lastFocus.focus();
    }
    function onKey(e){
      if(e.key==='Escape') close();
      if(e.key==='Tab' && modal.classList.contains('is-open')){
        const focusables = Array.from(modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')).filter(el=>!el.hasAttribute('disabled'));
        if(focusables.length){
          let idx = focusables.indexOf(document.activeElement);
          if(e.shiftKey && (idx<=0)){ e.preventDefault(); focusables[focusables.length-1].focus(); }
          else if(!e.shiftKey && (idx===focusables.length-1)){ e.preventDefault(); focusables[0].focus(); }
        }
      }
    }
    modal.addEventListener('click', e=>{ if(e.target.dataset.close!==undefined) close(); });
    modal.querySelectorAll('[data-close]').forEach(btn=>btn.addEventListener('click', close));
    document.querySelectorAll('.repo-link').forEach(a=>{
      a.addEventListener('click', e=>{
        e.preventDefault();
        lastFocus = a;
        title.textContent = a.dataset.title || 'Repository';
        desc.textContent = a.dataset.desc || 'No description provided.';
        roleEl.textContent = a.dataset.role || '—';
        stackEl.textContent = a.dataset.stack || '—';
        yearEl.textContent = a.dataset.year || '—';
        link.href = a.getAttribute('href');
        open();
      });
    });
  })();
