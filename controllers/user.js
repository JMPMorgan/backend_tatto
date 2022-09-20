const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    msg: "Get User",
    user,
  });
};

const getUsers = async (req, res) => {
  const query = { status: true };
  const users = await User.find(query);
  res.json({
    msg: "Get Users",
    users,
  });
};
const postUser = async (req, res) => {
  const { name, email, password, lastname, username, birthday } = req.body;
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

  const user = new User({
    name,
    email,
    password,
    username,
    birthday,
    lastname,
  });
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  await user.save();

  res.json({
    msg: "Post User",
    user,
  });
};
const updateUser = async (req, res) => {
  res.json({
    msg: "Update User",
  });
};
const deleteUser = async (req, res) => {
  res.json({
    msg: "Delete User",
  });
};

module.exports = {
  getUser,
  getUsers,
  updateUser,
  postUser,
  deleteUser,
};
