const { check } = require("express-validator");

  const validationPost = [
    check("category")
      .exists()
      .withMessage("category is required"),
      // .bail(),

    check("title")
      // .exists()
      .isLength({ min: 3 })
      .withMessage("title is required"),

    check("body")
    .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),
      // .exists()
      // .withMessage("body is required"),
  ]


module.exports = validationPost;