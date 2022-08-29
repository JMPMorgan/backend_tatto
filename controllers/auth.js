const bcryptjs = require("bcryptjs");

const login = (req, res) => {
  try {
    const { password, email } = req.body;
    return res.status(200).json({
      msg: "Login",
      password,
      email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: `Server Error`,
    });
  }
};

module.exports = {
  login,
};
