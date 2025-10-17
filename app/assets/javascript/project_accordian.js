// app/javascript/projects_accordion.js

// --- Global Helper for State Restoration ---
// This function needs to be defined globally so it can be accessed by the sidebar logic.
// This assumes your Ember service exposes the activeProjectId globally (e.g., via window.getGlobalActiveProjectId).

function restoreSidebarState() {
  // 🛑 ASSUMPTION: You have a global getter for the active Project ID from your Ember service.
  const activeId = window.getGlobalActiveProjectId
    ? window.getGlobalActiveProjectId()
    : null;

  // Clear previous active states
  document
    .querySelectorAll(".projects__actions.open")
    .forEach((el) => el.classList.remove("open"));
  document
    .querySelectorAll(".projects__heading.active")
    .forEach((el) => el.classList.remove("active"));
  document
    .querySelectorAll(".projects__actions li.highlighted")
    .forEach((li) => li.classList.remove("highlighted"));

  if (!activeId) return;

  const projectContainer = document.querySelector(
    `.projects[data-project-id="${activeId}"]`
  );

  if (projectContainer) {
    // 1. Restore the accordion open state
    projectContainer
      .querySelector(".projects__heading")
      .classList.add("active");
    projectContainer.querySelector(".projects__actions").classList.add("open");

    // 2. Restore link highlighting based on current URL path
    const currentPath = window.location.pathname;
    const activeLink = projectContainer.querySelector(
      `a[href$="${currentPath}"][data-ember-link="true"]`
    );

    if (activeLink) {
      // Find the parent LI of the active link and highlight it
      activeLink.closest("li").classList.add("highlighted");
    }
  }
}

// --- 1. Navigation Interception Logic (Stops collapse and handles highlighting) ---
const handleNavigationClick = (event) => {
  const listItem = event.target.closest(".projects__actions li");

  if (listItem) {
    // Stop propagation: Prevents the click from reaching the header logic
    event.stopPropagation();

    // De-highlight all other items in the UL
    listItem
      .closest(".projects__actions")
      .querySelectorAll("li")
      .forEach((item) => {
        item.classList.remove("highlighted");
      });

    // Highlight the clicked item
    listItem.classList.add("highlighted");

    // 🛑 CRITICAL: We also need to record the active project ID for persistence
    const projectContainer = listItem.closest(".projects");
    if (projectContainer) {
      const projectId = projectContainer.getAttribute("data-project-id");
      if (window.setGlobalActiveProject) {
        window.setGlobalActiveProject(projectId);
      }
    }
  }
};

// --- 2. Accordion Toggle Logic (Attached only to the specific icon) ---
const setupAccordionListeners = () => {
  const toggleTriggers = document.querySelectorAll(
    ".projects__heading .toggle-trigger"
  );
  const actionsLists = document.querySelectorAll(".projects__actions");

  if (toggleTriggers.length === 0) {
    return;
  }

  toggleTriggers.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      event.stopPropagation();

      const projectContainer = trigger.closest(".projects");
      const heading = projectContainer.querySelector(".projects__heading");
      const content = projectContainer.querySelector(".projects__actions");

      // Close others logic
      document.querySelectorAll(".projects__actions").forEach((item) => {
        if (item !== content) {
          item.classList.remove("open");
          item
            .closest(".projects")
            .querySelector(".projects__heading")
            .classList.remove("active");
        }
      });

      // Toggle logic
      heading.classList.toggle("active");
      content.classList.toggle("open");

      // If closing, clear the active project state in the service
      if (
        !content.classList.contains("open") &&
        window.setGlobalActiveProject
      ) {
        window.setGlobalActiveProject(null);
      }
    });
  });

  // Attach navigation interception logic to all UL containers
  actionsLists.forEach((list) => {
    list.addEventListener("click", handleNavigationClick);
  });

  // 🛑 RESTORE STATE ONCE SETUP IS COMPLETE
  restoreSidebarState();
};

// --- Universal Event Listeners (Triggers setup) ---

// Listen for the Custom Event dispatched by your Ruby view
document.addEventListener("projectsRendered", setupAccordionListeners);

// Listen for initial full page load
document.addEventListener("DOMContentLoaded", setupAccordionListeners);

// Listen for Ember/Turbo navigation events
document.addEventListener("turbo:load", setupAccordionListeners);
