(function () {
  "use strict";

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  var origin = window.SITE_CONFIG && window.SITE_CONFIG.productionOrigin;
  if (origin && /^https:\/\/[^/]+\/?$/.test(origin)) {
    var canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = origin.replace(/\/$/, "") + window.location.pathname;
    document.head.appendChild(canonical);
    var socialUrl = document.createElement("meta");
    socialUrl.setAttribute("property", "og:url");
    socialUrl.content = canonical.href;
    document.head.appendChild(socialUrl);
  }

  var header = document.querySelector(".site-header");
  var revealItems = document.querySelectorAll("[data-reveal]");
  var revealObserver = null;
  var progress = document.createElement("div");
  progress.className = "scroll-progress";
  progress.setAttribute("aria-hidden", "true");
  var progressBar = document.createElement("span");
  progress.appendChild(progressBar);
  document.body.appendChild(progress);

  function updateScrollChrome() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollRange = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle("is-scrolled", scrollTop > 24);
    document.body.classList.toggle("has-scrolled", scrollTop > 280);
    progressBar.style.transform = "scaleX(" + (scrollRange > 0 ? Math.min(scrollTop / scrollRange, 1) : 0) + ")";
    if (revealObserver) {
      revealItems.forEach(function (item) {
        if (item.getBoundingClientRect().top >= window.innerHeight + 120) return;
        item.classList.add("is-visible");
        revealObserver.unobserve(item);
      });
    }
  }

  var scrollPending = false;
  window.addEventListener("scroll", function () {
    if (scrollPending) return;
    scrollPending = true;
    window.requestAnimationFrame(function () {
      updateScrollChrome();
      scrollPending = false;
    });
  }, { passive: true });
  window.addEventListener("resize", updateScrollChrome);
  updateScrollChrome();

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && revealItems.length) {
    document.documentElement.classList.add("has-motion");
    revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.08 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");
  if (!toggle || !nav) return;

  function setMenuOpen(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.querySelector(".sr-only").textContent = open ? "Close navigation" : "Open navigation";
    nav.classList.toggle("is-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });
  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) setMenuOpen(false);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 850) setMenuOpen(false);
  });
}());
