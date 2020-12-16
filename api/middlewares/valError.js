const { check, validationResult } = require("express-validator");

function valError(req, res, next){
  const error = validationResult(req).formatWith(({ msg }) => msg);

  if (!error.isEmpty()) return res.status(422).json({ error: error.array() });

  next();
}


module.exports = valError;