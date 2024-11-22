// JavaScript function to handle the button click
function handleButtonClick() {
    // Get the value from the text box
    const address = document.getElementById('addressLine1').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const postal = document.getElementById('postalCode').value;

    // Populate the result div with the input value
// Populate the result div with the input value
// JavaScript function to handle the button click
function handleButtonClick() {
    // Get the value from the text box
    const address = document.getElementById('addressLine1').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const postal = document.getElementById('postalCode').value;

    // Populate the result div with the input value, using <br> for new lines
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = `The following residence has been registered with the CRA:<br>${address}<br>${city}, ${province} ${postal}`;
}
