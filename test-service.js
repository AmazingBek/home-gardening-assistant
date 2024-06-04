// test-service.js

const plantService = require('./services/plants');

async function testServiceLayer() {
    try {
        // Create plant
        const newPlant = await plantService.createPlant({ type: 'Herb', variety: 'Basil', plantingDate: new Date(), location: 'Kitchen Window' });
        console.log('Plant Created: ', newPlant);

        // Get all plants
        const plants = await plantService.getAllPlants();
        console.log('All Plants: ', plants);

        // Get plant by ID
        const plant = await plantService.getPlantById(newPlant._id);
        console.log('Plant by ID: ', plant);

        // Update plant
        const updatedPlant = await plantService.updatePlant(newPlant._id, { location: 'Garden' });
        console.log('Plant Updated: ', updatedPlant);

        // Delete plant
        await plantService.deletePlant(newPlant._id);
        console.log('Plant Deleted');
    } catch (error) {
        console.error('Error in testing service layer: ', error.message);
    }
}

testServiceLayer();