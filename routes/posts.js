const { Router } = require("express");
const { check } = require("express-validator");
const {
  getPost,
  getPosts,
  postPosts,
  updatePosts,
  deletePosts,
} = require("../controllers/posts");
const { uploadFile } = require("../helpers/uploadfile");
const { validateFileToUpload } = require("../middlewares/validatefile");
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
    validateFileToUpload,
    inputValidation,
  ],
  postPosts
);
router.delete("/:id", [inputValidation], deletePosts);

router.post("/upload", async (req, res) => {
  //let sampleFile;
  //let uploadPath;

  const pathFile = await uploadFile(req.files);
  res.json({
    path: pathFile,
  });
});
module.exports = router;
