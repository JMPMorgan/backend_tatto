const { Router } = require("express");
const { check } = require("express-validator");
const {
  getLocal,
  getLocals,
  postLocal,
  updateLocal,
  deleteLocal,
  getPostPerLocal,
  getLocalPerUser,
} = require("../controllers/local");
const { inputValidation } = require("../middlewares/validateinput");
const { validateFileToUpload } = require("../middlewares/validatefile");

const router = new Router();

router.get("/", getLocals);
router.get("/:id", getLocal);
router.get("/user/:id", getLocalPerUser);
router.post(
  "/",
  [
    check("user", "User is a invalidad ID").isMongoId(),
    validateFileToUpload,
    inputValidation,
  ],
  postLocal
);
router.put("/:id", [], updateLocal);
router.delete("/:id", [], deleteLocal);
router.get("/post/:id", getPostPerLocal);

module.exports = router;
