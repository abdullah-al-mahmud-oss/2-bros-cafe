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

  var hero = document.querySelector(".hero--premium");
  if (hero) {
    var heroSlides = Array.prototype.slice.call(hero.querySelectorAll("[data-hero-slide]"));
    var slideCount = hero.querySelector("[data-slide-current]");
    var previousSlide = hero.querySelector("[data-hero-previous]");
    var toggleSlideshow = hero.querySelector("[data-hero-toggle]");
    var nextSlide = hero.querySelector("[data-hero-next]");
    var slideIndex = 0;
    var slideTimer = null;
    var pausedByUser = false;
    var pausedByInteraction = false;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function showSlide(index) {
      slideIndex = (index + heroSlides.length) % heroSlides.length;
      heroSlides.forEach(function (slide, position) {
        var active = position === slideIndex;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      if (slideCount) slideCount.textContent = String(slideIndex + 1).padStart(2, "0");
    }

    function stopSlideshow() {
      if (slideTimer) window.clearInterval(slideTimer);
      slideTimer = null;
    }

    function startSlideshow() {
      if (reduceMotion.matches || pausedByUser || pausedByInteraction || slideTimer || document.hidden || heroSlides.length < 2) return;
      slideTimer = window.setInterval(function () { showSlide(slideIndex + 1); }, 7000);
    }

    if (previousSlide) previousSlide.addEventListener("click", function () { showSlide(slideIndex - 1); });
    if (nextSlide) nextSlide.addEventListener("click", function () { showSlide(slideIndex + 1); });
    if (toggleSlideshow) toggleSlideshow.addEventListener("click", function () {
      pausedByUser = !pausedByUser;
      toggleSlideshow.setAttribute("aria-label", pausedByUser ? "Play photo slideshow" : "Pause photo slideshow");
      toggleSlideshow.textContent = pausedByUser ? "▶" : "Ⅱ";
      if (pausedByUser) stopSlideshow();
      else {
        pausedByInteraction = false;
        startSlideshow();
      }
    });
    hero.addEventListener("mouseenter", function () {
      pausedByInteraction = true;
      stopSlideshow();
    });
    hero.addEventListener("mouseleave", function () {
      pausedByInteraction = hero.contains(document.activeElement);
      if (!pausedByInteraction) startSlideshow();
    });
    hero.addEventListener("focusin", function () {
      pausedByInteraction = true;
      stopSlideshow();
    });
    hero.addEventListener("focusout", function () {
      window.requestAnimationFrame(function () {
        if (!hero.contains(document.activeElement)) {
          pausedByInteraction = hero.matches(":hover");
          if (!pausedByInteraction) startSlideshow();
        }
      });
    });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopSlideshow();
      else startSlideshow();
    });
    startSlideshow();
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
