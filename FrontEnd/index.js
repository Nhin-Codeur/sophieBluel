

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data ) => {
    createGallery(data)
});

function createGallery(data) {
    data.forEach(work => {
        
    // create a new div element
        const figure = document.createElement("figure");
        
        const newDiv = document.createElement("figcaption");
        const newTitle = document.createTextNode(work.title);
        newDiv.appendChild(newTitle);
        console.log(newDiv)
        

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
    data.forEach(categorie => {
        const newIdCategory = document.createElement("option");
        const newTextCategory = document.createTextNode(categorie.name);
        newIdCategory.value = categorie.id;
        newIdCategory.appendChild(newTextCategory);
        newSelectFilters.appendChild(newIdCategory);
    })
    document.getElementById("portfolio").appendChild(newSelectFilters);
}