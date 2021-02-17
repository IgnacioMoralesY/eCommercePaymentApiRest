const { Router } = require('express');
const { getAll, get, add, remove } = require('../controllers/shop');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { nameExist } = require('../helpers/database-validator');
const router = Router();

router.get('/', getAll);

router.get('/:id',  get);

router.post('/', [
    check('name', 'name es obligatorio').not().isEmpty(),
    check('name').custom(nameExist),
    validatorPost
] ,add);

router.delete('/:id', remove);


module.exports = router;