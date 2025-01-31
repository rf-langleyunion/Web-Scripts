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


function handleButtonClick() {
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

    // Populate the result div with the input value, using <br> for new lines
    const resultDiv = document.getElementById('result');
    const geoCode = geocodeAddress(address, city, province, postal);

    // Check if the address is '190 Gladwin' and apply styles if true
    if (address === '190 Gladwin') {
        resultDiv.style.marginTop = '20px';
        resultDiv.style.fontSize = '16px';
        resultDiv.style.color = 'blue';
        resultDiv.innerHTML = `The following residence has been registered with the CRA:<br>${address}<br>${city}, ${province} ${postal} <br>Geocode: `, ${geoCode};

    } else {
        // Reset styles if the address is not '190 Gladwin'
        resultDiv.style.marginTop = '20px';
        resultDiv.style.fontSize = '35px';
        resultDiv.style.color = 'red';
        resultDiv.innerHTML = `OH MY GOD RUN`;

    }
}
