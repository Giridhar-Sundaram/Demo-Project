// app/modifiers/set-position.js
import { modifier } from 'ember-modifier';

export default modifier(function setPosition(element, [position]) {
  try {
    console.log('running set-position');
    if (!position) return;

    if (position.top !== undefined) {
      element.style.top = `${position.top}px`;
    }

    if (position.left !== undefined) {
      element.style.left = `${position.left}px`;
    }

    if (position.display !== undefined) {
      element.style.display = position.display;
    }
  } catch (e) {
    console.error(e);
  }

  return () => {
    element.style.top = '';
    element.style.left = '';
    element.style.display = 'none';
  };
});
