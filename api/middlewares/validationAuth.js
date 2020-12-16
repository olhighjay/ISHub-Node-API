const { check, validationResult } = require("express-validator");

  const validationWare = [
    check("fullName")
      .isLength({ min: 3 })
      .withMessage("the name must have minimum length of 3")
      .trim(),

    check("email")
      .isEmail()
      .withMessage("invalid email address")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 8, max: 15 })
      .withMessage("your password should have min and max length between 8-15")
      .matches(/\d/)
      .withMessage("your password should have at least one number")
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage("your password should have at least one sepcial character"),

    // check("confirmPassword").custom((value, { req }) => {
    //   if (value !== req.body.password) {
    //     throw new Error("confirm password does not match");
    //   }
    //   return true;
    // }),
  ]


module.exports = validationWare;