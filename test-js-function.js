document.addEventListener('DOMContentLoaded', function() {
    // Get the form and the button
    const form = document.getElementById('address');
    const submitButton = document.querySelector('button[form="address"]');

    // Add an event listener to the form's submit event
    form.addEventListener('submit', function(event) {
        // Prevent the form from submitting the traditional way
        event.preventDefault();

        // Get the riding-details div
        const ridingDetails = document.getElementById('riding-details');

        // Clear the existing content of the div
        ridingDetails.innerHTML = '';

        // Create a new <p> element
        const newParagraph = document.createElement('p');
        newParagraph.textContent = "It's alive!";

        // Append the new <p> element to the riding-details div
        ridingDetails.appendChild(newParagraph);
    });
});

/*document.addEventListener("DOMContentLoaded", function () {
    // Select the button with ID "yui_3_17_2_1_1738968586205_96"
    const button = document.getElementById("yui_3_17_2_1_1738968586205_96");

    if (button) {
        button.addEventListener("submit", function () {
            updateDiv();
        });
    }
});

function updateDiv() {
    const testDiv = document.getElementById("riding-details");
    
    if (testDiv) {
        const p = document.createElement("p");
        p.textContent = "It works!";
        testDiv.appendChild(p);
    }
}
*/
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
