const router = require('express').Router();
const controller = require('../controllers/tag');
const { saveFile } = require('../utils/gallery');
const { Schema } = require('../utils/schema');
const { validateBody, validateToken, validateparams } = require('../utils/validator');

router.get('/', controller.all);
router.post('/', validateToken, saveFile, validateBody(Schema.TagSchema), controller.add);

router.route('/:id').get(validateparams(Schema.AllSchema.id, "id"), controller.get)
                    .patch(validateToken, validateparams(Schema.AllSchema.id, "id"), controller.patch)
                    .delete(validateToken, validateparams(Schema.AllSchema.id, "id"), controller.drop)
module.exports = router;