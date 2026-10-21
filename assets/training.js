(function () {
  var form = document.getElementById("training-registration");
  var courses = Array.from(form.querySelectorAll('[name="courses[]"]'));
  var count = document.getElementById("course-count");
  var summary = document.getElementById("selected-courses");
  var params = new URLSearchParams(location.search);

  function updateSelection() {
    var selected = courses.filter(function (course) { return course.checked; });
    courses[0].setCustomValidity(selected.length ? "" : "Please select at least one course.");
    count.textContent = selected.length
      ? selected.length + (selected.length === 1 ? " course selected." : " courses selected.")
      : "No courses selected.";
    summary.textContent = selected.length
      ? selected.map(function (course) { return course.value; }).join("; ")
      : "Select your courses above.";
  }

  var requested = document.getElementById("course-" + params.get("course"));
  if (requested && courses.indexOf(requested) !== -1) requested.checked = true;
  courses.forEach(function (course) { course.addEventListener("change", updateSelection); });
  // Also refresh when returning from the submission service with browser Back.
  window.addEventListener("pageshow", updateSelection);
  updateSelection();

  if (params.get("registered") === "1") {
    var status = document.getElementById("registration-status");
    status.textContent = "Thank you. Your registration has been submitted. Sankofa Consulting will follow up to confirm dates, availability and your booking details.";
    status.focus();
    history.replaceState(null, "", location.pathname + "#registration");
  }
})();
