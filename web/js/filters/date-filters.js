export function fromNowFilter() {
  return function(date) {
    if (!date)
      return '';
    var d = new Date();
    var c = Date.parse(date);
    var a = (d - c) /(1000*60*60*24*365);
    return Math.round(a);
  };
}

export function fromNowMomentFilter() {
  return function(date, removeSuffix) {
    if (!date)
      return '';
    return moment(date).fromNow(removeSuffix);
  };
}
