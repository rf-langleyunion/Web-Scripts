// JavaScript function to handle the button click
function handleButtonClick() {
    // Get the value from the text box
    const inputValue = document.getElementById('textInput').value;

    // Populate the result div with the input value
    document.getElementById('result').textContent = `You entered: ${inputValue}`;
}
