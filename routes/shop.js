const { Router } = require('express');
const { getAll, get, add, remove } = require('../controllers/shop');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { nameNotExist, nameExist } = require('../helpers/database-validator');
const router = Router();

router.get('/', getAll);

router.get('/:name',  [
    check('name').custom(nameExist),
    validatorPost
] , get);

router.post('/', [
    check('name', 'name es obligatorio').not().isEmpty(),
    check('name').custom(nameNotExist),
    validatorPost
] ,add);

router.delete('/:name', [
    check('name').custom(nameExist),
    validatorPost
] , remove);


module.exports = router;