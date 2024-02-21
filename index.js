import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://kudos-delight-f5561-default-rtdb.firebaseio.com/"
}

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