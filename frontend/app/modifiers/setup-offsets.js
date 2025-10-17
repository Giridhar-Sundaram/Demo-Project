import { modifier } from 'ember-modifier';

export default modifier(function setupOffsets(element, [onOffset]) {
  try {
    const board = document.getElementById('ember-body');

    if (!board || !calendarElement) {
      console.warn('Elements not found!');
      return;
    }

    const offset = getOffsetRelativeTo(calendarElement, board);

    if (typeof onOffset === 'function') {
      onOffset(offset); // Send offset back to component
    }
  } catch (e) {
    console.error(e);
  }

  // Optional: Return cleanup if needed
  return () => {};
});

function getOffsetRelativeTo(element, relativeToElement) {
  const elementRect = element.getBoundingClientRect();
  const relativeRect = relativeToElement.getBoundingClientRect();

  return {
    top: elementRect.top - relativeRect.top,
    left: elementRect.left - relativeRect.left,
    bottom: elementRect.bottom - relativeRect.top,
    right: elementRect.right - relativeRect.left,
    width: elementRect.width,
    height: elementRect.height,
  };
}
