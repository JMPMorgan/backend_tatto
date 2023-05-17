const bcryptjs = require("bcryptjs");

const Local = require("../models/local");
const Posts = require("../models/posts");
const {
  uploadFile,
  uploadFileInBase64,
  deleteFile,
} = require("../helpers/uploadfile");

const getLocals = async (req, res) => {
  try {
    const query = { status: true };
    const locals = await Local.find(query);
    return res.json({
      success: true,
      msg: "Locales Obtenidos",
      locals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const getLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findById(id);
    return res.json({
      success: true,
      msg: "Local Obtenido",
      local,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const postLocal = async (req, res) => {
  try {
    const { name, schedule, weekdays, user, location, img } = req.body;
    //TODO:Pasarlo a un middleware
    const exitsLocal = await Local.findOne({
      $and: [{ location }, { name }],
    });
    if (exitsLocal) {
      return res.status(400).json({
        success: false,
        msg: `Local ${name} already exits`,
      });
    }
    const exitsUser = await Local.findOne({ user: user });
    if (exitsUser) {
      return res.status(400).json({
        success: false,
        msg: `This user has registered a local`,
      });
    }
    const file = req.files !== undefined ? req.files.file : img;
    const imgSave =
      req.files !== undefined
        ? await uploadFile(file)
        : await uploadFileInBase64(file);
    const local = new Local({
      name,
      schedule,
      weekdays,
      user,
      location,
      img: imgSave,
    });
    await local.save();
    return res.json({
      success: true,
      local,
      msg: "Local Created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const updateLocal = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ...data } = req.body;
    const local = await Local.findById(id);
    if (local.img !== data.img) {
      const isDeleted = await deleteFile(local.img);
      if (!isDeleted) {
        return res.status(500).json({
          success: false,
          msg: "Server Error",
        });
      }
      const imgToUpload = data.img;
      data.img = await uploadFileInBase64(imgToUpload);
      local.img = data.img;
    }
    local.schedule = data.schedule;
    local.weekdays = data.weekdays;
    local.location = data.location;
    await local.save();

    return res.json({
      success: true,
      local,
      msg: "Update Local",
    });

    // const local = await Local.findByIdAndUpdate(id, data, { new: true });

    // return res.json({
    //   success: true,
    //   local,
    //   msg: "Update Local",
    // });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const deleteLocal = async (req, res) => {
  const { id } = req.params;
  const local = await Local.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    local,
    success: true,
    msg: "Local Deleted",
  });
};

const getPostPerLocal = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Posts.find({
      local: id,
    });
    return res.json({
      success: true,
      msg: "Post Obtenidos Con Exito",
      posts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

const getLocalPerUser = async (req, res) => {
  try {
    const { id } = req.params;
    const local = await Local.findOne({ user: id });
    return res.json({
      success: true,
      local,
      msg: "Local Obtenido",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
      success: false,
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
