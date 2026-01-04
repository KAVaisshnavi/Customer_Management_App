const express = require('express');
const router = express.Router();
const { Customer, Address } = require('../models');
const { Op } = require('sequelize');

// Create Customer with Initial Address
router.post('/', async (req, res) => {
    const t = await Customer.sequelize.transaction();
    try {
        const { firstName, lastName, phone, addressLine, city, state, pinCode } = req.body;

        // Basic validation
        if (!firstName || !lastName || !phone || !addressLine || !city || !state || !pinCode) {
            throw new Error('All fields are required');
        }

        const customer = await Customer.create({
            firstName,
            lastName,
            phone
        }, { transaction: t });

        await Address.create({
            customerId: customer.id,
            addressLine,
            city,
            state,
            pinCode
        }, { transaction: t });

        await t.commit();

        // Fetch the complete customer object with address to return
        const createdCustomer = await Customer.findByPk(customer.id, {
            include: [Address]
        });

        res.status(201).json(createdCustomer);
    } catch (error) {
        await t.rollback();
        res.status(400).json({ error: error.message });
    }
});

// List Customers with Search
router.get('/', async (req, res) => {
    const { city, state, pinCode, page = 1, limit = 9 } = req.query;
    const offset = (page - 1) * limit;

    try {
        const includeOptions = {
            model: Address,
            where: {},
            required: false // Default to LEFT OUTER JOIN
        };

        if (city || state || pinCode) {
            includeOptions.required = true; // Use INNER JOIN to only return matching customers
            if (city) includeOptions.where.city = { [Op.like]: `%${city}%` };
            if (state) includeOptions.where.state = { [Op.like]: `%${state}%` };
            if (pinCode) includeOptions.where.pinCode = { [Op.like]: `%${pinCode}%` };
        }

        const { count, rows } = await Customer.findAndCountAll({
            include: [includeOptions],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset),
            distinct: true
        });

        res.json({
            customers: rows,
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id, {
            include: [Address]
        });
        if (!customer) return res.status(404).json({ error: 'Customer not found' });
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Customer (Basic Info)
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        await customer.update(req.body);
        res.json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Customer
router.delete('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        await customer.destroy(); // Cascade delete handled by DB/ORM definition
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
