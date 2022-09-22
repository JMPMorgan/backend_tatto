const { Router } = require("express");
const { check } = require("express-validator");
const {
  postRelationship,
  deleteRelationship,
} = require("../controllers/cathegory_local");
const { inputValidation } = require("../middlewares/validateinput");

const router = new Router();

router.post("/", [inputValidation], postRelationship);

router.delete("/:id", [inputValidation], deleteRelationship);

module.exports = router;
