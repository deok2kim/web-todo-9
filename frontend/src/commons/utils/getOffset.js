function getOffset($element) {
  const rect = $element.getBoundingClientRect();
  return {
    left: rect.left + $element.clientX,
    top: rect.top + $element.clientY,
  };
}

export default getOffset;
