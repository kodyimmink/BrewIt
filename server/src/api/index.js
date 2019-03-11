const express = require('express');

const breweries = require('./brewery');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏' 
  });
});

router.use('/breweries', breweries);

module.exports = router;
