// Ashleigh Duncan Counselling & Somatic Wellness — shared site script
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector("nav.main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
      });
    });
  }

  // Contact form: submit via fetch so we can show an inline success card
  var form = document.getElementById("contact-form");
  if (form) {
    var successBox = document.getElementById("form-success");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = form.querySelector("button[type=submit]");
      var originalText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) { submitBtn.textContent = "Sending…"; submitBtn.disabled = true; }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.style.display = "none";
            if (successBox) successBox.classList.add("show");
          } else {
            throw new Error("Network response was not ok");
          }
        })
        .catch(function () {
          alert("Something went wrong sending your message. Please try texting or emailing us directly, details are on this page.");
          if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
        });
    });
  }
});

  // Services page: highlight the jump-bar pill for the section in view
  var pills = document.querySelectorAll(".service-pill");
  if (pills.length) {
    var sections = ["counselling", "somatic", "wellness", "reiki"]
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    var setActive = function (id) {
      pills.forEach(function (p) {
        p.classList.toggle("active", p.getAttribute("href") === "#" + id);
      });
    };
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(function (sec) { observer.observe(sec); });
  }
