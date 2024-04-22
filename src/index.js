document.addEventListener("DOMContentLoaded", function() {
    const baseUrl = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const nameDisplay = document.getElementById("name");
    const imageDisplay = document.getElementById("image");
    const votesDisplay = document.getElementById("vote-count");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    const resetButton = document.getElementById("reset-btn");

    let characters = [];  // Store all characters locally
    let currentCharacter = null;

    // Fetch characters from the API and render them
    function fetchCharacters() {
        fetch(baseUrl)
            .then(response => response.json())
            .then(data => {
                characters = data;
                characters.forEach(character => {
                    renderCharacter(character);
                });
            });
    }

    // Create and display character names in the character bar
    function renderCharacter(character) {
        const span = document.createElement("span");
        span.textContent = character.name;
        span.addEventListener("click", () => {
            currentCharacter = character;
            displayCharacterDetails(currentCharacter);
        });
        characterBar.appendChild(span);
    }

    // Display character details when a character name is clicked
    function displayCharacterDetails(character) {
        nameDisplay.textContent = character.name;
        imageDisplay.src = character.image;
        imageDisplay.alt = character.name;
        votesDisplay.textContent = character.votes;
        votesInput.value = ''; // Clear input field
    }

    // Handle vote addition
    votesForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const additionalVotes = parseInt(votesInput.value, 10) || 0;
        currentCharacter.votes += additionalVotes; // Update votes in the local character object
        votesDisplay.textContent = currentCharacter.votes;
        votesInput.value = ''; // Clear input field after submitting
    });

    // Handle vote reset for all animals
    resetButton.addEventListener("click", function() {
        characters = characters.map(character => {
            character.votes = 0;
            return character;
        });
        if (currentCharacter) {
            votesDisplay.textContent = 0; // Update display if any character is currently displayed
        }
    });

    // Initial fetch of characters
    fetchCharacters();
});
