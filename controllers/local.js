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
  try {
    const { name, schedule, weekdays, user, location } = req.body;
    const query = { name: name, location: location };
    console.log(query);
    //TODO:Pasarlo a un middleware

    const exitsLocal = await Local.find({
      location: location,
      name: name,
    });
    if (exitsLocal) {
      return res.status(400).json({
        msg: `Local ${name} already exits`,
      });
    }
    const exitsUser = await Local.findById(user).populate("user");
    if (exitsUser) {
      return res.status(400).json({
        msg: `This user has registered a local`,
      });
    }
    // TODO: Need Cloudinary Implementation
    const img = "img";
    console.log("Todo chilo");
    const local = new Local({ name, schedule, weekdays, user, location, img });
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

module.exports = {
  getLocal,
  getLocals,
  postLocal,
  updateLocal,
  deleteLocal,
};
