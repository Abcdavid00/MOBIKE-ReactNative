export const InterpolateFromValueToPostion = (
  min,
  max,
  sliderWidth,
  step,
  value,
) => {
  return Math.round((sliderWidth * (value - min)) / (max - min) / step) * step;
};
