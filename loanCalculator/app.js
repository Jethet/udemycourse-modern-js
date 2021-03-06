// Listen for submit

document.querySelector("#loan-form").addEventListener("submit", function (e) {
  // hide results:
  document.querySelector("#results").style.display = "none";
  // show loader:
  document.querySelector("#loading").style.display = "block";
  // loader only active for 2 seconds:
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

// Calculate results
function calculateResults() {
  // UI variables: it can be useful to add UI to the variable name, to make this clear
  const amount = document.querySelector("#amount");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");
  const monthlyPayment = document.querySelector("#monthly-payment");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value); // in the US, 'principal' is the loan amount
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // show results and hide loading icon
    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

// Show error message
function showError(error) {
  // hide results and hide loading icon if error occurs (otherwise loader icon keeps spinning!)
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";
  // Create a div
  const errorDiv = document.createElement("div");

  // Get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Add class to div
  errorDiv.className = "alert alert-danger";

  // Create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // Clear error message after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
