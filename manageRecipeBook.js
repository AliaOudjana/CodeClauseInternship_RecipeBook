var ingredientsCounter = 2;
var extraIngredients = document.getElementById('extraIngredients');

function addIngredient(){

  if(ingredientsCounter < 30){
    ingredientsCounter++;

    var newField = document.createElement('input');
    newField.setAttribute('type','text');
    newField.setAttribute('id',`ingredient${ingredientsCounter}`);
    newField.setAttribute('name',`ingredient${ingredientsCounter}`);
    newField.setAttribute('class', 'inputField');
    newField.setAttribute('placeholder',`Ingredient ${ingredientsCounter}`);

    extraIngredients.appendChild(newField);
    extraIngredients.appendChild(document.createElement("br"));
  }
  else{
		alert('Maximum number of ingredients reached');
	}
}

function removeIngredient(){

	if(ingredientsCounter > 2){
    extraIngredients.lastChild.remove(); //remove the br
    document.getElementById('ingredient' + ingredientsCounter).remove(); //remove the last ingredient field
    ingredientsCounter--;
	}
	else{
		alert('There should be at least 2 ingredients');
	}
}

function validateInput(){
  let recipe = document.getElementById("recipeName").value;
  let ingredient1 = document.getElementById("ingredient1").value;
  let ingredient2 = document.getElementById("ingredient2").value;
  let method = document.getElementById("method").value;
  let recipeImage = document.getElementById("recipeImagePreview").src;

  if(recipe == "" || ingredient1 == "" || ingredient2 == "" || method == "" || recipeImage == ""){
    alert("Please fill in all the fields.");
    return false;
  }
  else if(!(/^data:image\/(jpe?g|png)/i.test(recipeImage))){
    alert("The file must be an image (jpeg/jpg/png)");
    return false;
  }
  else{
    return true;
  }
}

function addNewRecipe(){

  if (validateInput()){
    let recipe = document.getElementById("recipeName").value;
    var recipeName = recipe.replaceAll(/\s+/g, "-");
    let method = document.getElementById("method").value;
    let recipeImage = document.getElementById("recipeImagePreview").src;

    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth()+1;
    let year = today.getFullYear();
    var recepiDate = `${date}/${month}/${year}`;

    var ingredients = [];
    for(let i=1; i<=ingredientsCounter; i++){
      var ingredient = document.getElementById(`ingredient${i}`).value;
      ingredients.push(ingredient);
    }
    
    var newRecipe = { 'ingredients': ingredients, 'recepiDate': recepiDate, 'method': method, 'recipeImage': recipeImage};
    localStorage.setItem(recipeName, JSON.stringify(newRecipe));

    window.location.href = "index.html";
  }
}

function removeRecipe(recipeName){
  if(confirm(`Are you sure you want to delete the recipe "${recipeName}"?`)){
    localStorage.removeItem(recipeName);
    window.location.href = "index.html";
  }
}

function viewImage(recipeImage) {

  if (recipeImage.files && recipeImage.files[0]) {
    //check if the file is an accepted image format
    if (/\.(jpe?g|png)$/i.test(recipeImage.files[0].name)) {
      var reader = new FileReader();
      reader.addEventListener("load", () =>{
        var recipeImage = reader.result;
        document.getElementById("recipeImagePreview").src = recipeImage;
        document.getElementById("recipeImagePreview").style.display = "inline-block";
      }) 
      reader.readAsDataURL(recipeImage.files[0]);
    }
  }
  else{
    alert("The file must be an image (jpeg/jpg/png).");
  }
}

function redirectToEditPage(recipe){
  window.location.href = "editRecipeForm.html?recipe=" + recipe;
}

function displayEditPage(recipe){
  
  let retrievedRecipe = localStorage.getItem(recipe);
  let recipeData = JSON.parse(retrievedRecipe);

  let recipeName = recipe.replaceAll("-", " ");
  document.getElementById("recipeName").value = recipeName;

  let ingredients = recipeData['ingredients'];
  document.getElementById("ingredient1").value = ingredients[0];
  document.getElementById("ingredient2").value = ingredients[1];
  
  for(let i=2; i<ingredients.length; i++){
    addIngredient();
    document.getElementById(`ingredient${i+1}`).value = ingredients[i];
  }

  document.getElementById("method").innerHTML = recipeData['method'];

  let recipeImage = recipeData['recipeImage'];
  document.getElementById("recipeImagePreview").src = recipeImage;
  document.getElementById("recipeImagePreview").style.display = "inline-block";
}

function editRecipe(recipeName){
  if(confirm('Are you sure you want to edit this recipe?')){
    localStorage.removeItem(recipeName);
    addNewRecipe();
  }
}