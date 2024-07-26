const { fetchData, fetchDateRecord } = require('../controllers/fetch');

const router = require('express').Router();

router.get('/fetch', fetchData);

router.get('/fetch-date-record', fetchDateRecord);

module.exports = router;