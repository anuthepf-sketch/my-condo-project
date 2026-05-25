const express = require('express');
const router = express.Router();

// generateRandomRoom generates a random condo room number in the format Building-Floor-Room
// e.g., A-5-12
function generateRandomRoom() {
    // Define available buildings, floors, and rooms per floor
    const buildings = ["A", "B", "C", "D", "E"]; // Example buildings
    const minFloor = 1;
    const maxFloor = 8;
    const minRoom = 1;
    const maxRoom = 20;

    // Randomly select a building
    const randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];

    // Randomly select a floor
    const randomFloor = Math.floor(Math.random() * (maxFloor - minFloor + 1)) + minFloor;

    // Randomly select a room number and format it with a leading zero if needed
    const randomRoom = Math.floor(Math.random() * (maxRoom - minRoom + 1)) + minRoom;
    const formattedRoom = String(randomRoom).padStart(2, '0');

    return `${randomBuilding}-${randomFloor}-${formattedRoom}`;
}

// Middleware for parsing JSON requests (not strictly needed for GET, but good practice)
router.use(express.json());

// handleGenerateRoom is the HTTP handler for generating and returning a room
// It responds with a JSON object containing the generated room number.
router.get('/api/room/generate', (req, res) => {
    // Generate a new random room number
    const room = generateRandomRoom();

    // Prepare the response structure
    const response = {
        room_number: room,
        message: "นี่คือเลขห้องคอนโดสุดเก๋สำหรับมึง!",
        timestamp: new Date().toISOString(), // Use ISO string for consistent date format
    };

    // Set the HTTP status code to OK and send the JSON response
    res.status(200).json(response);
});

// Optionally, add a simple handler for the root path
router.get('/', (req, res) => {
    res.send("Welcome to the Booking System Router! Try hitting /api/room/generate to get a random condo room.");
});

module.exports = router;