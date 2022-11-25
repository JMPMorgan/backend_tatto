const { Router } = require("express");
const { getConversations } = require("../controllers/conversation");
const { inputValidation } = require("../middlewares/validateinput");

const router = new Router();

router.get("/:id", [inputValidation], getConversations);

module.exports = router;
