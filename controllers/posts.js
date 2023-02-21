const { uploadFile, uploadFileInBase64 } = require("../helpers/uploadfile");
const Posts = require("../models/posts");

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id);
    return res.json({
      success: true,
      msg: "Get User",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const query = { status: true };
    const posts = await Posts.find(query);
    return res.json({
      success: true,
      msg: "Posts Obtenidos Correctamente",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const postPosts = async (req, res) => {
  try {
    const { user, description, local, img } = req.body;
    const file = req.files !== undefined ? req.files.file : img;
    const imgPost =
      req.files !== undefined
        ? await uploadFile(file)
        : await uploadFileInBase64(file);
    //const img = await uploadFile(req.files);
    const post = new Posts({ user, description, local, img: imgPost });
    await post.save();
    return res.json({
      msg: "Post Posts",
      post,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const updatePosts = async (req, res) => {
  const { id } = req.params;
};

const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const postsDelete = await Posts.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    return res.json({
      success: true,
      post: postsDelete,
      msg: "Posts Delete",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

module.exports = {
  getPost,
  getPosts,
  postPosts,
  updatePosts,
  deletePosts,
};
