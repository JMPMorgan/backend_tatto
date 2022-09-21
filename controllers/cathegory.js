const Cathegory = require("../models/cathegory");

const getCathegory = async (req, res) => {
  const { id } = req.params;
  const cathegory = await Cathegory.findById(id);
  res.json({
    cathegory,
  });
};
const getCathegories = async (req, res) => {
  const query = { status: true };
  const cathegories = await Cathegory.find(query);
  res.json({
    cathegories,
  });
};
const postCathegory = async (req, res) => {
  const { name } = req.body;
  const exitsCathegory = await Cathegory.find({ name });
  if (exitsCathegory) {
    return res.status(400).json({
      msg: `Cathegory ${name} already exits`,
    });
  }

  const cathegory = new Cathegory(name);
  await cathegory.save();
  res.json({
    cathegory,
  });
};
const deleteCathegory = async (req, res) => {
  const { id } = req.params;
  const exitsCathegory = await Cathegory.findById(id);
  if (!exitsCathegory) {
    return res.status(404).json({
      msg: `Cathegory not exits`,
    });
  }
  const cathegoryDelete = await Cathegory.findByIdAndUpdate(
    id,
    { status: false },
    { new: true }
  );
  res.json({
    msg: `Cathegory Delete`,
    cathegoryDelete,
  });
};
const updateCathegory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const cathegory = await Cathegory.findById(id);
  //TODO: Only with status true
  if (!cathegory || !cathegory.status) {
    return res.status(404).json({
      msg: `Cathegory not exits`,
    });
  }

  const exitsCathegory = await Cathegory.find({ name });
  if (exitsCathegory) {
    return res.status(400).json({
      msg: `Cathegory ${name} already exits`,
    });
  }

  cathegory.name = name;
  await cathegory.save();

  res.json({
    msg: `Updated Cathegory`,
    cathegory,
  });
};

module.exports = {
  getCathegories,
  getCathegory,
  postCathegory,
  deleteCathegory,
  updateCathegory,
};
