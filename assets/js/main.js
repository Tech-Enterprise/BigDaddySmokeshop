const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const galleryButtons = document.querySelectorAll(".gallery-tabs button");
const galleryItems = document.querySelectorAll(".photo-grid figure");
const year = document.querySelector("#current-year");

if (window.lucide) {
  window.lucide.createIcons();
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));

    const icon = navToggle.querySelector("i");
    if (icon) {
      icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter || "all";

    galleryButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    galleryItems.forEach((item) => {
      const categories = item.dataset.category || "";
      const shouldShow = filter === "all" || categories.split(" ").includes(filter);
      item.classList.toggle("is-hidden", !shouldShow);
    });
  });
});
