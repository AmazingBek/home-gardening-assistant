document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'http://localhost:3000/plants';

    // Create Plant
    const createPlantForm = document.getElementById('createPlantForm');
    createPlantForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const type = document.getElementById('type').value;
        const variety = document.getElementById('variety').value;
        const plantingDate = document.getElementById('plantingDate').value;
        const location = document.getElementById('location').value;

        fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, variety, plantingDate, location })
        })
            .then(response => response.json())
            .then(() => {
                alert('Plant created successfully!');
                fetchPlants(); // Refresh the plants list
                createPlantForm.reset(); // Reset form fields
            })
            .catch(error => console.error('Error creating plant:', error));
    });

    // Fetch and Display All Plants
    const fetchPlants = () => {
        fetch(BASE_URL)
            .then(response => response.json())
            .then(plants => {
                const plantsDiv = document.getElementById('plants');
                plantsDiv.innerHTML = ''; // Clear the div
                plants.forEach(plant => {
                    const plantElement = document.createElement('div');
                    plantElement.className = 'plant';
                    plantElement.innerHTML = `
                    <div>
                      <strong>Type:</strong> ${plant.type}<br>
                      <strong>Variety:</strong> ${plant.variety}<br>
                      <strong>Planting Date:</strong> ${new Date(plant.plantingDate).toLocaleDateString()}<br>
                      <strong>Location:</strong> ${plant.location}<br>
                      <button onclick="updatePlant('${plant._id}')">Update</button>
                      <button onclick="deletePlant('${plant._id}')">Delete</button>
                    </div>
                    <hr>
                `;
                    plantsDiv.appendChild(plantElement);
                });
            })
            .catch(error => console.error('Error fetching plants:', error));
    };

    fetchPlants(); // Initial fetch to display plants

    // Delete Plant
    window.deletePlant = (id) => {
        fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                alert('Plant deleted successfully!');
                fetchPlants(); // Refresh the plants list
            })
            .catch(error => console.error('Error deleting plant:', error));
    };

    // Update Plant
    window.updatePlant = (id) => {
        const type = prompt('Enter new type');
        const variety = prompt('Enter new variety');
        const plantingDate = prompt('Enter new planting date (yyyy-mm-dd)');
        const location = prompt('Enter new location');

        fetch(`${BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, variety, plantingDate, location })
        })
            .then(response => response.json())
            .then(() => {
                alert('Plant updated successfully!');
                fetchPlants(); // Refresh the plants list
            })
            .catch(error => console.error('Error updating plant:', error));
    };
});