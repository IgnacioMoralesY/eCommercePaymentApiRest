const { Router } = require('express');
const { getAll, get, add, remove } = require('../controllers/shop');

const router = Router();

router.get('/', getAll);

router.get('/:id', get);

router.post('/add', add);

router.delete('/delete/:id', remove);


module.exports = router;