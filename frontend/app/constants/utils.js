export const getRootUrl = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return protocol + '//' + host;
};

export function isOutOfBounds(
  offset,
  parentElement,
  childWidth = 200,
  childHeight = 200,
) {
  const parentRect = parentElement.getBoundingClientRect();

  // Check if element's left + child's width > parent's width
  const goesOutRight = offset.left + childWidth > parentRect.width;

  // Check if element's top + child's height > parent's height
  const goesOutBottom = offset.top + childHeight > parentRect.height;

  // Check if element is positioned with negative offset (going out on top or left)
  const goesOutLeft = offset.left < 0;
  const goesOutTop = offset.top < 0;

  return {
    goesOutRight,
    goesOutBottom,
    goesOutLeft,
    goesOutTop,
    isOutOfBounds: goesOutRight || goesOutBottom || goesOutLeft || goesOutTop,
  };
}
