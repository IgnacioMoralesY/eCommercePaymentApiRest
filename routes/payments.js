const { Router } = require('express');
const { getAll, getUser, getUserShop, addCreditsToUser, removeCreditsToUser } = require('../controllers/payments');

const router = Router();

router.get('/', getAll);

router.get('/:id', getUser);

router.get('/:id/:shop', getUserShop);

router.post('/add-credits', addCreditsToUser);

router.post('/remove-credits', removeCreditsToUser);



module.exports = router;