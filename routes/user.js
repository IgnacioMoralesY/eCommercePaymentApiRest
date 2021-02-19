const { Router } = require('express');
const { getAll, get, add, remove } = require('../controllers/user');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { emailNotExist, emailExist } = require('../helpers/database-validator');

const router = Router();

router.get('/', getAll);

router.get('/:email', [
    check('email').custom(emailExist),
    validatorPost
], get);

router.post('/', [
    check('email', 'El email no es valido!' ).isEmail(),
    check('email').custom(emailNotExist),
    validatorPost
] , add);

router.delete('/:email', [
    check('email').custom(emailExist),
    validatorPost
] ,remove);


module.exports = router;