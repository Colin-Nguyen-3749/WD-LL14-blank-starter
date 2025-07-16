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

// Add an event listener to the select element for when the user selects an area
const areaSelect = document.querySelector("#area-select");
areaSelect.addEventListener("change", async (event) => {
  // Get the selected area from the dropdown
  const selectedArea = event.target.value;

  try {
    // Fetch recipes filtered by the selected area using the API
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`
    );

    // Convert the response to JSON format
    const data = await response.json();

    // Log the filtered recipes to the console
    console.log(`Recipes for ${selectedArea}:`, data);

    // Find the results div where we want to show the meal cards
    const resultsDiv = document.querySelector("#results");

    // Clear any previous results
    resultsDiv.innerHTML = "";

    // Loop through each meal in the response
    data.meals.forEach((meal) => {
      // Create a new card div for each meal
      const card = document.createElement("div");
      card.className = "meal-card"; // You can style this class in CSS

      // Create an h3 element for the meal name
      const mealName = document.createElement("h3");
      mealName.textContent = meal.strMeal;

      // Create an img element for the meal thumbnail
      const mealImg = document.createElement("img");
      mealImg.src = meal.strMealThumb;
      mealImg.alt = meal.strMeal;

      // Add the meal name and image to the card
      card.appendChild(mealName);
      card.appendChild(mealImg);

      // Add the card to the results div
      resultsDiv.appendChild(card);
    });
  } catch (error) {
    // If something goes wrong, log the error
    console.error(`Error fetching recipes for ${selectedArea}:`, error);
  }
});

// www.themealdb.com/api/json/v1/1/filter.php?a=Canadian
