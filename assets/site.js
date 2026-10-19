(function () {
  // Mobile menu.
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("primary-nav");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", function () {
    setMenu(!menu.classList.contains("open"));
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  // Contextual CTAs prefill the enquiry form so it reaches the right partner.
  var enquiry = document.getElementById("enquiry");
  document.querySelectorAll("[data-interest]").forEach(function (link) {
    link.addEventListener("click", function () {
      enquiry.elements.interest.value = link.dataset.interest;
      var programme = link.dataset.programme;
      enquiry.elements.message.value =
        link.dataset.message ||
        (programme
          ? enquiry.dataset.registerTemplate.replace("{programme}", programme)
          : "");
    });
  });

  // Language switch keeps the visitor on the section they were reading.
  document.querySelectorAll(".lang a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (location.hash) link.hash = location.hash;
    });
  });

  // Newsletter signup is still a placeholder until an email platform is chosen.
  var newsletter = document.getElementById("newsletter");
  if (newsletter) newsletter.addEventListener("submit", function (e) {
    e.preventDefault();
    newsletter.querySelector(".form-status").textContent =
      newsletter.dataset.success;
    newsletter.reset();
  });

  // FormSubmit redirects successful enquiries back with this query parameter.
  // Replace the URL so refreshing the page does not repeat the confirmation.
  var params = new URLSearchParams(location.search);
  if (enquiry && params.get("submitted") === "1") {
    enquiry.querySelector(".form-status").textContent = enquiry.dataset.success;
    history.replaceState(null, "", location.pathname + "#contact");
  }

  // Insights topic filter.
  var filters = document.querySelectorAll(".filters button");
  var articles = document.querySelectorAll(".articles article");
  var empty = document.getElementById("no-articles");
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var topic = button.dataset.topic;
      var shown = 0;
      filters.forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === button));
      });
      articles.forEach(function (article) {
        var match =
          topic === "all" ||
          article.dataset.topics.split(" ").indexOf(topic) > -1;
        article.hidden = !match;
        if (match) shown++;
      });
      empty.hidden = shown > 0;
    });
  });
})();
