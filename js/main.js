// Summerset – home page scripts
document.addEventListener("DOMContentLoaded", function () {
  // Keep the footer year current
  var year = document.getElementById("year");
  if (year) { year.textContent = new Date().getFullYear(); }

  // Close the mobile menu after choosing an in-page link (Shop / About)
  var menu = document.getElementById("mainNav");
  if (menu) {
    menu.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (menu.classList.contains("show")) {
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });
  }

  // Highlight the nav link of the section currently in view
  var links = document.querySelectorAll('.site-navbar .nav-link[href^="#"], .site-navbar .nav-link[href="index.html"]');
  var sections = [
    { id: "shop",  link: document.querySelector('.nav-link[href="#shop"]') },
    { id: "about", link: document.querySelector('.nav-link[href="#about"]') }
  ];
  var home = document.querySelector('.nav-link[href="index.html"]');

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) { return; }
        links.forEach(function (l) { l.classList.remove("active"); l.removeAttribute("aria-current"); });
        var match = sections.find(function (s) { return s.id === entry.target.id; });
        var target = match ? match.link : home;
        if (target) { target.classList.add("active"); target.setAttribute("aria-current", "page"); }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    ["shop", "about"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { observer.observe(el); }
    });
    var hero = document.querySelector(".hero");
    if (hero) { observer.observe(hero); }
  }
});
