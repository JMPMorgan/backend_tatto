const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.USER_PATH = "/api/user";
    this.AUTH_PATH = "/api/auth";
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    //this.app.use()
    this.app.use(this.USER_PATH, require("../routes/user"));
    this.app.use(this.AUTH_PATH, require("../routes/auth"));
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server Running in PORT: ${this.port}`);
    });
  }
}

module.exports = Server;
