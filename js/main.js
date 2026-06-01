/**
 * Atelier Studio — main.js
 * Merged: GPT's clean vanilla logic + OWL's GSAP, modal depth, cursor, preloader
 *
 *  1. Preloader with progress bar
 *  2. Scroll progress bar
 *  3. GSAP ScrollTrigger animations
 *  4. Fallback IntersectionObserver
 *  5. Mobile menu (open/close/escape)
 *  6. Navbar scroll state + active nav tracking
 *  7. Project filtering (All/Residential/Hospitality/Interior)
 *  8. Project modal with prev/next + keyboard nav
 *  9. Stat count-up animation
 * 10. Contact form validation with inline feedback
 * 11. Smooth scroll for anchor links
 * 12. Reduced-motion guard
 */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── 0. DARK MODE ─────────────────────────────────── */
  const darkToggle = document.getElementById("darkToggle");
  const savedDark = localStorage.getItem("atelier-dark") === "true";
  if (savedDark) document.body.classList.add("dark");
  if (darkToggle) darkToggle.setAttribute("aria-pressed", savedDark ? "true" : "false");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      localStorage.setItem("atelier-dark", isDark ? "true" : "false");
      darkToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }

  /* ── 1. PRELOADER ──────────────────────────────────── */
  const preloader = document.querySelector(".preloader");
  const preloaderBar = document.querySelector(".preloader__bar-fill");

  if (preloader && !prefersReduced) {
    let progress = 0;
    const totalTime = 1700;
    const tickInterval = 60;
    const ticks = totalTime / tickInterval;
    const increment = 100 / ticks;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += tickInterval;
      progress = Math.min((elapsed / totalTime) * 100, 100);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          preloader.classList.add("is-hidden");
          document.body.style.overflow = "";
          initHeroAnimations();
        }, 300);
      }
      if (preloaderBar) preloaderBar.style.width = progress + "%";
    }, tickInterval);
    document.body.style.overflow = "hidden";
  } else if (preloader) {
    preloader.classList.add("is-hidden");
  }

  /* ── 2. SCROLL PROGRESS ────────────────────────────── */
  const scrollFill = document.querySelector(".scroll-progress__fill");

  function updateScrollProgress() {
    if (!scrollFill) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollFill.style.width = pct + "%";
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);

  /* ── 3. GSAP SCROLL ANIMATIONS ─────────────────────── */
  function initHeroAnimations() {
    if (typeof gsap === "undefined" || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero entrance — text and UI elements only, image stays static
    gsap.from(".hero__copy .eyebrow", {
      opacity: 0, y: 24, duration: 0.8, ease: "power3.out", delay: 0.3,
    });
    gsap.from(".hero__copy h1", {
      opacity: 0, y: 32, duration: 1, ease: "power3.out", delay: 0.45,
    });
    gsap.from(".hero__copy .hero-lead", {
      opacity: 0, y: 24, duration: 0.8, ease: "power3.out", delay: 0.6,
    });
    gsap.from(".hero__copy .hero-actions .btn", {
      opacity: 0, y: 20, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.75,
    });
    gsap.from(".hero__copy .studio-note > div", {
      opacity: 0, y: 20, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.9,
    });
    gsap.from(".hero__aside", {
      opacity: 0, y: 30, duration: 1, ease: "power3.out", delay: 0.8,
    });

    // Section reveals
    gsap.utils.toArray(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
     );
    });
  }

  /* ── 4. FALLBACK IntersectionObserver ──────────────── */
  if (typeof gsap === "undefined" && !prefersReduced) {
    const reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
      );
      reveals.forEach((el) => observer.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add("is-visible"));
    }
  } else if (prefersReduced) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  }

  /* ── 5. MOBILE MENU ────────────────────────────────── */
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  function openMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ── 6. NAVBAR SCROLL + ACTIVE STATE ───────────────── */
  const siteHeader = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
    }
  }, { passive: true });

  // Active nav tracking
  const navLinks = Array.from(document.querySelectorAll(".desktop-nav a, .mobile-menu a"));
  const navTargets = navLinks
    .map((link) => {
      const href = link.getAttribute("href");
      return href && href.startsWith("#") ? document.querySelector(href) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && navTargets.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("is-current", link.getAttribute("href") === id);
        });
      });
    }, { threshold: 0.28, rootMargin: "-18% 0px -55% 0px" });

    navTargets.forEach((section) => navObserver.observe(section));
  }

  /* ── 7. SMOOTH SCROLL ──────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  /* ── 8. PROJECT FILTERING ──────────────────────────── */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      projectCards.forEach((card) => {
        const visible = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !visible);
      });
    });
  });

  /* ── 9. PROJECT MODAL with prev/next ───────────────── */
  const modal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");
  const modalTitle = document.getElementById("modalTitle");
  const modalMeta = document.getElementById("modalMeta");
  const modalYear = document.getElementById("modalYear");
  const modalDesc = document.getElementById("modalDesc");
  const modalLongDesc = document.getElementById("modalLongDesc");
  const modalImage = document.getElementById("modalImage");
  const modalLocation = document.getElementById("modalLocation");
  const modalYearVal = document.getElementById("modalYearVal");
  const modalType = document.getElementById("modalType");
  const modalDone = document.getElementById("modalDone");
  const modalPrev = document.getElementById("modalPrev");
  const modalNext = document.getElementById("modalNext");
  const allCards = Array.from(projectCards);
  let currentIdx = 0;
  let lastFocused = null;

  function populateModal(card) {
    if (modalImage) {
      modalImage.src = card.dataset.img || "";
      modalImage.alt = (card.dataset.title || "Project") + " image";
    }
    if (modalTitle) modalTitle.textContent = card.dataset.title || "";
    if (modalMeta) modalMeta.textContent = card.dataset.meta || "";
    if (modalYear) modalYear.textContent = card.dataset.year || "";
    if (modalDesc) modalDesc.textContent = card.dataset.desc || "";
    if (modalLongDesc) modalLongDesc.textContent = card.dataset.longDesc || "";
    if (modalLocation) modalLocation.textContent = card.dataset.location || "";
    if (modalYearVal) modalYearVal.textContent = card.dataset.year || "";
    if (modalType) modalType.textContent = card.dataset.type || "";

    if (modalPrev) modalPrev.disabled = (currentIdx === 0);
    if (modalNext) modalNext.disabled = (currentIdx === allCards.length - 1);
  }

  function openModal(idx) {
    if (!modal) return;
    currentIdx = idx;
    lastFocused = document.activeElement;
    populateModal(allCards[idx]);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (modalClose) modalClose.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (modalImage) { modalImage.src = ""; modalImage.alt = ""; }
    if (lastFocused && lastFocused.focus) { lastFocused.focus(); lastFocused = null; }
  }

  function goPrev() { if (currentIdx > 0) openModal(currentIdx - 1); }
  function goNext() { if (currentIdx < allCards.length - 1) openModal(currentIdx + 1); }

  allCards.forEach((card, i) => {
    card.addEventListener("click", () => openModal(i));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(i); }
    });
  });

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalDone) modalDone.addEventListener("click", closeModal);
  if (modalPrev) modalPrev.addEventListener("click", goPrev);
  if (modalNext) modalNext.addEventListener("click", goNext);

  if (modal) {
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  }

  document.addEventListener("keydown", (e) => {
    if (!modal || !modal.classList.contains("is-open")) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  /* ── 10. CONTACT FORM ──────────────────────────────── */
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form && feedback) {
    const style = document.createElement("style");
    style.textContent = `
      .form-row input, .form-row textarea, .form-row select {
        transition: border-color .3s ease;
      }
      .form-row input.is-invalid,
      .form-row textarea.is-invalid {
        border-bottom-color: var(--copper-dark) !important;
      }
    `;
    document.head.appendChild(style);

    form.addEventListener("input", () => {
      feedback.textContent = "";
      feedback.className = "form-feedback";
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;

      form.querySelectorAll("[required]").forEach((field) => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("is-invalid");
          setTimeout(() => field.classList.remove("is-invalid"), 2500);
        }
      });

      const email = form.querySelector("#email");
      if (email && email.value.trim() && !email.checkValidity()) {
        valid = false;
        email.classList.add("is-invalid");
        setTimeout(() => email.classList.remove("is-invalid"), 2500);
        feedback.className = "form-feedback error";
        feedback.textContent = "Please enter a valid email address.";
        return;
      }

      if (!valid) {
        feedback.className = "form-feedback error";
        feedback.textContent = "Please fill in the required fields.";
        return;
      }

      const submit = form.querySelector('button[type="submit"]');
      const original = submit.textContent;
      submit.textContent = "Sending…";
      submit.disabled = true;

      setTimeout(() => {
        feedback.className = "form-feedback success";
        feedback.textContent = "Demo inquiry received. Connect this form to a backend for production use.";
        submit.textContent = original;
        submit.disabled = false;
        form.reset();
      }, 900);
    });
  }

})();
