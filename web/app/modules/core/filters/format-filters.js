export function temperatureFilter() {
  return function(item) {
    return item.toPrecision(1) + ' °C';
  };
}
