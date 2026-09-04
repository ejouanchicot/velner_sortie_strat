(function(){
  /* filtre par job */
  var bar = document.querySelector('.jobfilter');
  bar.addEventListener('click', function(e){
    var b = e.target.closest('button');
    if(!b) return;
    var job = b.dataset.job;
    if(job === 'all'){ delete document.body.dataset.job; }
    else { document.body.dataset.job = job; }
    bar.querySelectorAll('button').forEach(function(x){
      x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
    });
  });

  /* sommaire actif */
  var links = Array.prototype.slice.call(document.querySelectorAll('nav.toc a'));
  var map = {};
  links.forEach(function(a){
    var el = document.querySelector(a.getAttribute('href'));
    if(el) map[el.id] = a;
  });
  if(!('IntersectionObserver' in window)) return;
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        links.forEach(function(l){ l.classList.remove('on'); });
        if(map[e.target.id]) map[e.target.id].classList.add('on');
      }
    });
  }, {rootMargin:'-12% 0px -78% 0px'});
  Object.keys(map).forEach(function(id){ obs.observe(document.getElementById(id)); });
})();
