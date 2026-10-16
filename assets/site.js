// ZÉVRA — scripts communs (pages intérieures harmonisées)
(function () {
  document.documentElement.classList.add('js');

  // Menu mobile (burger)
  var mt = document.querySelector('.menu-toggle');
  var hdr = document.querySelector('header.site');
  if (mt && hdr) {
    mt.addEventListener('click', function () {
      var open = hdr.classList.toggle('open');
      mt.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    hdr.querySelectorAll('nav.main a').forEach(function (a) {
      a.addEventListener('click', function () { hdr.classList.remove('open'); mt.setAttribute('aria-expanded', 'false'); });
    });
  }

  // Apparition au défilement
  var items = [].slice.call(document.querySelectorAll('.reveal'));
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    var groups = {};
    items.forEach(function (el) {
      var p = el.parentElement, key = p ? (p.className || 'root') : 'root';
      groups[key] = (groups[key] || 0);
      el.style.transitionDelay = (Math.min(groups[key], 4) * 60) + 'ms';
      groups[key]++;
      io.observe(el);
    });
    requestAnimationFrame(function () {
      items.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95) { el.classList.add('in'); io.unobserve(el); }
      });
    });
  }

  // Filtres des réalisations
  var filters = document.querySelectorAll('.filters button');
  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.filter;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
      document.querySelectorAll('.project, .tile').forEach(function (p) {
        p.hidden = !(cat === 'tous' || p.dataset.cat === cat);
      });
    });
  });

  // Galerie / visionneuse projet (vignettes du portfolio)
  var dlg = document.getElementById('lightbox');
  if (dlg && dlg.showModal) {
    var big = dlg.querySelector('img');
    var cap = dlg.querySelector('p');
    var prev = dlg.querySelector('.prev');
    var next = dlg.querySelector('.next');
    var set = [], idx = 0, label = '';
    function show() {
      big.src = set[idx]; big.alt = label;
      cap.textContent = set.length > 1 ? (label + ' · ' + (idx + 1) + ' / ' + set.length) : label;
      if (prev) prev.hidden = next.hidden = set.length < 2;
    }
    function openSet(imgs, caption) { set = imgs; label = caption; idx = 0; show(); dlg.showModal(); }
    function step(d) { if (set.length) { idx = (idx + d + set.length) % set.length; show(); } }
    // Vignettes du portfolio (data-images = liste séparée par |)
    document.querySelectorAll('.tile').forEach(function (t) {
      t.addEventListener('click', function () {
        var imgs = (t.getAttribute('data-images') || '').split('|').filter(Boolean);
        if (imgs.length) openSet(imgs, t.getAttribute('data-caption') || '');
      });
    });
    // Compat : anciennes galeries .gallery button (si présentes)
    document.querySelectorAll('.gallery button').forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        openSet([img.currentSrc || img.src], img.alt);
      });
    });
    if (prev) prev.addEventListener('click', function (e) { e.stopPropagation(); step(-1); });
    if (next) next.addEventListener('click', function (e) { e.stopPropagation(); step(1); });
    dlg.querySelector('.close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    document.addEventListener('keydown', function (e) {
      if (!dlg.open) return;
      if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
  }

  // Formulaire de contact : prépare un e-mail dans la messagerie du visiteur
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = new FormData(form);
      var subject = 'Demande de projet — ' + (f.get('societe') || f.get('nom'));
      var body = [
        'Nom : ' + f.get('nom'),
        'Société : ' + (f.get('societe') || '-'),
        'Téléphone : ' + f.get('tel'),
        'E-mail : ' + f.get('email'),
        'Type de projet : ' + f.get('type'),
        'Surface approximative : ' + (f.get('surface') || '-'),
        'Ville : ' + (f.get('ville') || '-'),
        '',
        f.get('message')
      ].join('\n');
      window.location.href = 'mailto:o.berrada@zevra.ma?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      document.querySelector('.form-msg').textContent = "Votre messagerie s'ouvre avec la demande prête à envoyer. Si rien ne s'ouvre, écrivez directement à o.berrada@zevra.ma.";
    });
  }
})();
