const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUser,
  getUsers,
  postUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const router = new Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", postUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
