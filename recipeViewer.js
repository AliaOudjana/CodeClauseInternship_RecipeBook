function displayRecipe(recipe){
    let retrievedRecipe = localStorage.getItem(recipe);
    let recipeData = JSON.parse(retrievedRecipe);
    let recipeName = recipe.replaceAll("-", " ");
    
    document.getElementById("recipeName").innerHTML = recipeName;
    document.getElementById("recipeDate").innerHTML = 'Updated on ' + recipeData['recepiDate'];
    document.getElementById("recipeImage").src = recipeData['recipeImage'];
    
    let ingredients = recipeData['ingredients'];
    const ingredientsTable = document.getElementById("ingredientsTable");
    for(let i=0; i<ingredients.length; i++){
        const newRow = ingredientsTable.insertRow();
        const newCell = newRow.insertCell(0);
        newCell.innerHTML = `• ${ingredients[i]}`;
    }

    document.getElementById("method").innerHTML = recipeData['method'];
}