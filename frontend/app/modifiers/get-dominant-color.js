// app/modifiers/dominant-color.js
import { modifier } from 'ember-modifier';
import ColorThief from 'color-thief-browser';

export default modifier(function dominantColor(element, [callback]) {
  if (!(element instanceof HTMLImageElement)) {
    console.warn('dominant-color modifier must be used on an <img> element');
    return;
  }

  element.crossOrigin = 'Anonymous';

  const extractColor = () => {
    try {
      const colorThief = new ColorThief();
      const rgb = colorThief.getColor(element);
      if (callback && typeof callback === 'function') {
        callback(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.7)`);
      }
    } catch (err) {
      console.error('Failed to extract color:', err);
    }
  };

  if (element.complete && element.naturalWidth !== 0) {
    extractColor();
  } else {
    element.addEventListener('load', extractColor, { once: true });
  }

  return () => {
    element.removeEventListener('load', extractColor);
  };
});
