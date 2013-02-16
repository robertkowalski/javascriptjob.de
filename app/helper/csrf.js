module.exports = function(req, res, next) {
  console.log(req.session._csrf);
  console.log('-----------');
  res.locals.token = req.session._csrf;
  next();
};