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
      document.querySelectorAll('.project').forEach(function (p) {
        p.hidden = !(cat === 'tous' || p.dataset.cat === cat);
      });
    });
  });

  // Galerie agrandie
  var dlg = document.getElementById('lightbox');
  if (dlg && dlg.showModal) {
    var big = dlg.querySelector('img');
    var cap = dlg.querySelector('p');
    document.querySelectorAll('.gallery button').forEach(function (b) {
      b.addEventListener('click', function () {
        var img = b.querySelector('img');
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        cap.textContent = img.alt;
        dlg.showModal();
      });
    });
    dlg.querySelector('.close').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
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
