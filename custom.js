// Function to open a modal by ID
function openModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex";
    }
}

// Function to close a modal by ID
function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    var modals = document.querySelectorAll('.modal, .calculator-modal');
    modals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

// Calculator Functionality
let calculatorScreen = document.getElementById('calculatorScreen');
let calculatorButtons = document.querySelectorAll('.calculator-button');
let currentInput = ''; // For storing the current input

calculatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        let value = this.getAttribute('data-value');

        // Clear screen
        if (value === 'AC') {
            currentInput = '';
            calculatorScreen.value = '';
        }
        // Toggle positive/negative
        else if (value === '±') {
            currentInput = currentInput ? String(-parseFloat(currentInput)) : '';
            calculatorScreen.value = currentInput;
        }
        // Percentage calculation
        else if (value === '%') {
            currentInput = currentInput ? String(parseFloat(currentInput) / 100) : '';
            calculatorScreen.value = currentInput;
        }
        // Evaluate expression
        else if (value === '=') {
            try {
                currentInput = String(eval(currentInput.replace(/÷/g, '/').replace(/×/g, '*')));
                calculatorScreen.value = currentInput;
            } catch (error) {
                calculatorScreen.value = 'Error';
                currentInput = '';
            }
        }
        // Append number/operator to input
        else {
            currentInput += value;
            calculatorScreen.value = currentInput;
        }
    });
});

function convertCurrency() {
    // Get the input values
    let amount = parseFloat(document.getElementById("currencyInput").value);
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    
    // Ensure a valid amount is entered
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Example exchange rates (you can replace these with dynamic values or an API)
    const exchangeRates = {
        "USD": {
            "EUR": 0.85,
            "INR": 75,
        },
        "EUR": {
            "USD": 1.18,
            "INR": 88,
        },
        "INR": {
            "USD": 0.013,
            "EUR": 0.011,
        }
    };

    // Check if the conversion exists
    if (fromCurrency === toCurrency) {
        alert("You selected the same currency for both 'from' and 'to'.");
        return;
    }

    // Perform the conversion
    let convertedAmount = amount * exchangeRates[fromCurrency][toCurrency];

    // Update the result in the modal
    document.getElementById("currencyResult").innerText = 
        `Converted Amount: ${convertedAmount.toFixed(2)} ${toCurrency}`;
}


let countdown;
document.getElementById('start-btn').addEventListener('click', function() {
    let datetimeInput = document.getElementById('datetime-picker').value;
    let targetDate = new Date(datetimeInput).getTime();

    if (isNaN(targetDate)) {
        alert('Please select a valid date and time.');
        return;
    }

    clearInterval(countdown); // Clear previous countdown

    countdown = setInterval(function() {
        let now = new Date().getTime();
        let timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdown);
            document.getElementById('message').innerHTML = 'Countdown Complete!';
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            return;
        }

        let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').innerHTML = String(days).padStart(2, '0');
        document.getElementById('hours').innerHTML = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerHTML = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerHTML = String(seconds).padStart(2, '0');
        document.getElementById('time-remaining').innerHTML = `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds Remaining`;
    }, 1000);
});

// Close button for Timer Modal
document.getElementById('closeModalBtn').addEventListener('click', function() {
    closeModal('timerModal');
    clearInterval(countdown); // Stop the timer when modal is closed
});
// Function to save reminder and display an alert with the saved date
function saveReminder() {
    // Get the selected date and time
    const reminderDate = document.getElementById("reminder-date").value;
    const reminderNote = document.getElementById("reminder-note").value;
    
    // Check if the date is selected
    if (!reminderDate) {
        alert("Please select a date and time.");
        return;
    }

    // Alert the user with the selected date and time
    alert(`Reminder set for: ${reminderDate}\nNote: ${reminderNote}`);

    // Highlight the selected date (you can replace this with actual date handling logic)
    highlightDate(reminderDate);
}

