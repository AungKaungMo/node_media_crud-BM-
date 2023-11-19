const router = require('express').Router();
const controller = require('../controllers/cat');
const { saveFile } = require('../utils/gallery');
const { validateBody, validateparams, validateToken } = require('../utils/validator');
const { Schema } = require('../utils/schema');

router.get('/', validateToken, controller.all);
router.post('/', [saveFile, validateBody(Schema.AddCat), controller.add]);
// router.get('/:id', [validateparams(Schema.AllSchema.id, "id"), controller.get]); //cuz the schema catch with dynamic params

//Another way
router.route('/:id').get(validateparams(Schema.AllSchema.id, "id"), controller.get)
                    .patch([validateToken, saveFile, validateBody(Schema.AllSchema.image), controller.patch])
                    .delete(validateToken, validateparams(Schema.AllSchema.id, "id"), controller.drop);

module.exports = router;