var works = []

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data ) => {
    createGallery(data) //
    works = data
});


// ajoute le html de la gallerie en fonction du tableau data
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
// créer le html pour les filtres par catégorie
function createFiltersPerCategories(data) {
    // 
    const newSelectFilters = document.createElement("select");
    newSelectFilters.id = "filtreCategories"
    newSelectFilters.onchange = filterWorks;
    var optionString = ""

    data.forEach(categorie => {
        optionString += '<option value="'+ categorie.id + '">'+categorie.name+'</option>'
            // const optionElement = document.createElement("option");
            // const newTextCategory = document.createTextNode(categorie.name);
            // optionElement.value = categorie.id;
            

            // optionElement.appendChild(newTextCategory);
        
        
    })
    optionString += '<option value="-1">Toutes</option>';
    newSelectFilters.innerHTML = optionString;
    document.getElementById("portfolio").appendChild(newSelectFilters);
}

// appelée lors d'un clic sur un filtre d'une catégorie, elle filtre le tableau des travaux
function filterWorks(param) {
    const selectCategorieElements = document.getElementById("filtreCategories");
    // id du filtre selectionné
    var idSelectedFilter = selectCategorieElements.options[selectCategorieElements.selectedIndex].value;
    if (idSelectedFilter != -1) {
        // retourne un tableau des works filtrés par rapport à IdSelectedFilter
        var filteredWorks = works.filter(work => work.categoryId == idSelectedFilter);
        // regenere le html de la gallerie avec le tableau filtré
        createGallery(filteredWorks);
    }
    else {
        // regenere le html de la gallerie avec works
        createGallery(works);
    } 
}

function editor() {
    var cols = document.getElementsByClassName("modify");
    for(let i = 0 ; i < cols.length ; i++) {
        cols[i].style.visibility = 'visible';
    }
}

