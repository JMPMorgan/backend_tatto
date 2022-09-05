const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  getUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { inputValidation } = require("../middlewares/validateinput");

const router = new Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post(
  "/",
  [
    check("email", "Incorrect format in email").isEmail(),
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "lastname is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    check(
      "password",
      "Password is required and the characters must be more than 6"
    ).isLength({ min: 6 }),
    check("birthday", "birthday is required").isDate(),
    inputValidation,
  ],
  postUser
);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
