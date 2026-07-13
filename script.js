// floating embers in the background
  const wrap = document.getElementById('bgWrap');
  const positions = [
    {top:'10%', left:'15%', size:180},
    {top:'70%', left:'80%', size:240},
    {top:'40%', left:'60%', size:140},
    {top:'85%', left:'20%', size:160},
  ];
  positions.forEach((p,i)=>{
    const el = document.createElement('div');
    el.className = 'ember';
    el.style.top = p.top; el.style.left = p.left;
    el.style.width = p.size+'px'; el.style.height = p.size+'px';
    el.style.animationDelay = (i*2)+'s';
    wrap.appendChild(el);
  });

  // reveal dish rows on scroll
  const dishes = document.querySelectorAll('.dish');
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); }
    });
  }, { threshold: 0.2 });
  dishes.forEach(d=>obs.observe(d));

  // ---------- top nav: smooth scroll + active state ----------
  const topNav = document.getElementById('topNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const navSections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  // smooth-scroll to target section, offset for the fixed nav height
  navLinks.forEach(link=>{
    link.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(!target) return;
      const navHeight = topNav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // toggle a background on the nav once the page has scrolled past the hero
  window.addEventListener('scroll', ()=>{
    topNav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive:true });

  // highlight the nav link for whichever section is currently in view
  const sectionObs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        navLinks.forEach(link=>{
          link.classList.toggle('active', link.getAttribute('href') === id);
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });

  navSections.forEach(section => sectionObs.observe(section));
