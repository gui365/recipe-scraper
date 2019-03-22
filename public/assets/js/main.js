window.onload = function() {

  // Event listener on the "Get Recipe" button
  document.getElementById("get-recipe").addEventListener("click", function(){
    event.preventDefault();
    let link = document.getElementById("recipe-link").value;
    // console.log(link);
        
    const params = {
      body: JSON.stringify({ recipeLink: link }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST"
    }

    fetch("/recipe", params )
      // Just making sure the client can receive info from the server
      // .then(data => data.json())
      // .then(newData => console.log(newData.link))
      .catch(error => console.log(error));
  });
}
