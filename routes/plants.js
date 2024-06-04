const express = require('express');
const router = express.Router();
const plantsService = require('../services/plants');

// Route to get all plants
router.get('/', async (req, res) => {
    try {
        const plants = await plantsService.getAllPlants();
        res.json(plants);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to create a new plant
router.post('/', async (req, res) => {
    try {
        const plant = await plantsService.createPlant(req.body);
        res.status(201).json(plant);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to update a plant
router.put('/:id', async (req, res) => {
    try {
        const plant = await plantsService.updatePlant(req.params.id, req.body);
        res.json(plant);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to delete a plant
router.delete('/:id', async (req, res) => {
    try {
        await plantsService.deletePlant(req.params.id);
        res.status(204).send(); // 204 No Content
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;