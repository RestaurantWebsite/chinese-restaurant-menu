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