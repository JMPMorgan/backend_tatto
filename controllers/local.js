const bcryptjs = require("bcryptjs");
const Local = require("../models/local");
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
  const { name, schedule, weekdays, user, location } = req.body;
  const query = { name, location };
  const exitsLocal = await Local.findOne(query);
  if (exitsLocal) {
    return res.status(400).json({
      msg: `Local ${Local} already exits`,
    });
  }

  const exitsUser = await Local.findOne(user);
  if (exitsUser) {
    return res.status(400).json({
      msg: `This user has registered a local`,
    });
  }
  // TODO: Need Cloudinary Implementation
  const img = "img";
  const local = new Local({ name, schedule, weekdays, user, location, img });
  await local.save();
  res.json({
    msg: "Local Created",
  });
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
    olddata: local,
    msg: "Local Deleted",
  });
};

module.exports = {
  getLocal,
  getLocals,
  postLocal,
  updateLocal,
  deleteLocal,
};
