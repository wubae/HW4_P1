/*
Name: Wu Li
Date: 11/20/2024
File: script.js

Wu Li, UMass Lowell Computer Science, wuhui_li@student.uml.edu
Copyright (c) 2024 by Wu. All rights reserved. May be freely copied or 
excerpted for educational purposes with credit to the author.
*/
$(document).ready(function () {
    // Add jQuery Validation to the form
    $("#table-form").validate({
        rules: {
            minColumn: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            maxColumn: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThanOrEqual: "#min-column"
            },
            minRow: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            maxRow: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                greaterThanOrEqual: "#min-row"
            }
        },
    messages: {
        minColumn: {
            required: "Please enter a minimum column value.",
            number: "Enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must not exceed 50."
        },
        maxColumn: {
            required: "Please enter a maximum column value.",
            number: "Enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must not exceed 50.",
            greaterThanOrEqual: "Maximum column must be greater than or equal to minimum column."
        },
        minRow: {
            required: "Please enter a minimum row value.",
            number: "Enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must not exceed 50."
        },
        maxRow: {
            required: "Please enter a maximum row value.",
            number: "Enter a valid number.",
            min: "Value must be at least -50.",
            max: "Value must not exceed 50.",
            greaterThanOrEqual: "Maximum row must be greater than or equal to minimum row."
        }
    },
    submitHandler: function () {
        generateDynamicTable(); // Call the table generation function
        return false; // Prevent form submission
    }
});

    // Custom validation method to ensure one field is greater than or equal to another
    $.validator.addMethod("greaterThanOrEqual", function (value, element, param) {
        const target = $(param);
        return parseFloat(value) >= parseFloat(target.val());
    }, "Value must be greater than or equal to the related field.");
});

// Multiplication table generation function
function generateDynamicTable() {
    // Clear any previous error messages
    $("#error-message").text('');

    // Get values from the form inputs
    const hStart = parseInt($("#min-column").val());
    const hEnd = parseInt($("#max-column").val());
    const vStart = parseInt($("#min-row").val());
    const vEnd = parseInt($("#max-row").val());

    // Validate range (fallback in case of unexpected bypass)
    const minAllowed = -50;
    const maxAllowed = 50;

    if (hStart < minAllowed || hEnd > maxAllowed || vStart < minAllowed || vEnd > maxAllowed) {
        $("#error-message").text("Values must be between -50 and 50.");
        return;
    }

    if (hStart > hEnd || vStart > vEnd) {
        $("#error-message").text("Start values must be less than or equal to end values.");
        return;
    }

    const table = $("#multiplication-table");
    // Clear previous table content
    table.empty();

    // Create table header
    const thead = $("<thead>");
    const headerRow = $("<tr>");

    // Create empty top-left cell as a <th>
    headerRow.append($("<th>"));

    for (let h = hStart; h <= hEnd; h++) {
        headerRow.append($("<th>").text(h));
    }
    thead.append(headerRow);
    table.append(thead);

    // Create table body
    const tbody = $("<tbody>");
    for (let v = vStart; v <= vEnd; v++) {
        const row = $("<tr>");
        // Add the row header
        row.append($("<th>").text(v));
        for (let h = hStart; h <= hEnd; h++) {
            row.append($("<td>").text(h * v));
        }
        tbody.append(row);
    }
    table.append(tbody);
}

