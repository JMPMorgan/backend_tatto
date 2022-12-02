const { uploadFile, uploadFileInBase64 } = require("../helpers/uploadfile");
const Posts = require("../models/posts");

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findById(id);
  res.json({
    msg: "Get User",
    post,
  });
};

const getPosts = async (req, res) => {
  const query = { status: true };
  const posts = await Posts.find(query);
  res.json({ posts });
};

const postPosts = async (req, res) => {
  const { user, description, local, img } = req.body;
  const file = req.files !== undefined ? req.files.file : img;
  const imgPost =
    req.files !== undefined
      ? await uploadFile(file)
      : await uploadFileInBase64(file);
  //const img = await uploadFile(req.files);
  const post = new Posts({ user, description, local, img: imgPost });
  await post.save();
  res.json({
    msg: "Post Posts",
    post,
  });
};

const updatePosts = async (req, res) => {
  const { id } = req.params;
};

const deletePosts = async (req, res) => {
  const { id } = req.params;
  const postsDelete = await Posts.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    olddata: postsDelete,
    msg: "Posts Delete",
  });
};

module.exports = {
  getPost,
  getPosts,
  postPosts,
  updatePosts,
  deletePosts,
};
