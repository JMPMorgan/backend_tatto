const CathegoryLocal = require("../models/cathegory_local");
const User = require("../models/user");

const postRelationship = async (req, res) => {
  const { id_cathegory, id_local } = req.body;
  const exitsCathegory = await CathegoryLocal.findOne({
    cathegory: id_cathegory,
    local: id_local,
  });
  console.log(exitsCathegory);
  if (exitsCathegory) {
    return res.status(400).json({
      msg: `Already exits a Relationship`,
    });
  }

  const cathegory = new CathegoryLocal({
    cathegory: id_cathegory,
    local: id_local,
  });
  await cathegory.save();
  res.json({
    msg: `Relationship Created`,
    cathegory,
  });
};

const updateRelationship = async (req, res) => {
  //const {id}
};

const deleteRelationship = async (req, res) => {
  const { id } = req.params;
  const cathegory = await CathegoryLocal.findById(id);
  if (!cathegory) {
    return res.status(404).json({
      msg: `The Relationship dont exits`,
    });
  }
  await cathegory.delete();
  res.json({
    msg: `Relationship is deleted`,
  });
};

module.exports = {
  postRelationship,
  deleteRelationship,
};
