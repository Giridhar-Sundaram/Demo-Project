import { modifier } from 'ember-modifier';

export default modifier(function stopPropagation(element, [action]) {
  const handler = function (event) {
    event.stopPropagation();

    if (typeof action === 'function') {
      action(event);
    }
  };

  element.addEventListener('click', handler);

  return () => {
    element.removeEventListener('click', handler);
  };
});
