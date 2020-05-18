const express = require('express');
const productsRepo = require('../Repositories/products')
const productsIndexTemplate = require('../views/Products/index');
const router = express.Router();

router.get('/', async (req, res) => {
    const products = await productsRepo.getAll();
       res.send(productsIndexTemplate({products}));

})

module.exports = router;