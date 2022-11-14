// const e = require("express");

const characterName = $('#characterName').val().trim();
const physicalDescription = $('#physical_description').val().trim();
const backstory = $('#backstory').val().trim();
const personality = $('#personality').val().trim();
const abilitiesContainer = $('#abilities-container');
const saveCharacter = $('#save-character')

// function to append ability name and desc to page
const newAbilityHandler = (e) => {
    e.preventDefault();

    console.log("ability handler reporting in");

    // collect values from ability form
    const name = $("#name-ability").val().trim();
    const description = $("#description-ability").val().trim();

    // contains both valid name and description
    if (name && description) {
        let newAbilityName = $("<label>").text(name);
        let newAbilityDescription = $("<p>").text(description);

        abilitiesContainer.append(newAbilityName);
        newAbilityName.append(newAbilityDescription);
    }
}

// function to save character data as POST request
const saveCharacterHandler = async (e) => {
    e.preventDefault();


}

// button for creating an ability
$('#save-ability-button').on('click', newAbilityHandler);

// button for saving all new character info to the DB
saveCharacter.on('click', saveCharacterHandler);
