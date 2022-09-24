const { Router } = require("express");
const { check } = require("express-validator");
const {
  getPost,
  getPosts,
  postPosts,
  updatePosts,
  deletePosts,
} = require("../controllers/posts");
const { inputValidation } = require("../middlewares/validateinput");
const router = new Router();

router.get("/", getPosts);
router.get(
  "/:id",
  [check("id", "Invalid ID").isMongoId(), inputValidation],
  getPost
);

router.post(
  "/",
  [
    check("user", "user is required").not().isEmpty(),
    check("user", "Invalid ID").isMongoId(),
    inputValidation,
  ],
  postPosts
);
router.delete("/:id", [inputValidation], deletePosts);

module.exports = router;
