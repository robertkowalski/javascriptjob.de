module.exports = getStringFromMap;

function getStringFromMap(json) {
  return function getTextFromJson(key) {
    return json[key] || key;
  };
}