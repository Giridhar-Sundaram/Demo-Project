import { modifier } from 'ember-modifier';

export default modifier(function clickOutside(element, [onOutsideClick]) {
  function handleClick(event) {
    if (!element.contains(event.target)) {
      if (typeof onOutsideClick === 'function') {
        onOutsideClick(event);
      }
    }
  }

  document.addEventListener('mousedown', handleClick);

  return () => {
    document.removeEventListener('mousedown', handleClick);
  };
});
