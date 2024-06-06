// Get the objects we need to modify
let addHarvestsForm = document.getElementById('add-harvests-form-ajax');

// Modify the objects we need
addHarvestsForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFarmerID = document.getElementById("input-farmer-id");
    let inputCropType = document.getElementById("input-crop-type");
    let inputQuantity = document.getElementById("input-quantity");
    let inputHarvestDate = document.getElementById("input-harvest-date");

    // Get the values from the form fields
    let farmerIDValue = inputFarmerID.value;
    let cropTypeValue = inputCropType.value;
    let quantityValue = inputQuantity.value;
    let harvestDateValue = inputHarvestDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        farmerID: farmerIDValue,
        cropType: cropTypeValue,
        quantity: quantityValue,
        harvestDate: harvestDateValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/harvests", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToHarvestsTable(data);

            // Clear the input fields for another transaction
            inputFarmerID.value = '';
            inputCropType.value = '';
            inputQuantity.value = '';
            inputHarvestDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from Harvests
addRowToHarvestsTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("harvests-table");

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let farmerIDCell = document.createElement("TD");
    let cropTypeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let harvestDateCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = data.harvestID;
    farmerIDCell.innerText = data.farmerID;
    cropTypeCell.innerText = data.cropType;
    quantityCell.innerText = data.quantity;
    harvestDateCell.innerText = data.harvestDate;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(farmerIDCell);
    row.appendChild(cropTypeCell);
    row.appendChild(quantityCell);
    row.appendChild(harvestDateCell);

    // Add the row to the table
    currentTable.appendChild(row);
}
