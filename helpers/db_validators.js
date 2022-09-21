const User = require("../models/user");

const exitsUserPerID = async (id) => {
  const hasUser = await User.findById(id);
  if (!hasUser) {
    throw new Error(`ID not Exits ${id}`);
  }
};

module.exports = {
  exitsUserPerID,
};
