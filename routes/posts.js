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

router.get("/", getPost);
router.get(
  "/:id",
  [check("id", "Invalid ID").isMongoId(), inputValidation],
  getPosts
);

router.post("/", [inputValidation], postPosts);
router.delete("/:id", [inputValidation], deletePosts);

module.exports = router;
