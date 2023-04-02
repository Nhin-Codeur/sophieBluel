//
var works = []

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data ) => {
    createGallery(data) //
    works = data
});



function createGallery(data) {
    document.getElementById("gallery").innerHTML = "";
    data.forEach(work => {
        
    // create a new div element
        
        const figure = document.createElement("figure");
        
        const newDiv = document.createElement("figcaption");
        const newTitle = document.createTextNode(work.title);
        newDiv.appendChild(newTitle);
        
        

        const img = document.createElement("img");
        img.src = work.imageUrl


        figure.appendChild(img);
        figure.appendChild(newDiv);
        // ajouter les figures dans la gallerie en fonction du résultat du back-end //
        document.getElementById("gallery").appendChild(figure);
        

    });
}

fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
           createFiltersPerCategories(data) 
    });

function createFiltersPerCategories(data) {
    const newSelectFilters = document.createElement("select");
    newSelectFilters.id = "filtreCategories"
    newSelectFilters.onchange = filterWorks;
    var optionString = ""
    data.forEach(categorie => {
        optionString += '<option value="'+ categorie.id + '" onclick="filterWorks(this);">'+categorie.name+'</option>'
            // const optionElement = document.createElement("option");
            // const newTextCategory = document.createTextNode(categorie.name);
            // optionElement.value = categorie.id;
            

            // optionElement.appendChild(newTextCategory);
        
        
    })
    newSelectFilters.innerHTML = optionString;
    document.getElementById("portfolio").appendChild(newSelectFilters);
}

function filterWorks(param) {
    const selectCategorieElements = document.getElementById("filtreCategories");
    var idSelectedFilter = selectCategorieElements.options[selectCategorieElements.selectedIndex].value;
    console.log(works);
    var filteredWorks = works.filter(work => work.categoryId == idSelectedFilter);
    createGallery(filteredWorks);
}