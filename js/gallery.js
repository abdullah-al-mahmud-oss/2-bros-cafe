(function () {
  "use strict";
  var dialog = document.querySelector(".lightbox");
  if (!dialog) return;

  var items = Array.from(document.querySelectorAll("[data-lightbox]"));
  var image = dialog.querySelector("img");
  var caption = dialog.querySelector("figcaption");
  var current = 0;

  function show(index) {
    current = (index + items.length) % items.length;
    var item = items[current];
    image.src = item.getAttribute("src");
    image.alt = item.getAttribute("data-alt") || "";
    caption.textContent = item.querySelector("span").textContent;
  }

  items.forEach(function (item, index) {
    item.addEventListener("click", function () {
      show(index);
      dialog.showModal();
      dialog.querySelector(".lightbox__close").focus();
    });
  });
  dialog.querySelector(".lightbox__close").addEventListener("click", function () {
    dialog.close();
  });
  dialog.querySelector(".lightbox__previous").addEventListener("click", function () {
    show(current - 1);
  });
  dialog.querySelector(".lightbox__next").addEventListener("click", function () {
    show(current + 1);
  });
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
}());