// Function to highlight the selected date
function highlightDate(date) {
    // Find the container where highlighted dates will be added
    const container = document.getElementById('highlighted-dates-container');
    
    // Create a new div for the highlighted date
    const dateElement = document.createElement('div');
    dateElement.classList.add('highlighted-date');
    
    // Set the text to show the saved date
    dateElement.innerText = `Saved Date: ${date}`;
    
    // Append the new highlighted date element to the container
    container.appendChild(dateElement);
}
        // Function to save the notepad content
        function saveNotepad() {
            let noteContent = document.getElementById("notepadContent").value;

            if (noteContent.trim() === "") {
                alert("Please write something before saving.");
            } else {
                alert("Note saved: " + noteContent);
                document.getElementById("notepadContent").value = "";  // Clear the text area
            }
        }
        // Unit conversion logic based on selected types
function convertUnit() {
    // Get the selected unit type (Length, Weight, Temperature)
    let unitType = document.getElementById("unitType").value;

    // Get the input value and selected units
    let inputValue = parseFloat(document.getElementById("inputUnit").value);
    let inputUnitType = document.getElementById("inputUnitType").value;
    let outputUnitType = document.getElementById("outputUnitType").value;

    // Ensure input is a valid number
    if (isNaN(inputValue)) {
        alert("Please enter a valid value.");
        return;
    }

    let convertedValue;

    // Conversion logic based on unit type
    switch (unitType) {
        case "length":
            convertedValue = convertLength(inputValue, inputUnitType, outputUnitType);
            break;
        case "weight":
            convertedValue = convertWeight(inputValue, inputUnitType, outputUnitType);
            break;
        case "temperature":
            convertedValue = convertTemperature(inputValue, inputUnitType, outputUnitType);
            break;
        default:
            alert("Please select a valid unit type.");
            return;
    }

    // Display the converted value in the output input field
    document.getElementById("outputUnit").value = convertedValue;
}

// Example conversion functions for length, weight, and temperature
function convertLength(value, fromUnit, toUnit) {
    const lengthConversion = {
        "meter": { "meter": 1, "kilometer": 0.001, "mile": 0.000621371 },
        "kilometer": { "meter": 1000, "kilometer": 1, "mile": 0.621371 },
        "mile": { "meter": 1609.34, "kilometer": 1.60934, "mile": 1 }
    };
    return value * lengthConversion[fromUnit][toUnit];
}

function convertWeight(value, fromUnit, toUnit) {
    const weightConversion = {
        "kilogram": { "kilogram": 1, "gram": 1000, "pound": 2.20462 },
        "gram": { "kilogram": 0.001, "gram": 1, "pound": 0.00220462 },
        "pound": { "kilogram": 0.453592, "gram": 453.592, "pound": 1 }
    };
    return value * weightConversion[fromUnit][toUnit];
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        return (value * 9/5) + 32;
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        return (value - 32) * 5/9;
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        return value + 273.15;
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        return value - 273.15;
    } else {
        return value; // If no conversion needed
    }
}

// Populate the unit dropdowns based on the selected unit type
function populateUnits() {
    let unitType = document.getElementById("unitType").value;
    let inputUnitSelect = document.getElementById("inputUnitType");
    let outputUnitSelect = document.getElementById("outputUnitType");

    let options = "";

    // Populate unit options based on the unit type
    switch (unitType) {
        case "length":
            options = `
                <option value="meter">Meter</option>
                <option value="kilometer">Kilometer</option>
                <option value="mile">Mile</option>
            `;
            break;
        case "weight":
            options = `
                <option value="kilogram">Kilogram</option>
                <option value="gram">Gram</option>
                <option value="pound">Pound</option>
            `;
            break;
        case "temperature":
            options = `
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
            `;
            break;
    }

    // Populate both input and output unit dropdowns
    inputUnitSelect.innerHTML = options;
    outputUnitSelect.innerHTML = options;
}


