document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("webForm");

    // Populate hidden fields with page title and URL
    document.getElementById("pageTitle").value = document.title;
    document.getElementById("pageURL").value = window.location.href;

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent default form submission
        
        // Basic spam check: honeypot field
        const honeypot = document.getElementById("honeypot").value;
        if (honeypot) {
            alert("Spam detected. Submission blocked.");
            return;
        }

        // Gather form data
        const formData = new FormData(form);

        // Convert form data to JSON
        const data = Object.fromEntries(formData.entries());

        // Webhook URL
        const webhookURL = "https://hook.eu2.make.com/ufg4ec6lt8vt4eq2egqvjx316yqxn965";

        // Send data to webhook
        fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert("Form submitted successfully!");
                form.reset(); // Reset form fields
            } else {
                alert("Error submitting the form.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("There was a problem submitting the form.");
        });
    });
});
