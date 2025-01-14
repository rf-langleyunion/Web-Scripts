document.addEventListener("DOMContentLoaded", () => {
    console.log("JS is working"); // Confirm JS execution

    const form = document.getElementById("webForm");
    if (!form) {
        console.error("Form element not found!");
        return;
    }

    console.log("Form element found:", form);

    // Attach event listener to the form
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Form submission intercepted!");

        // Spam check: honeypot field
        const honeypot = document.getElementById("honeypot").value;
        if (honeypot) {
            console.warn("Spam detected. Honeypot field is filled:", honeypot);
            alert("Spam detected. Submission blocked.");
            return;
        }

        // Collect form data
        const formData = new FormData(form);

        // Convert form data to JSON
        const data = Object.fromEntries(formData.entries());
        console.log("Form data to be sent:", data);

        // Send the form data to the webhook
        sendToWebhook(data);
    });

    function sendToWebhook(data) {
        const webhookURL = "https://hook.eu2.make.com/ufg4ec6lt8vt4eq2egqvjx316yqxn965"; // Replace with your webhook URL
        console.log("Sending data to webhook:", webhookURL);

        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (response.ok) {
                    alert("Form submitted successfully!");
                    form.reset(); // Reset form fields
                } else {
                    alert("Error submitting the form.");
                    console.error("Server responded with:", response.status, response.statusText);
                }
            })
            .catch((error) => {
                console.error("Error during fetch request:", error);
                alert("There was a problem submitting the form.");
            });
    }
});
