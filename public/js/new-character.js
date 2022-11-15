const saveCharacter = $('#save-character')

// function to save character data as POST request
const saveCharacterHandler = async (e) => {
    e.preventDefault();

    const characterName = $('#characterName').val().trim();
    const physicalDescription = $('#physical_description').val().trim();
    const backstory = $('#backstory').val().trim();
    const personality = $('#personality').val().trim();
    const abilities = $('#abilities').val().trim();
    const alignment = $('#alignments').val();
    const imageLink = $('#uploadedimage').attr('src');

    console.log('button pressed!!!!!!!')
    console.log(characterName)
    console.log(physicalDescription)
    console.log(backstory)
    console.log(personality)
    console.log(abilities)
    console.log(imageLink)
    console.log(alignment)

    if (characterName && physicalDescription && backstory && personality && abilities && imageLink && alignment) {
        const response = await fetch(`/api/character`, {
            method: 'POST',
            body: JSON.stringify({
                name: characterName,
                alignment: alignment,
                personality: personality,
                physical_description: physicalDescription,
                image: imageLink,
                backstory: backstory,
                abilities: abilities
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
    }

    document.location.replace('/user');
}

// button for saving all new character info to the DB
saveCharacter.on('click', saveCharacterHandler);
