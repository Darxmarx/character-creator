// const e = require("express");

const characterName = $('#characterName').val().trim();
const physicalDescription = $('#physical_description').val().trim();
const backstory = $('#backstory').val().trim();
const personality = $('#personality').val().trim();
const abilitiesContainer = $('#abilities-container')

// document.querySelectorAll
console.log('barfk');

const newAbilityHandler = (e) => {
    e.preventDefault();

    console.log("meow");
    // collect values from ability form
    const name = $("#name-ability").val().trim();
    const description = $("#description-ability").val().trim();

    console.log(name);
    console.log(description);

    // contains both valid name and description
    if (name && description) {
        console.log("inside if description");
        // on clicking "Save" in ability modal
        // $("#save-ability-button").on("click", function () {

        let newAbilityName = $("<textarea>").text(name);
        console.log(newAbilityName);
        let newAbilityDescription = $("<textarea>").text(description);
        console.log(newAbilityDescription);

        abilitiesContainer.append(newAbilityName);
        newAbilityName.append(newAbilityDescription);
        // });
    }
}

// button for creating an ability
$('#save-ability-button').on('click', newAbilityHandler);
