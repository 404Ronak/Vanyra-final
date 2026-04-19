/* ============================================================
   VANYRA — script.js v3
   Custom cursor · Parallax · Dust particles · Scroll progress
   Collection filter · Product page · Contact form
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     PRODUCT DATA
     ---------------------------------------------------------- */
  const PRODUCTS = {
    "forest-bowl": {
      name:     "Forest Bowl",
      price:    "₹4,800",
      ship:     "Ready to Ship — dispatched within 3 business days.",
      image:    "https://images.unsplash.com/photo-1610701596007-11502849e13f?w=1000&q=90",
      story:    "<p>A shallow curve that catches morning light. Hand-turned from a single piece of teak sourced from the Dang forest reserve, each bowl holds the grain of its origin.</p><p>No two bowls are identical — the wood decides.</p>",
      delivery: "Shipped in linen wrap. Natural oils only. Avoid prolonged water contact.",
    },
    "bamboo-tray": {
      name:     "Bamboo Tray",
      price:    "₹3,200",
      ship:     "Made to Order — allow 10–14 days.",
      image:    "https://images.unsplash.com/photo-1600585152220-90363fe27e38?w=1000&q=90",
      story:    "<p>For objects you want to see, not store away. Woven bamboo base, hardwood frame — a quiet surface for daily rituals.</p>",
      delivery: "Wipe with a dry cloth. Avoid direct sunlight for extended periods.",
    },
    "river-spoon": {
      name:     "River Spoon Set",
      price:    "₹2,400",
      ship:     "Ready to Ship — dispatched within 3 business days.",
      image:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=90",
      story:    "<p>Cool to the touch — shaped for daily ceremony. Each spoon in the set is carved individually, following the grain rather than against it.</p>",
      delivery: "Hand wash only. Rub with coconut oil monthly to preserve finish.",
    },
    "dusk-vessel": {
      name:     "Dusk Vessel",
      price:    "₹6,200",
      ship:     "Made to Order — allow 14–21 days.",
      image:    "https://images.unsplash.com/photo-1615876234884-f3139a52330b?w=1000&q=90",
      story:    "<p>Tall silence — for stems or standing alone. Turned on a slow lathe over two days, the vessel's proportions are resolved entirely by feel.</p>",
      delivery: "Interior sealed. Suitable for dried stems. Not waterproof.",
    },
    "monsoon-board": {
      name:     "Monsoon Board",
      price:    "₹5,400",
      ship:     "Ready to Ship — dispatched within 3 business days.",
      image:    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=90",
      story:    "<p>Generous grain — meant to be shared. The board is cut from a single slab, allowing the natural edge to define one side.</p>",
      delivery: "Oil with food-safe mineral oil before first use. Hand wash only.",
    },
    "amber-box": {
      name:     "Amber Keepsake Box",
      price:    "₹3,900",
      ship:     "Made to Order — allow 10–14 days.",
      image:    "https://images.unsplash.com/photo-1611485988300-b7530defb8e2?w=1000&q=90",
      story:    "<p>A quiet lid — for letters and small treasures. Dovetail joints, no glue. The fit tightens with humidity, loosens in dry air — the wood breathes.</p>",
      delivery: "Do not store in direct heat. Interior unfinished — the wood scent is intentional.",
    },
  };

  /* ----------------------------------------------------------
     PAGE LOAD
     ---------------------------------------------------------- */
  window.addEventListener("load", () => {
    document.body.classList.add("is-loaded");
  });

  /* ----------------------------------------------------------
     SCROLL PROGRESS BAR
     ---------------------------------------------------------- */
  const progressBar = document.querySelector(".scroll-progress");
  function updateProgress() {
    if (!progressBar) return;
    const pct = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = pct > 0
      ? (window.scrollY / pct * 100) + "%"
      : "0%";
  }

  /* ----------------------------------------------------------
     HEADER scroll state
     ---------------------------------------------------------- */
  const header = document.getElementById("site-header");
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 48);
  }

  /* ----------------------------------------------------------
     PARALLAX HERO
     ---------------------------------------------------------- */
  const heroBg = document.querySelector(".hero__bg");
  function updateParallax() {
    if (!heroBg || window.scrollY >= window.innerHeight) return;
    heroBg.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.06)`;
  }

  /* combined scroll */
  window.addEventListener("scroll", () => {
    updateProgress();
    updateHeader();
    updateParallax();
  }, { passive: true });
  updateProgress();
  updateHeader();

  /* ----------------------------------------------------------
     CUSTOM CURSOR
     ---------------------------------------------------------- */
  if (window.matchMedia("(pointer: fine)").matches) {
    const dot  = Object.assign(document.createElement("div"), { className: "cursor-dot"  });
    const ring = Object.assign(document.createElement("div"), { className: "cursor-ring" });
    document.body.append(dot, ring);

    let mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    });

    (function tick() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      requestAnimationFrame(tick);
    })();

    document.addEventListener("mouseleave", () => document.body.classList.add("cursor-hidden"));
    document.addEventListener("mouseenter", () => document.body.classList.remove("cursor-hidden"));
  }

  /* ----------------------------------------------------------
     MENU TOGGLE
     ---------------------------------------------------------- */
  const menuToggle  = document.querySelector(".menu-toggle");
  const menuOverlay = document.getElementById("site-menu");

  if (menuToggle && menuOverlay) {
    const isOpen  = () => menuToggle.getAttribute("aria-expanded") === "true";
    const open    = () => {
      menuOverlay.hidden = false;
      menuToggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      const first = menuOverlay.querySelector("a");
      if (first) setTimeout(() => first.focus(), 60);
    };
    const close   = () => {
      menuOverlay.hidden = true;
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    menuToggle.addEventListener("click", () => isOpen() ? close() : open());
    menuOverlay.querySelectorAll("a").forEach(a => a.addEventListener("click", close));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && isOpen()) { close(); menuToggle.focus(); } });
  }

  /* ----------------------------------------------------------
     DUST PARTICLES
     ---------------------------------------------------------- */
  const dustWrap = document.querySelector(".hero__dust");
  if (dustWrap) {
    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "dust-particle";
      const size = Math.random() * 2 + 1;
      p.style.cssText = `
        left:${Math.random()*100}%;
        width:${size}px; height:${size}px;
        animation-duration:${Math.random()*18+12}s;
        animation-delay:${Math.random()*-24}s;
        opacity:${Math.random()*0.5+0.15};
      `;
      dustWrap.appendChild(p);
    }
  }

  /* ----------------------------------------------------------
     INTERSECTION OBSERVER — reveal + outro + story
     ---------------------------------------------------------- */
  if ("IntersectionObserver" in window) {
    // General reveal
    new IntersectionObserver(
      (entries, obs) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    ).observe && document.querySelectorAll(".reveal").forEach(el =>
      new IntersectionObserver(
        ([e], obs) => { if (e.isIntersecting) { el.classList.add("is-visible"); obs.unobserve(el); } },
        { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
      ).observe(el)
    );

    // Outro
    const outro = document.querySelector(".section--outro");
    if (outro) new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) outro.classList.add("is-visible"); },
      { threshold: 0.22 }
    ).observe(outro);

    // Story asymmetric shift
    const storyMedia = document.querySelector(".story-split__media");
    if (storyMedia) new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) storyMedia.classList.add("is-visible"); },
      { threshold: 0.2 }
    ).observe(storyMedia);

  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
    const outro = document.querySelector(".section--outro");
    if (outro) outro.classList.add("is-visible");
  }

  /* ----------------------------------------------------------
     PAGE TRANSITION
     ---------------------------------------------------------- */
  document.querySelectorAll("a[href]").forEach(link => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("http")) return;
    link.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.add("is-page-exit");
      setTimeout(() => { window.location.href = href; }, 360);
    });
  });

  /* ----------------------------------------------------------
     COLLECTION FILTER
     ---------------------------------------------------------- */
  const filterBtns      = document.querySelectorAll(".filter-btn");
  const collectionItems = document.querySelectorAll(".collection-item");

  if (filterBtns.length && collectionItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const filter = btn.dataset.filter;
        let vi = 0;
        collectionItems.forEach(item => {
          const show = filter === "all"
            || item.dataset.ship === filter
            || item.dataset.cat  === filter;
          if (show) {
            item.classList.remove("is-hidden");
            item.style.transitionDelay = `${vi++ * 0.07}s`;
          } else {
            item.classList.add("is-hidden");
            item.style.transitionDelay = "0s";
          }
        });
      });
    });
  }

  /* ----------------------------------------------------------
     PRODUCT PAGE
     ---------------------------------------------------------- */
  const productRoot    = document.getElementById("product-root");
  const productMissing = document.getElementById("product-missing");

  if (productRoot) {
    const key  = new URLSearchParams(window.location.search).get("p") || "";
    const data = PRODUCTS[key];
    const $    = id => document.getElementById(id);

    if (data) {
      const img = $("product-image");
      if (img) { img.src = data.image; img.alt = data.name; }
      if ($("product-name"))     $("product-name").textContent     = data.name;
      if ($("product-price"))    $("product-price").textContent    = data.price;
      if ($("product-ship"))     $("product-ship").textContent     = data.ship;
      if ($("product-story"))    $("product-story").innerHTML      = data.story;
      if ($("product-delivery")) $("product-delivery").textContent = data.delivery;
      if ($("product-bc-name"))  $("product-bc-name").textContent  = data.name;
      document.title = `${data.name} — VANYRA`;
      if (img) {
        img.onload = () => productRoot.classList.add("is-ready");
        if (img.complete) productRoot.classList.add("is-ready");
      }
      const buyBtn = $("product-buy");
      if (buyBtn) buyBtn.addEventListener("click", () => {
        buyBtn.textContent = "Request sent ✓";
        buyBtn.disabled = true;
      });
    } else {
      productRoot.hidden = true;
      if (productMissing) productMissing.hidden = false;
    }
  }

  /* ----------------------------------------------------------
     CONTACT FORM
     ---------------------------------------------------------- */
  const form       = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
      setTimeout(() => {
        if (formStatus) {
          formStatus.textContent = "Message received. We will reply within two business days.";
          formStatus.style.color = "var(--gold)";
        }
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = "Send message"; }
      }, 1200);
    });
  }

})();
