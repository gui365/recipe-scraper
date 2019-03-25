window.onload = function() {

  // Event listener on the "Get Recipe" button
  document.getElementById("get-recipe").addEventListener("click", function(){
    event.preventDefault();

    // Grab the link of the recipe from the input box
    let link = document.getElementById("recipe-link").value;
    
    // Set fetch parameters
    const params = {
      body: JSON.stringify({ recipeLink: link }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
    }

    // Get the data using the parameters set and the link
    fetch("/recipe", params)
      .then(data => data.json())
      .then(newData => {
        console.log(newData);
        
        // Grab the content div and empty it
        const contentDiv = document.getElementById("content");
        contentDiv.innerHTML = "";
        
        // Create elements using new data and append them to the div
        const author = document.createElement("p");
        author.innerHTML = newData.author;
        contentDiv.appendChild(author);
        
        const intro = document.createElement("p");
        intro.innerHTML = newData.intro;
        contentDiv.appendChild(intro);

      })
      .catch(error => console.log(error));
  });
}
