(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- navigation: border on scroll, mobile menu, active section ---------- */
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menu-btn");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }));

  const links = new Map([...document.querySelectorAll("#menu a")].map(a => [a.getAttribute("href").slice(1), a]));
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) links.forEach((a, id) => a.classList.toggle("active", id === e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

    /* reveal on scroll */
    const reveal = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); reveal.unobserve(e.target); }
    }), { rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll(".reveal").forEach(el => reveal.observe(el));

    // safety net: anything in or above the viewport is shown even if the observer stays silent
    const sweep = () => {
      const left = document.querySelectorAll(".reveal:not(.in)");
      left.forEach(el => { if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("in"); });
      if (!left.length) window.removeEventListener("scroll", sweep);
    };
    window.addEventListener("scroll", sweep, { passive: true });
    window.addEventListener("load", sweep);
    setTimeout(sweep, 600);
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
  }

  /* ---------- project filters ---------- */
  const filters = document.querySelectorAll("[data-filter]");
  filters.forEach(btn => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    filters.forEach(b => b.setAttribute("aria-pressed", b === btn));
    document.querySelectorAll("#projects .project").forEach(p => {
      p.hidden = f !== "all" && p.dataset.cat !== f;
      if (!p.hidden) p.classList.add("in");
    });
  }));

  /* ---------- language: Polish in the markup, English in data-en ---------- */
  const META = {
    pl: { title: document.title, desc: document.querySelector('meta[name="description"]').content },
    en: { title: "Juliusz Łosiński · AI Engineer, Computer Vision",
          desc: "Juliusz Łosiński: AI engineer and computer vision researcher at Gdynia Maritime University. Object detection, YOLO, language models and AI agents." }
  };
  const langBtn = document.getElementById("lang");
  function setLang(lang) {
    document.querySelectorAll("[data-en]").forEach(el => {
      if (el.dataset.pl === undefined) el.dataset.pl = el.innerHTML;
      el.innerHTML = lang === "en" ? el.dataset.en : el.dataset.pl;
    });
    document.querySelectorAll("[data-en-aria]").forEach(el => {
      if (el.dataset.plAria === undefined) el.dataset.plAria = el.getAttribute("aria-label");
      el.setAttribute("aria-label", lang === "en" ? el.dataset.enAria : el.dataset.plAria);
    });
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    document.querySelector('meta[name="description"]').content = META[lang].desc;
    langBtn.textContent = lang === "en" ? "PL" : "EN";
    langBtn.setAttribute("aria-label", lang === "en" ? "Przełącz na polski" : "Switch to English");
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  langBtn.addEventListener("click", () => setLang(document.documentElement.lang === "en" ? "pl" : "en"));
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  const initial = saved || (navigator.language && !navigator.language.toLowerCase().startsWith("pl") ? "en" : "pl");
  if (initial === "en") setLang("en");

  /* ---------- background: a slowly drifting neural network ---------- */
  const canvas = document.getElementById("net");
  const ctx = canvas.getContext("2d");
  let nodes = [], w = 0, h = 0, dpr = 1, mouse = null;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, Math.max(30, w * h / 16000)));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25,
      r: Math.random() * 1.6 + .8
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const max = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
        if (d < max) {
          ctx.strokeStyle = `rgba(96, 165, 250, ${0.22 * (1 - d / max)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < 180) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.45 * (1 - d / 180)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      ctx.fillStyle = "rgba(147, 197, 253, .85)";
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
    }
  }

  function step() {
    for (const n of nodes) {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }
    draw();
    requestAnimationFrame(step);
  }

  resize();
  if (reduceMotion) {
    draw();
  } else {
    requestAnimationFrame(step);
    window.addEventListener("pointermove", e => { mouse = { x: e.clientX, y: e.clientY }; });
    document.addEventListener("pointerleave", () => { mouse = null; });
  }
  let t;
  let lastW = window.innerWidth;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(() => {
      // phones change the height while scrolling (address bar): only rebuild when the width changes
      if (window.innerWidth === lastW && Math.abs(window.innerHeight - h) < 160) return;
      lastW = window.innerWidth; resize(); if (reduceMotion) draw();
    }, 150);
  });
})();
