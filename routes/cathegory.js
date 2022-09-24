const { Router } = require("express");
const { check } = require("express-validator");
const {
  getCathegory,
  getCathegories,
  postCathegory,
  updateCathegory,
  deleteCathegory,
} = require("../controllers/cathegory");
const { inputValidation } = require("../middlewares/validateinput");
const router = new Router();
router.get("/", getCathegories);
router.get(
  "/:id",
  [check("id", "Invalid ID").isMongoId(), inputValidation],
  getCathegory
);

router.post(
  "/",
  [check("name", "Name is required").not().isEmpty(), inputValidation],
  postCathegory
);
router.delete(
  "/:id",
  [check("id", "Invalid ID").isMongoId(), inputValidation],
  deleteCathegory
);
router.put(
  "/:id",
  [check("id", "Invalid ID").isMongoId(), inputValidation],
  updateCathegory
);
module.exports = router;
