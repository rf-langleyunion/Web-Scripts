document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("webForm");
        const webhookURL = "https://your-webhook-url.example.com"; // Replace with your webhook URL

        // Populate hidden fields with page title and URL
        document.getElementById("pageTitle").value = document.title;
        document.getElementById("pageURL").value = window.location.href;

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent default form submission

            // Basic spam check: honeypot field
            const honeypot = document.getElementById("honeypot").value;
            if (honeypot) {
                console.warn("Spam detected. Honeypot field is filled:", honeypot);
                alert("Spam detected. Submission blocked.");
                return;
            }

            // Gather form data
            const formData = new FormData(form);

            // Convert form data to JSON
            const data = Object.fromEntries(formData.entries());
            console.log("Form data to be sent:", data); // Debugging payload data

            // Send data to webhook
            sendToWebhook(data);
        });

        function sendToWebhook(data) {
            console.log("Sending data to webhook:", webhookURL); // Debug webhook URL

            fetch(webhookURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log("Webhook Response:", response); // Debug entire response object
                if (response.ok) {
                    alert("Form submitted successfully!");
                    form.reset(); // Reset form fields
                } else {
                    alert("Error submitting the form.");
                    console.error("Server responded with:", response.status, response.statusText);
                }
            })
            .catch(error => {
                console.error("Error during fetch request:", error);
                alert("There was a problem submitting the form.");
            });
        }
    });
