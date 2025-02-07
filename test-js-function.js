document.addEventListener('DOMContentLoaded', function() {
    // Get the button element by its class
    const submitButton = document.querySelector('.submit-test');

    // Add a click event listener to the button
    submitButton.addEventListener('click', function() {
        // Get the div element by its ID
        const testDiv = document.getElementById('test');

        // Create a new <p> element
        const newParagraph = document.createElement('p');

        // Set the text content of the <p> element
        newParagraph.textContent = 'Works!';

        // Append the <p> element to the div
        testDiv.appendChild(newParagraph);
    });
});

/*
// Function to geocode an address using OpenStreetMap Nominatim
async function geocodeAddress(address, city, province, postalCode) {
    // Construct the query string
    const query = encodeURIComponent(`${address}, ${city}, ${province}, ${postalCode}`);
    
    // Nominatim API endpoint
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

    try {
        // Fetch the geocoded data
        const response = await fetch(url);
        const data = await response.json();

        // Check if the response contains any results
        if (data.length > 0) {
            // Extract latitude and longitude from the first result
            const { lat, lon } = data[0];
            return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        console.error('Error geocoding address:', error);
        return null;
    }
}

async function handleButtonClick() {
    // Get the value from the text box
    const address = document.getElementById('addressLine1').value.trim();
    const city = document.getElementById('city').value.trim();
    const province = document.getElementById('province').value.trim();
    const postal = document.getElementById('postalCode').value.trim();

    // Check for empty fields
    if (!address || !city || !province || !postal) {
        alert("Please fill in all fields.");
        return;
    }

    // Geocode the address
    const geoCode = await geocodeAddress(address, city, province, postal);

    // Get the result div
    const resultDiv = document.getElementById('result');

    // Check if the address is '190 Gladwin' and apply styles if true
    if (address === '190 Gladwin') {
        resultDiv.style.marginTop = '20px';
        resultDiv.style.fontSize = '16px';
        resultDiv.style.color = 'blue';
    } else {
        // Reset styles if the address is not '190 Gladwin'
        resultDiv.style.marginTop = '20px';
        resultDiv.style.fontSize = '16px';
        resultDiv.style.color = 'blue';
    }

    // Display the result
    if (geoCode) {
        resultDiv.innerHTML = `The following residence has been registered with the CRA:<br>${address}<br>${city}, ${province} ${postal} <br>Geocode: Latitude: ${geoCode.latitude}, Longitude: ${geoCode.longitude}`;
    } else {
        resultDiv.innerHTML = `The following residence has been registered with the CRA:<br>${address}<br>${city}, ${province} ${postal} <br>Geocode: Unable to find coordinates.`;
    }
}
*/
