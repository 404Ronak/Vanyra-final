(function () {
  "use strict";

  var TRANSITION_MS = 720;

  var PRODUCTS = {
    "forest-bowl": {
      name: "Forest Bowl",
      price: "₹4,800",
      ship: "Ready to ship within 5–7 days.",
      image: "https://images.unsplash.com/photo-1610701596007-11502849e13f?w=1400&q=88",
      imageAlt: "Hand-turned wooden bowl on a dark surface",
      story: [
        "You notice it first in still mornings — how the rim catches a thin line of light, like water paused at the edge of a leaf.",
        "Turned slowly from dense forest wood, this bowl is not loud craft. It is a quiet invitation: fruit, incense, or nothing at all.",
      ],
      delivery:
        "Ships wrapped in cloth and paper. Pan-India courier. International on request — we reply with timing and care notes.",
    },
    "bamboo-tray": {
      name: "Bamboo Tray",
      price: "₹3,200",
      ship: "Made to order — allow 3–4 weeks.",
      image: "https://images.unsplash.com/photo-1600585152220-90363fe27e38?w=1400&q=88",
      imageAlt: "Minimal wooden tray",
      story: [
        "Bamboo asks for patience. We follow its fibers instead of forcing symmetry — so each tray carries a slightly different song.",
        "Use it where you want calm: keys, tea, a single book. It frames the ordinary until the ordinary feels considered.",
      ],
      delivery:
        "Each tray is oiled by hand before dispatch. Lead time confirmed after order. Pickup available from our Dang studio.",
    },
    "river-spoon": {
      name: "River Spoon Set",
      price: "₹2,400",
      ship: "Ready to ship within 5–7 days.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=88",
      imageAlt: "Hand-carved wooden spoons",
      story: [
        "Cool weight in the hand, edges softened by hours of sanding. These spoons belong to slow kitchens and unhurried meals.",
        "A set of three — similar in spirit, unique in grain. Meant to be used, washed, and set down with the same care you give the table.",
      ],
      delivery:
        "Nested in a slim paper sleeve, then boxed. Gift notes available — leave a line in your message to us.",
    },
    "dusk-vessel": {
      name: "Dusk Vessel",
      price: "₹6,200",
      ship: "Made to order — allow 4–5 weeks.",
      image: "https://images.unsplash.com/photo-1615876234884-f3139a52330b?w=1400&q=88",
      imageAlt: "Tall wooden vessel",
      story: [
        "Height changes a room — this piece draws the eye upward without shouting. We leave the exterior almost untouched; the story is in the silhouette.",
        "For dried stems, a single branch, or standing empty beside a window where the light goes amber before night.",
      ],
      delivery:
        "Crated for safe travel. We photograph your piece before it leaves so you can anticipate its arrival.",
    },
    "monsoon-board": {
      name: "Monsoon Board",
      price: "₹5,400",
      ship: "Ready to ship within 7–10 days.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=88",
      imageAlt: "Large wooden serving board",
      story: [
        "Wide enough for bread, fruit, and hands reaching at once. Grain chosen for depth — you will find new lines each time you look.",
        "Oiled for food contact, sanded until the surface feels honest under the fingertips.",
      ],
      delivery:
        "Heavy parcel — tracked shipping. Care card included for washing and re-oiling over the years.",
    },
    "amber-box": {
      name: "Amber Keepsake Box",
      price: "₹3,900",
      ship: "Made to order — allow 3 weeks.",
      image: "https://images.unsplash.com/photo-1611485988300-b7530defb8e2?w=1400&q=88",
      imageAlt: "Wooden keepsake box",
      story: [
        "A small lid should close with intention — not a snap, but a soft certainty. Inside, space for what you do not want lost to noise.",
        "Warm interior tone; exterior left matte so fingerprints become part of its life, not flaws.",
      ],
      delivery:
        "Ships in a fitted box. Monogramming on request (add a note when you write to us).",
    },
  };

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  function isInternalPageLink(anchor) {
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#") return false;
    if (href.indexOf("mailto:") === 0) return false;
    if (anchor.getAttribute("target") === "_blank") return false;
    if (/^https?:\/\//i.test(href)) {
      try {
        var u = new URL(href, window.location.href);
        return u.origin === window.location.origin;
      } catch (e) {
        return false;
      }
    }
    return /\.html(\?|#|$)/.test(href);
  }

  function navigateWithTransition(url) {
    document.body.classList.add("is-page-exit");
    window.setTimeout(function () {
      window.location.href = url;
    }, TRANSITION_MS);
  }

  function initPageTransitions() {
    document.addEventListener("click", function (e) {
      var anchor = e.target.closest && e.target.closest("a");
      if (!anchor || !isInternalPageLink(anchor)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (anchor.getAttribute("download")) return;
      var href = anchor.getAttribute("href");
      var url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      e.preventDefault();
      navigateWithTransition(anchor.href);
    });
  }

  function initMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.getElementById("site-menu");
    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        menu.removeAttribute("hidden");
        document.body.style.overflow = "hidden";
      } else {
        menu.setAttribute("hidden", "");
        document.body.style.overflow = "";
      }
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  function initCollectionFilters() {
    var grid = document.getElementById("collection-grid");
    if (!grid) return;

    var buttons = document.querySelectorAll(".filter-btn");
    var items = grid.querySelectorAll(".collection-item");

    function applyFilter(key) {
      items.forEach(function (item) {
        var ship = item.getAttribute("data-ship");
        var cat = item.getAttribute("data-cat");
        var show = true;
        if (key === "all") {
          show = true;
        } else if (key === "ready") {
          show = ship === "ready";
        } else if (key === "order") {
          show = ship === "order";
        } else if (key === "serve" || key === "dwell" || key === "ritual") {
          show = cat === key;
        }
        item.classList.toggle("is-hidden", !show);
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        applyFilter(btn.getAttribute("data-filter") || "all");
      });
    });
  }

  function getQueryParam(name) {
    var params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  function initProductPage() {
    var root = document.getElementById("product-root");
    if (!root) return;

    var id = getQueryParam("p");
    var data = id && PRODUCTS[id];
    var missing = document.getElementById("product-missing");
    var img = document.getElementById("product-image");
    var nameEl = document.getElementById("product-name");
    var priceEl = document.getElementById("product-price");
    var shipEl = document.getElementById("product-ship");
    var storyEl = document.getElementById("product-story");
    var deliveryEl = document.getElementById("product-delivery");
    var bc = document.getElementById("product-bc-name");
    var buy = document.getElementById("product-buy");

    if (!data) {
      root.setAttribute("hidden", "");
      if (missing) missing.removeAttribute("hidden");
      document.title = "Not found — VANYRA";
      return;
    }

    document.title = data.name + " — VANYRA";
    if (img) {
      img.onload = function () {
        root.classList.add("is-ready");
      };
      img.onerror = function () {
        root.classList.add("is-ready");
      };
      img.src = data.image;
      img.alt = data.imageAlt;
      if (img.complete) {
        root.classList.add("is-ready");
      }
    } else {
      root.classList.add("is-ready");
    }
    if (nameEl) nameEl.textContent = data.name;
    if (priceEl) priceEl.textContent = data.price;
    if (shipEl) shipEl.textContent = data.ship;
    if (bc) bc.textContent = data.name;
    if (deliveryEl) deliveryEl.textContent = data.delivery;

    if (storyEl) {
      storyEl.innerHTML = "";
      data.story.forEach(function (para) {
        var p = document.createElement("p");
        p.textContent = para;
        storyEl.appendChild(p);
      });
    }

    if (buy) {
      buy.addEventListener("click", function () {
        var subject = encodeURIComponent("Purchase inquiry: " + data.name);
        var body = encodeURIComponent(
          "Hello VANYRA,\n\nI would like to inquire about: " +
            data.name +
            " (" +
            data.price +
            ").\n\n"
        );
        window.location.href = "mailto:hello@vanyra.com?subject=" + subject + "&body=" + body;
      });
    }
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    var status = document.getElementById("form-status");
    if (!form || !status) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var name = (fd.get("name") || "").toString().trim();
      var email = (fd.get("email") || "").toString().trim();
      var message = (fd.get("message") || "").toString().trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill in all fields.";
        return;
      }

      var subject = encodeURIComponent("VANYRA — message from " + name);
      var body = encodeURIComponent(message + "\n\n—\n" + name + "\n" + email);
      status.textContent = "Opening your email app…";
      window.location.href = "mailto:hello@vanyra.com?subject=" + subject + "&body=" + body;
    });
  }

  function markLoaded() {
    requestAnimationFrame(function () {
      document.body.classList.add("is-loaded");
    });
  }

  function initHeaderScroll() {
    var header = document.getElementById("site-header");
    if (!header) return;
    var threshold = 56;
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      if (y > threshold) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  onReady(function () {
    initMenu();
    initHeaderScroll();
    initPageTransitions();
    initReveal();
    initCollectionFilters();
    initProductPage();
    initContactForm();
    markLoaded();
  });
})();
