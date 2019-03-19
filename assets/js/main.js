window.onload = function() {
  document.getElementById("get-recipe").addEventListener("click", function(){
    event.preventDefault();
    let link = document.getElementById("recipe-link").value;
    console.log(link);
    
  });
}
