const { check } = require("express-validator");
const UsersRepo = require("../../Repositories/users");

module.exports = {
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must be a valid Email")
    .custom(async (email) => {
      const existingUser = await UsersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error("Email already in use");
      } else {
        return true; // issue : //https://github.com/express-validator/express-validator/issues/619#issuecomment-408587850
      }
    }),

  requirePass: check("pass")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters"),

  requirePassconf: check("passconf")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passconf, { req }) => {
      if (passconf !== req.body.pass) {
        throw new Error("password and confirm password do not match");
      } else {
        return true;
      }
    }),

  requireValidEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await UsersRepo.getOneBy({ email });
      if (!user) {
        throw new Error("email not found");
      } else {
        return true;
      }
    }),

  requireValidPass: check("pass")
    .trim()
    .custom(async (pass, { req }) => {
      const user = await UsersRepo.getOneBy({ email: req.body.email });

      if (!user) {
        throw new Error("Invalid Password");
      }

      const validPassword = await UsersRepo.comparePasswords(user.pass, pass);

      if (!validPassword) {
        throw new Error("Invalid password");
      }
     else {
       return true;
     }
    }),
};
