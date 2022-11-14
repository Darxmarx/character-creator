// const e = require("express");

const characterName = $('#characterName').val().trim();
const physicalDescription = $('#physical_description').val().trim();
const backstory = $('#backstory').val().trim();
const personality = $('#personality').val().trim();
const abilitiesContainer = $('#abilities-container');
const alignment = $('#alignments').val();
const saveCharacter = $('#save-character')
const imageLink = $('#uploadedimage').attr('src');
// const allAbiliteisNames = $()
// const AbilityName = $("#name-ability").val().trim();
// const description = $("#description-ability").val().trim();


// function to append ability name and desc to page
const newAbilityHandler = (e) => {
    e.preventDefault();



    console.log('button pressed!!!!!!!')
    console.log(characterName)
    console.log(physicalDescription)
    console.log(backstory)
    console.log(personality)
    console.log(abilitiesContainer)
    console.log(imageLink)
    console.log(alignment)

    console.log("ability handler reporting in");

    // collect values from ability form
    // const name = $("#name-ability").val().trim();
    // const description = $("#description-ability").val().trim();
    const AbilityName = $("#name-ability").val().trim();
    const description = $("#description-ability").val().trim();

    // contains both valid name and description
    if (AbilityName && description) {
        let newAbilityName = $("<label>").text(AbilityName);
        let newAbilityDescription = $("<p>").text(description);

        abilitiesContainer.append(newAbilityName);
        newAbilityName.append(newAbilityDescription);
    }
}

// function to save character data as POST request
const saveCharacterHandler = async (e) => {
    e.preventDefault();

    const characterName = $('#characterName').val().trim();
    const physicalDescription = $('#physical_description').val().trim();
    const backstory = $('#backstory').val().trim();
    const personality = $('#personality').val().trim();
    const abilitiesContainer = $('#abilities-container');
    const alignment = $('#alignments').val();
    const imageLink = $('#uploadedimage').attr('src');


    console.log('button pressed!!!!!!!')
    console.log(characterName)
    console.log(physicalDescription)
    console.log(backstory)
    console.log(personality)
    console.log(abilitiesContainer)
    console.log(imageLink)
    console.log(alignment)

    if (characterName && physicalDescription && backstory && personality && abilitiesContainer && imageLink && alignment) {
        const response = await fetch(`/api/character`, {
            method: 'POST',
            body: JSON.stringify({
                name: characterName,
                alignment: alignment,
                personality: personality,
                physical_description: physicalDescription,
                image: imageLink,
                backstory: backstory
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);

        const abilitiesResponse = await fetch('api/abilities', {
            method: 'POST',
            body: JSON.stringify({ AbilityName, description})
        })

        if (response.ok && abilitiesResponse.ok) {
            console.log('ok@@@@@@@@@@@@')
        }
    }
}

// button for creating an ability
$('#save-ability-button').on('click', newAbilityHandler);

// button for saving all new character info to the DB
saveCharacter.on('click', saveCharacterHandler);
