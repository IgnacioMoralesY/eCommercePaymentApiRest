const { Router } = require('express');
const { getAll, getAllForUser, getAllForUserAndShop, addCreditsToUser, removeCreditsToUser } = require('../controllers/payment');
const { validatorPost } = require('../middlewares/validator');
const { check } = require('express-validator');
const { emailExist, nameExist } = require('../helpers/database-validator');

const router = Router();

router.get('/', getAll);

router.get('/:email', [
    check('email', 'emailUser no se encontro en el cuerpo de la peticion').isEmail(),
    check('email').custom( emailExist ),
    validatorPost
], getAllForUser);

router.get('/:email/:shop', [
    check('email', 'emailUser no se encontro en el cuerpo de la peticion').isEmail(),
    check('email').custom( emailExist ),
    check('shop').custom( nameExist ),
    validatorPost
] , getAllForUserAndShop);

router.post('/add-credits', [
    check('emailUser', 'emailUser no se encontro en el cuerpo de la peticion').isEmail(),
    check('shop', 'shop no se encontro en el cuerpo de la peticion').not().isEmpty(),
    check('credit', 'credit debe ser un numero valido').isNumeric(),
    check('emailUser').custom( emailExist ),
    check('shop').custom( nameExist ),
    validatorPost
] , addCreditsToUser);

router.post('/remove-credits',  [
    check('emailUser', 'emailUser no se encontro en el cuerpo de la peticion').isEmail(),
    check('shop', 'shop no se encontro en el cuerpo de la peticion').not().isEmpty(),
    check('credit', 'credit debe ser un numero valido').isNumeric(),
    validatorPost
] ,removeCreditsToUser);


module.exports = router;