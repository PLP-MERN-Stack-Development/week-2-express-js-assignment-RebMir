const express = require('express');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');
const { NotFoundError } = require('../utils/errors');

const router = express.Router();

let products = [];

// Get all products (with optional filters/pagination/search/stats below)
router.get('/', (req, res) => {
    const { category, search, page = 1, limit = 10 } = req.query;
    let results = [...products];

    if (category) {
    results = results.filter(p => p.category === category);
    }

    if (search) {
    results = results.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    const start = (page - 1) * limit;
    const end = start + parseInt(limit);
    const paginated = results.slice(start, end);

    res.json({ data: paginated, total: results.length });
});

// Product stats
router.get('/stats', (req, res) => {
    const stats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
    }, {});
    res.json(stats);
});

// Get product by ID
router.get('/:id', (req, res, next) => {
    const product = products.find(p => p.id === req.params.id);
    if (!product) return next(new NotFoundError('Product not found'));
    res.json(product);
});

// Create product
router.post('/', auth, validateProduct, (req, res) => {
    const newProduct = { id: uuidv4(), ...req.body };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update product
router.put('/:id', auth, validateProduct, (req, res, next) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return next(new NotFoundError('Product not found'));

    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
});

// Delete product
router.delete('/:id', auth, (req, res, next) => {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) return next(new NotFoundError('Product not found'));

    products.splice(index, 1);
    res.status(204).end();
});

module.exports = router;