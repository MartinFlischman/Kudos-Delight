import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://kudos-delight-f5561-default-rtdb.firebaseio.com/"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Reference to the "compliments" node in the database
const complimentsRef = ref(database, "compliments");

// Select page elements
const generateButton = document.getElementById('generateButton');
const complimentDisplay = document.getElementById('compliment-display');
const complimentForm = document.getElementById('complimentForm');
const complimentInput = document.getElementById('complimentInput');
const toggleFormButton = document.getElementById('toggleFormButton'); // Assuming you have this element in your HTML

// Function to show/hide the submission form
toggleFormButton.addEventListener('click', () => {
    complimentForm.classList.toggle('hidden');
    complimentForm.classList.contains('hidden') ? toggleFormButton.textContent = 'Add Kudos' : toggleFormButton.textContent = 'Hide Form';
});

// Function to handle form submission
complimentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const newCompliment = complimentInput.value.trim(); // Get the value from the input field and trim any leading/trailing whitespace

    if (newCompliment !== '') {
        // Check if the input is not empty
        push(complimentsRef, newCompliment) // Push the new compliment to the Firebase database
            .then(() => {
                complimentInput.value = ''; // Clear the input field
                complimentForm.classList.add('hidden'); // Hide the form after submission
                toggleFormButton.textContent = 'Add Kudos'; // Update the button text
            })
            .catch((error) => {
                console.error('Error adding compliment:', error);
            });
    }
});

// Add event listener to the "Generate" button
generateButton.addEventListener('click', () => {
    // Retrieve compliments from the Firebase database
    get(complimentsRef).then((snapshot) => {
        // Get an array of compliments from the snapshot
        const compliments = [];
        snapshot.forEach((childSnapshot) => {
            const compliment = childSnapshot.val();
            compliments.push(compliment);
        });

        // Select a random compliment from the array
        const randomIndex = Math.floor(Math.random() * compliments.length);
        const randomCompliment = compliments[randomIndex];

        // Display the randomly selected compliment to the user
        complimentDisplay.textContent = randomCompliment;
    }).catch((error) => {
        console.error('Error getting compliments:', error);
    });
});
