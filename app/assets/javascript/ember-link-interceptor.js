document.addEventListener("click", function (event) {
  const link = event.target.closest("a[data-ember-link]");
  if (!link) return;

  event.preventDefault();

  const href = link.getAttribute("href");

  // Wait for Ember to be available
  if (window.Ember?.Application?.instance) {
    const router = Ember.Application.instance.lookup("router:main");
    const cleanPath = href.replace(/^\/ember/, ""); // Optional: remove prefix
    router.transitionTo(cleanPath);
  } else {
    console.warn("Ember not yet booted");
  }
});
