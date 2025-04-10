document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("address").addEventListener("submit", async function(event) {
        event.preventDefault();
        console.log("Form submitted!");

        // Get and validate postal code
        const postalCode = document.getElementById("postal").value.replace(/\s+/g, "").toUpperCase().trim();
        const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
        
        if (!postalCodeRegex.test(postalCode)) {
            alert("Invalid postal code. Code postal invalid.");
            return;
        }

        // Show loading state
        const ridingTableDiv = document.getElementById('riding-table');
        ridingTableDiv.innerHTML = '<div class="loading">Loading...</div>';

        try {
            // First API call to get district name
            const workerUrl = `https://hidden-sea-55ae.rainer-cb8.workers.dev/${postalCode}`;
            const response = await fetch(workerUrl);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch district data");
            }
            
            const data = await response.json();
            const districtName = data.district;
            console.log("District Name:", districtName);

            // Second API call to Google Script
            const googleScriptUrl = `https://script.google.com/macros/s/AKfycbyiyBXWP2XL4wDDNLGQinUOAcYATnUIhHH0RJY_Xw-7i4OULsINC80zch1dR1ZT0ole/exec?search=${encodeURIComponent(districtName)}`;
            const apiResponse = await fetch(googleScriptUrl);
            
            if (!apiResponse.ok) {
                throw new Error("Failed to fetch riding data");
            }
            
            const jsonData = await apiResponse.json();
            console.log("API Response Data:", jsonData);

            // Clear the container entirely before adding new content
            ridingTableDiv.innerHTML = '';

            // Add district heading
            const districtHeading = document.createElement('h3');
            districtHeading.textContent = `Your riding is ${districtName}`;
            ridingTableDiv.appendChild(districtHeading);

            // Display the data as a table
            displayDataAsTable(jsonData, ridingTableDiv);

        } catch (error) {
            console.error("Error:", error);
            ridingTableDiv.innerHTML = `
                <p class="error">
                    ${error.message || 'Error, please try again later.'}<br>
                    ${error.message ? 'Please try again later.' : ''}
                    ${error.message ? 'Erreur, veuillez recommencer plus tard.' : ''}
                </p>`;
        }
    });

    function displayDataAsTable(jsonData, container) {
        // Check if data is valid
        if (!jsonData || !Array.isArray(jsonData) || jsonData.length === 0) {
            container.innerHTML += '<p class="no-data">Sorry, but we are only providing data for ridings that are in Langley. Please use the tools from Elections Canada to find more information about your riding.</p>';
            return;
        }

        // Filter out any null/undefined entries
        const validData = jsonData.filter(candidate => candidate);

        if (validData.length === 0) {
            container.innerHTML += '<p class="no-data">No valid candidate data available.</p>';
            return;
        }

        // Create table element
        const table = document.createElement('table');
        table.className = 'candidates-table';
        
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        // Add column headers
        const headers = ['Candidate', 'Party', 'Phone Number', 'Website'];
        headers.forEach(function(headerText) {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Create table body
        const tbody = document.createElement('tbody');
        
        // Add each candidate as a row
        validData.forEach(function(candidate) {
            const row = document.createElement('tr');
            
            // Set row color based on party
            const partyColor = getPartyColor(candidate.Party.trim());
            row.style.backgroundColor = partyColor;
            
            // Candidate Name
            const nameCell = document.createElement('td');
            nameCell.textContent = candidate.Candidate || '';
            row.appendChild(nameCell);
            
            // Party
            const partyCell = document.createElement('td');
            partyCell.textContent = candidate.Party.trim() || '';
            row.appendChild(partyCell);
            
            // Phone Number
            const phoneCell = document.createElement('td');
            phoneCell.textContent = candidate['Office Phone Number'] || 'N/A';
            row.appendChild(phoneCell);
            
            // Website
            const websiteCell = document.createElement('td');
            if (candidate.Website) {
                const websiteLink = document.createElement('a');
                websiteLink.href = candidate.Website;
                websiteLink.textContent = 'Visit Website';
                websiteLink.target = '_blank';
                websiteLink.rel = 'noopener noreferrer';
                websiteCell.appendChild(websiteLink);
            } else {
                websiteCell.textContent = 'N/A';
            }
            row.appendChild(websiteCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);
    }

    function getPartyColor(party) {
        const partyColors = {
            'Conservative Party of Canada': '#B3C7E6',
            'Liberal Party of Canada': '#F5B0AC',
            'New Democratic Party': '#F9C89B',
            'Green Party of Canada': '#A6D9A3',
            'People\'s Party of Canada': '#C1B2D7'
        };
        
        return partyColors[party] || '#FFFFFF'; // Default to white if party not found
    }

    // Updated CSS
    const style = document.createElement('style');
    style.textContent = `
        #riding-table {
            margin-top: 20px;
            width: 100%;
        }
        
        #riding-table > h3 {
            color: #254c1e;
            font-size: 22px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }
        
        #riding-table .loading {
            padding: 20px;
            text-align: center;
            color: #254c1e;
        }
        
        #riding-table .error {
            color: #f0f0f0;
            padding: 15px;
            background: #254c1e;
            border-radius: 4px;
            text-align: center;
            line-height: 1.5;
        }
        
        #riding-table .no-data {
            color: #f0f0f0;
            padding: 15px;
            background: #254c1e;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
        }
        
        .candidates-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
            color: #000000;
        }
        
        .candidates-table th {
            background-color: #254c1e;
            color: #fff !important;
            text-align: left;
            padding: 12px;
            border: 1px solid #e1e1e1;
            font-weight: bold;
        }
        
        .candidates-table td {
            padding: 10px 12px;
            border: 1px solid #e1e1e1;
            vertical-align: middle;
        }
        
        .candidates-table tr:hover {
            opacity: 0.9;
        }
        
        .candidates-table a {
            color: #0066cc;
            text-decoration: none;
        }
        
        .candidates-table a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .candidates-table {
                display: block;
                overflow-x: auto;
            }
            
            #riding-table > h3 {
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);
});
