export const getRootUrl = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return protocol + '//' + host;
};

export function isOutOfBounds(offset) {
  const body = document.getElementById('ember-body');
  const bodyRect = body.getBoundingClientRect();
  const goesOutRight = offset.left + offset.width > bodyRect.width;
  const goesOutBottom = offset.top + offset.height > bodyRect.height;
  const goesOutLeft = offset.left < 0;
  const goesOutTop = offset.top < 0;

  const deviationRight = offset.left + offset.width - bodyRect.width;
  const deviationTop = offset.top + offset.height - bodyRect.height;

  return {
    goesOutRight,
    goesOutBottom,
    goesOutLeft,
    goesOutTop,
    isOutOfBounds: goesOutRight || goesOutBottom || goesOutLeft || goesOutTop,
    deviationRight,
    deviationTop,
  };
}
