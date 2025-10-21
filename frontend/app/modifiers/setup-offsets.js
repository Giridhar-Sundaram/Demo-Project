import { modifier } from 'ember-modifier';
import { TOP_OFFSET, LEFT_OFFSET } from 'frontend/constants/offsets';

export default modifier(function setupOffsets(element, [onOffset]) {
  try {
    const body = document.getElementById('ember-body');

    if (!body || !element) {
      console.warn('Elements not found!');
      return;
    }

    const offset = getOffsetRelativeTo(element, body);

    if (typeof onOffset === 'function') {
      onOffset(offset);
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
    top: elementRect.top - relativeRect.top + TOP_OFFSET,
    left: elementRect.left - relativeRect.left + LEFT_OFFSET,
    bottom: elementRect.bottom - relativeRect.top + TOP_OFFSET,
    right: elementRect.right - relativeRect.left + LEFT_OFFSET,
    width: elementRect.width,
    height: elementRect.height,
  };
}
