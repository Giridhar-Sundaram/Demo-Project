document.addEventListener('DOMContentLoaded', () => {
  // 1. Get all clickable project headers
  const headers = document.querySelectorAll('.projects__heading');

  // 2. Attach a click listener to each header
  headers.forEach((header) => {
    header.addEventListener('click', function () {
      const clickedHeader = this;

      // Find the associated content element (.projects__actions)
      const projectContainer = clickedHeader.closest('.projects');
      const content = projectContainer.querySelector('.projects__actions');

      // --- True Accordion Logic (Close others) ---

      // Get all other content elements and close them
      document.querySelectorAll('.projects__actions').forEach((item) => {
        if (item !== content) {
          // Remove the 'open' class to collapse the content
          item.classList.remove('open');
          item.classList.add('close');
          // Remove the 'active' class from the corresponding header
          item
            .closest('.projects')
            .querySelector('.projects__heading')
            .classList.remove('active');
        }
      });

      // --- Toggle Logic for the Clicked Project ---

      // Toggle the 'active' class on the clicked header
      clickedHeader.classList.toggle('active');

      // Toggle the 'open' class on the content for the CSS transition (slideToggle equivalent)
      content.classList.toggle('open');
    });
  });

  // 3. Set Initial State (Ensure all content is closed on load)
  // This is handled entirely by the CSS below (max-height: 0)
});
