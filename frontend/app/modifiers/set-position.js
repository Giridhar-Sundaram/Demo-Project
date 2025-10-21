// app/modifiers/set-position.js
import { modifier } from 'ember-modifier';

export default modifier(function setPosition(element, [position]) {
  try {
    if (!position) return;

    if (position.top !== undefined) {
      element.style.top = `${position.top}px`;
    }

    if (position.left !== undefined) {
      element.style.left = `${position.left}px`;
    }
  } catch (e) {
    console.error(e);
  }

  return () => {
    element.style.top = '';
    element.style.left = '';
  };
});
