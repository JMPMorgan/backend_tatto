const { Router } = require("express");
const { check } = require("express-validator");
const {
  postRelationship,
  deleteRelationship,
} = require("../controllers/cathegory_local");
const { inputValidation } = require("../middlewares/validateinput");

const router = new Router();

router.post(
  "/",
  [
    check("id_cathegory").isMongoId(),
    check("id_local").isMongoId(),
    inputValidation,
  ],
  postRelationship
);

router.delete(
  "/:id",
  [check("id").isMongoId(), inputValidation],
  deleteRelationship
);

module.exports = router;
