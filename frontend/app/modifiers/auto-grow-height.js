import { modifier } from 'ember-modifier';

export default modifier(function autoGrow(element, [isHeaderType]) {
  const handler = function () {
    if (isHeaderType) {
      return;
    }

    element.style.height = 'auto';
    element.style.height = element.scrollHeight + 'px';
    element.style.overflow = 'hidden';
  };

  element.addEventListener('input', handler);
  element.addEventListener('focus', handler);

  handler();

  return () => {
    element.removeEventListener('input', handler);
    element.removeEventListener('focus', handler);
  };
});
