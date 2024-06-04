const mongoose = require('../db'); // Correctly importing mongoose

// Plant Schema
const plantSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    variety: {
        type: String,
        required: true
    },
    plantingDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

// Plant Model
const Plant = mongoose.model('Plant', plantSchema); // Creating Plant model

exports.Plant = Plant; // Export the Plant model

// Function to create a plant
exports.createPlant = async (plantData) => {
    const plant = new Plant(plantData);
    return await plant.save();
};

// Function to get all plants
exports.getAllPlants = async () => {
    return await Plant.find();
};

// Function to update a plant
exports.updatePlant = async (id, plantData) => {
    return await Plant.findByIdAndUpdate(id, plantData, { new: true });
};

// Function to delete a plant
exports.deletePlant = async (id) => {
    return await Plant.findByIdAndDelete(id);
};