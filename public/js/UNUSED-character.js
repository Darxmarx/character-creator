const { response } = require("express");

const characterName = $('#characterName').val().trim();
const physicalDescription = $('#physical_description').val().trim();
const backstory = $('#backstory').val().trim();
const personality = $('#personality').val().trim();

// new character handler
const newCharacterHandler = async (e) => {
    e.preventDefault();

    // CREATE new character
    if (characterName) {
        const response = await fetch(`/api/character`, {
            method: 'POST',
            body: JSON.stringify({ characterName, physicalDescription, backstory, personality }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/characters');
        } else {
            alert('Failed to Create New Character!');
        }
    }
}

// EDIT character
const editCharacterHandler = async (e) => {
    e.preventDefault();

    if (e.target.hasAttribute('data-editId')) {
        const id = e.target.getAttribute('data-editId');

        const response = await fetch(`/api/character/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                personality,
                physicalDescription,
                backstory,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/characters');
        } else {
            alert('Edit Failed!');
        }
    }
}

//DELETE character Handler
const delCharacterHandler = async (e) => {
    if (e.target.hasAttribute('data-deleteId')) {
        const id = e.target.getAttribute('data-deleteID');

        const response = await fetch(`/api/character/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/character');
        } else {
            alert('Failed to delete character!');
        }
    }
};

$('#save-character').on('click', newCharacterHandler);
$('#edit-character').on('click', editCharacterHandler);
$('#delete-character').on('click', delCharacterHandler);
