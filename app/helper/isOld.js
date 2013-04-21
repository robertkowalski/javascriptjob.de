module.exports = isOld;

function isOld(date) {
  if (!date) {
    return true;
  }

  return date <= getDayThirtyDaysAgo();
}

function getDayThirtyDaysAgo() {
  var today = new Date(),
      thirtyDaysAgo = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 30);

  return thirtyDaysAgo;
}