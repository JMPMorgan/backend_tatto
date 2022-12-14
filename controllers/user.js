const bcryptjs = require("bcryptjs");
const {
  uploadFile,
  deleteFile,
  uploadFileInBase64,
} = require("../helpers/uploadfile");
const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const query = { status: true };
    const users = await User.find(query);
    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
const postUser = async (req, res) => {
  try {
    const { name, email, password, lastname, username, birthday, img } =
      req.body;
    const exitsEmail = await User.findOne({ email });
    console.log(exitsEmail);
    if (exitsEmail) {
      return res.status(400).json({
        msg: `Email: ${email} already exits`,
      });
    }
    const exitsUsername = await User.findOne({ username });
    if (exitsUsername) {
      return res.status(400).json({
        msg: `Username: ${username} already exits`,
      });
    }
    const file = req.files !== undefined ? req.files.file : img;
    const imgUser =
      req.files !== undefined
        ? await uploadFile(file)
        : await uploadFileInBase64(file);

    const user = new User({
      name,
      email,
      password,
      username,
      birthday,
      lastname,
      img: imgUser,
    });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    await user.save();

    res.json({
      msg: "Post User",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const { name, img } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    if (user.img) {
      const isDeleted = await deleteFile(user.img);
      if (!isDeleted) {
        console.log(isDeleted);
        return res.status(500).json({
          msg: "Server Error",
        });
      }
    }
    const file = req.files !== undefined ? req.files.file : img;
    user.img =
      req.files !== undefined
        ? await uploadFile(file)
        : await uploadFileInBase64(file);
    user.name = name;
    console.log(user);
    await user.save();
    return res.json({
      msg: "Update User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    console.log("Hola");
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { status: false });
    console.log("Aqui");
    res.json({
      msg: "Delete User",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  postUser,
  deleteUser,
};
