function autocomplete(inputAddress, latitudeInput, longitudeInput){
    if(!inputAddress) return; // Don't run if there's no Address from the page
    const dropdown = new google.maps.places.Autocomplete(inputAddress);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latitudeInput.value = place.geometry.location.lat();
        longitudeInput.value = place.geometry.location.lng(); 

        console.log(place);
    });

    // If someone hits enter on address field, don't submit the entire form
    inputAddress.on('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    });

}

export default autocomplete;