const { Router } = require('express');
const { getAll, get, add, remove } = require('../controllers/user');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { emailExist } = require('../helpers/database-validator');

const router = Router();

router.get('/', getAll);

router.get('/:id', get);

router.post('/', [
    check('email', 'El email no es valido!' ).isEmail(),
    check('email').custom(emailExist),
    validatorPost
] , add);

router.delete('/:id', remove);


module.exports = router;