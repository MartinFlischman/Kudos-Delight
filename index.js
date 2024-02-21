import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://kudos-delight-f5561-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const complimentsRef = ref(database, "compliments");

// Select page elements
const generateButton = document.getElementById('generateButton');
const complimentDisplay = document.getElementById('compliment-display');
const complimentForm = document.getElementById('complimentForm');
const complimentInput = document.getElementById('complimentInput');

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
