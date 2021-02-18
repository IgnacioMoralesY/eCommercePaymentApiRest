const { Router } = require('express');
const { add } = require('../controllers/upload');

const router = Router();

router.post('/', add);

module.exports = router;