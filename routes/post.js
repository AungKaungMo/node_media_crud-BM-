const router = require("express").Router();
const controller = require("../controllers/post");
const { validateToken, validateBody } = require('../utils/validator')
const { Schema } = require('../utils/schema');
const { saveFile } = require('../utils/gallery')

router.get("/", controller.all);
router.post("/", validateToken, saveFile, validateBody(Schema.PostSchema), controller.add);
router
  .route("/:id")
  .get(controller.get)
  .patch(validateToken, controller.patch)
  .delete(validateToken, controller.drop);


router.get("/byCat/:id", controller.postByCat);
router.get("/byUser/:id", controller.postByUser);
router.get("/paginate/:page", controller.paginate);

module.exports = router;
