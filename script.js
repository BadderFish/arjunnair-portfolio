/* Fun-but-professional enhancements */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (dark/light) + persistence
  const themeBtn = $("#themeToggle");
  const stored = localStorage.getItem("theme");
  if (stored) document.documentElement.dataset.theme = stored;

  const setTheme = (t) => {
    document.documentElement.dataset.theme = t;
    localStorage.setItem("theme", t);
    themeBtn?.setAttribute("aria-pressed", String(t === "light"));
  };

  themeBtn?.addEventListener("click", () => {
    const cur = document.documentElement.dataset.theme || "dark";
    setTheme(cur === "dark" ? "light" : "dark");
  });

  // Smooth scroll for in-page links
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  // Active nav highlight
  const navLinks = $$(".nav a[href^='#']");
  const sections = ["about","projects","experience","skills","leadership","contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((l) =>
        l.classList.toggle("active", l.getAttribute("href") === `#${id}`)
      );
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

  sections.forEach((s) => io.observe(s));

  // Typewriter effect (subtle) on hero title
  const heroTitle = $("#heroTitle");
  if (heroTitle) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!prefersReduced) {
      const text = heroTitle.textContent.trim();
      heroTitle.textContent = "";
      let i = 0;
      const tick = () => {
        heroTitle.textContent = text.slice(0, i);
        i++;
        if (i <= text.length) requestAnimationFrame(tick);
      };
      setTimeout(() => requestAnimationFrame(tick), 120);
    }
  }

  // Project search filter
  const search = $("#projectSearch");
  const cards = $$(".project");
  search?.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    cards.forEach((card) => {
      card.style.display = card.textContent.toLowerCase().includes(q) ? "" : "none";
    });
  });

  // Easter egg: Konami code -> confetti
  const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let k = 0;

  window.addEventListener("keydown", (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const expected = konami[k];
    const ok = expected.length === 1 ? expected === key : expected === key;

    if (ok) {
      k++;
      if (k === konami.length) { k = 0; confetti(); toast("🎉 Nice. You found the easter egg."); }
    } else k = 0;
  });

  function confetti() {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    document.body.appendChild(layer);

    for (let i = 0; i < 120; i++) {
      const p = document.createElement("span");
      p.className = "confetti";
      p.style.left = Math.random() * 100 + "vw";
      p.style.animationDelay = Math.random() * 0.5 + "s";
      p.style.transform = `translateY(-10px) rotate(${Math.random() * 360}deg)`;
      layer.appendChild(p);
    }
    setTimeout(() => layer.remove(), 1800);
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 250);
    }, 1400);
  }
})();
