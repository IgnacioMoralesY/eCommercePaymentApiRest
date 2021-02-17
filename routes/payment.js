const { Router } = require('express');
const { getAll, getAllForUser, getAllForUserAndShop, addCreditsToUser, removeCreditsToUser } = require('../controllers/payment');

const router = Router();

router.get('/', getAll);

router.get('/:email', getAllForUser);

router.get('/:email/:shop', getAllForUserAndShop);

router.post('/add-credits', addCreditsToUser);

router.post('/remove-credits', removeCreditsToUser);


module.exports = router;