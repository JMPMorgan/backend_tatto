const getUser = (req, res) => {
  res.json({
    msg: "Get User",
  });
};

const getUsers = (req, res) => {
  res.json({
    msg: "Get Users",
  });
};
const postUser = (req, res) => {
  res.json({
    msg: "Post User",
  });
};
const updateUser = (req, res) => {
  res.json({
    msg: "Update User",
  });
};
const deleteUser = (req, res) => {
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
