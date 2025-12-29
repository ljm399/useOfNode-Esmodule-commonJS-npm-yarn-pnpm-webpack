const UTIL_name = 'util_name';
function formatCount() {
  return '200w'
}
function formatData() {
  return '2022-10-10'
}

exports.UTIL_name = UTIL_name;//是exports不是export
exports.formatCount = formatCount;
exports.formatData = formatData;

