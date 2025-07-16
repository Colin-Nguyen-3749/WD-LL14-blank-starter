// Wait for the page to fully load before running our code
document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Make a request to TheMealDB API to get all available areas
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
    );

    // Convert the response to JSON format
    const data = await response.json();

    // Log the response to the console so we can see the data
    console.log("Available meal areas:", data);

    // Find the select element where we want to add the options
    const areaSelect = document.querySelector("#area-select");

    // Loop through each area in the meals array
    data.meals.forEach((meal) => {
      // Create a new option element
      const option = document.createElement("option");

      // Set the text that users will see and the value attribute
      option.textContent = meal.strArea;
      option.value = meal.strArea;

      // Add the option to the select dropdown
      areaSelect.appendChild(option);
    });
  } catch (error) {
    // If something goes wrong, log the error
    console.error("Error fetching meal areas:", error);
  }
});
