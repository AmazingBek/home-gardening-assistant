// controllers/plants.js
const Plant = require('../services/plants');

exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find();
        res.render('index', { plants });
    } catch (error) {
        res.status(500).send('Error fetching plants: ' + error.message);
    }
};

exports.createPlant = async (req, res) => {
    try {
        const plantData = req.body;
        const plant = new Plant(plantData);
        await plant.save();
        res.redirect('/plants');
    } catch (error) {
        res.status(500).send('Error creating plant: ' + error.message);
    }
};

exports.getPlantById = async (req, res) => {
    try {
        const plant = await Plant.findById(req.params.id);
        if (!plant) throw new Error('Plant not found');
        res.render('edit', { plant });
    } catch (error) {
        res.status(500).send('Error getting plant by ID: ' + error.message);
    }
};

exports.updatePlant = async (req, res) => {
    try {
        await Plant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect('/plants');
    } catch (error) {
        res.status(500).send('Error updating plant: ' + error.message);
    }
};

exports.deletePlant = async (req, res) => {
    try {
        await Plant.findByIdAndDelete(req.params.id);
        res.redirect('/plants');
    } catch (error) {
        res.status(500).send('Error deleting plant: ' + error.message);
    }
};