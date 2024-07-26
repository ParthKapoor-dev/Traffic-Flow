const { fetchData, saveDate } = require('../controllers/fetch');

const router = require('express').Router();

router.get('/fetch', fetchData);

router.post('/upload-date', saveDate);

module.exports = router;