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

document.addEventListener("DOMContentLoaded", async () => {
    const ipServices = [
        "https://api.ipify.org?format=json",
        "https://ipinfo.io/json",
        "https://httpbin.org/ip",
    ];

    for (let service of ipServices) {
        try {
            const ipResponse = await fetch(service);
            if (!ipResponse.ok) {
                throw new Error(`Service failed: ${service}`);
            }
            const ipData = await ipResponse.json();
            const ipField = document.getElementById("ipAddress");
            if (ipField) {
                const ip = ipData.ip || ipData.origin; // Handle different response formats
                ipField.value = ip;
                console.log(`IP address fetched from ${service}:`, ip);
            }
            break; // Exit loop if IP fetch succeeds
        } catch (error) {
            console.warn(`Failed to fetch IP from ${service}:`, error);
        }
    }
});
