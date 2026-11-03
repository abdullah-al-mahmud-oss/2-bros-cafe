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
