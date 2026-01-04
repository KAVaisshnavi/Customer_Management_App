const express = require('express');
const router = express.Router();
const { Address, Customer } = require('../models');

// Add Address
router.post('/', async (req, res) => {
    // Expects customerId in body
    try {
        const { customerId } = req.body;
        const customer = await Customer.findByPk(customerId);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        const address = await Address.create(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update Address
router.put('/:id', async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (!address) return res.status(404).json({ error: 'Address not found' });

        await address.update(req.body);
        res.json(address);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Address
router.delete('/:id', async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (!address) return res.status(404).json({ error: 'Address not found' });

        await address.destroy();
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
