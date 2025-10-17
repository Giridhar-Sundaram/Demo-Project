import { modifier } from 'ember-modifier';

export default modifier(function autofocus(element) {
  if (element && typeof element.focus === 'function') {
    element.focus();
  }
});
