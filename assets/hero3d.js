// ZÉVRA — héro dynamique : références qui défilent + lignes « zèbre » en 3D
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Références qui défilent sous l'accroche
  var tick = document.querySelector('.ticker a');
  var refs = window.ZEVRA_REFS || [];
  if (tick && refs.length && !reduce) {
    var i = 0;
    setInterval(function () {
      tick.classList.add('out');
      setTimeout(function () {
        i = (i + 1) % refs.length;
        tick.textContent = refs[i][0];
        tick.href = refs[i][1];
        tick.classList.remove('out');
      }, 400);
    }, 3200);
  }

  // 2. Scène 3D
  var box = document.getElementById('hero3d');
  if (!box || !window.THREE) return;
  var renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
  if (!renderer.getContext()) return;
  box.classList.add('live');
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  box.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 8, 21);
  var cam = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  cam.position.set(0, 5.4, 11.5);
  cam.lookAt(0.6, -0.2, -1.5);

  var group = new THREE.Group();
  scene.add(group);

  var N = 34, M = 170, W = 22, D = 15, ACCENT = 21;
  var lines = [];
  for (var l = 0; l < N; l++) {
    var pos = new Float32Array(M * 3);
    var z = -D / 2 + l * (D / (N - 1));
    for (var k = 0; k < M; k++) {
      pos[k * 3] = -W / 2 + k * (W / (M - 1));
      pos[k * 3 + 2] = z;
    }
    var geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.LineBasicMaterial({ color: l === ACCENT ? 0x8E6A40 : 0x262624, fog: true });
    var line = new THREE.Line(geo, mat);
    group.add(line);
    lines.push({ geo: geo, z: z, seed: Math.sin(l * 12.9898) * 0.8 });
  }

  // Interaction : le pointeur soulève les lignes et incline la scène
  var ray = new THREE.Raycaster();
  var plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  var hit = new THREE.Vector3();
  var ptr = new THREE.Vector2(), target = { x: 0, y: 0 }, tilt = { x: 0, y: 0 };
  var bump = { x: 0, z: 0, s: 0, ts: 0 };
  var hero = box.closest('.hero') || box;
  hero.addEventListener('pointermove', function (e) {
    var r = box.getBoundingClientRect();
    ptr.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    target.x = Math.max(-1, Math.min(1, ptr.x));
    target.y = Math.max(-1, Math.min(1, ptr.y));
    ray.setFromCamera(ptr, cam);
    if (ray.ray.intersectPlane(plane, hit)) {
      var local = group.worldToLocal(hit.clone());
      bump.x = local.x; bump.z = local.z;
      bump.ts = (Math.abs(local.x) < W / 2 && Math.abs(local.z) < D / 2) ? 1 : 0;
    }
  });
  hero.addEventListener('pointerleave', function () { bump.ts = 0; target.x = 0; target.y = 0; });

  function height(x, z, t) {
    var y = 0.55 * Math.sin(x * 0.5 + t * 0.8 + z * 0.32)
          + 0.32 * Math.sin(z * 0.7 - t * 0.55 + x * 0.18)
          + 0.12 * Math.sin(x * 1.3 - t * 1.1);
    var dx = x - bump.x, dz = z - bump.z;
    y += 1.4 * bump.s * Math.exp(-(dx * dx + dz * dz) / 2.4);
    return y;
  }

  function resize() {
    var w = box.clientWidth, h = box.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.position.z = w / h < 1 ? 14.5 : 11.5;
    cam.updateProjectionMatrix();
  }
  resize();
  if (window.ResizeObserver) new ResizeObserver(resize).observe(box); else addEventListener('resize', resize);

  var start = performance.now(), running = true, raf = 0;
  function frame(now) {
    var t = (now - start) / 1000;
    var rise = reduce ? 1 : Math.min(1, t / 1.8);
    rise = 1 - Math.pow(1 - rise, 3);
    bump.s += (bump.ts - bump.s) * 0.06;
    tilt.x += (target.x - tilt.x) * 0.05;
    tilt.y += (target.y - tilt.y) * 0.05;
    group.rotation.y = tilt.x * 0.28;
    group.rotation.x = -tilt.y * 0.08;
    for (var l = 0; l < lines.length; l++) {
      var p = lines[l].geo.attributes.position.array, z = lines[l].z, s = lines[l].seed;
      for (var k = 0; k < M; k++) {
        var x = p[k * 3];
        p[k * 3 + 1] = rise * height(x, z + s * 0.25, t) - (1 - rise) * 1.5;
      }
      lines[l].geo.attributes.position.needsUpdate = true;
    }
    renderer.render(scene, cam);
    if (running && !reduce) raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  // Pause hors écran ou onglet masqué
  function setRun(on) {
    if (reduce) return;
    if (on && !running) { running = true; raf = requestAnimationFrame(frame); }
    if (!on) { running = false; cancelAnimationFrame(raf); }
  }
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (en) { setRun(en[0].isIntersecting && !document.hidden); }).observe(box);
  }
  document.addEventListener('visibilitychange', function () { setRun(!document.hidden); });
})();
