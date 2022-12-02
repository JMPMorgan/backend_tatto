const bcryptjs = require("bcryptjs");

const Local = require("../models/local");
const Posts = require("../models/posts");
const { uploadFile, uploadFileInBase64 } = require("../helpers/uploadfile");

const getLocals = async (req, res) => {
  const query = { status: true };
  const locals = await Local.find(query);
  res.json({
    locals,
  });
};

const getLocal = async (req, res) => {
  const { id } = req.params;
  const local = await Local.findById(id);
  res.json({
    local,
  });
};

const postLocal = async (req, res) => {
  try {
    const { name, schedule, weekdays, user, location, img } = req.body;
    //TODO:Pasarlo a un middleware
    console.log("Hola");
    const exitsLocal = await Local.findOne({
      $and: [{ location }, { name }],
    });
    if (exitsLocal) {
      console.log("Adios");
      return res.status(400).json({
        msg: `Local ${name} already exits`,
      });
    }
    const exitsUser = await Local.findOne({ user: user });
    if (exitsUser) {
      console.log("Hola");
      return res.status(400).json({
        msg: `This user has registered a local`,
      });
    }
    const file = req.files !== undefined ? req.files.file : img;
    const imgSave =
      req.files !== undefined
        ? await uploadFile(file)
        : await uploadFileInBase64(file);
    console.log("Todo chilo");
    const local = new Local({
      name,
      schedule,
      weekdays,
      user,
      location,
      img: imgSave,
    });
    console.log(local);
    await local.save();
    return res.json({
      msg: "Local Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const updateLocal = async (req, res) => {
  const { id } = req.params;
  const { name, location, ...data } = req.body;
  //
  const local = await Local.findByIdAndUpdate(id, data, { new: true });

  res.json({
    olddatalocal: local,
    msg: "Update Local",
  });
};

const deleteLocal = async (req, res) => {
  const { id } = req.params;
  const localDelete = await Local.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    olddata: localDelete,
    msg: "Local Deleted",
  });
};

const getPostPerLocal = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Posts.find({
      local: id,
    });
    console.log(posts);
    return res.json({
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const getLocalPerUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    console.log("HOLAAAAAAAAAAAAAA");
    const newId = "6382caf690f4e58d3bd15601";
    const local = await Local.findOne({ user: newId });
    console.log(local);
    return res.json({ local });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  getLocal,
  getLocals,
  postLocal,
  updateLocal,
  deleteLocal,
  getPostPerLocal,
  getLocalPerUser,
};
