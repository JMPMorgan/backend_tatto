const { Router } = require("express");
const { check } = require("express-validator");
const { getConversation, postMessage } = require("../controllers/message");
const { inputValidation } = require("../middlewares/validateinput");

const router = new Router();

router.get("/:id", [inputValidation], getConversation);
router.post("/:id", [inputValidation], postMessage);

module.exports = router;
