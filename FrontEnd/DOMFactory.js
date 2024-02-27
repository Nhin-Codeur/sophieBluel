function createGalleryElement(work) {
    // create a new div element
        
    const figure = document.createElement("figure");
        
    const newDiv = document.createElement("figcaption");
    const newTitle = document.createTextNode(work.title);
    newDiv.appendChild(newTitle);
    


    const img = document.createElement("img");
    img.src = work.imageUrl


    figure.appendChild(img);
    figure.appendChild(newDiv);
    return figure
}

function createElementCategoryFilterAll() {
    const filterToutes = document.createElement("span");
    filterToutes.id = -1;
    filterToutes.classList.add("allFilters");
    filterToutes.innerHTML = "Toutes";
    filterToutes.onclick = () => filterWorks(-1);
    return filterToutes
}

function createElementCategoryFilter(categorie) {
    const newSelectFilter = document.createElement("span");
    newSelectFilter.classList.add("allFilters");
    newSelectFilter.id = "filter" + categorie.id;
    newSelectFilter.innerHTML = categorie.name;

    newSelectFilter.onclick = () => filterWorks(categorie.id);
    return newSelectFilter;
}

function createCategoryModaleOption(categorie) {
    const filtreCategoryModale = document.createElement("option");
    filtreCategoryModale.id = categorie.id;
    filtreCategoryModale.value = categorie.id;
    filtreCategoryModale.innerHTML = categorie.name;
    return filtreCategoryModale
}

function createWorkModale(workModale) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const icon = document.createElement("div");
    const span =document.createElement("span");
    const imgIcon = document.createElement("i");
    imgIcon.className = "fa-solid fa-trash-can icone_delete_projet" ;
    icon.classList.add("backIconTrash");
    icon.setAttribute("onclick",`deleteAndUpdateWork(${workModale.id})`) ;
    icon.appendChild(imgIcon);
    img.src = workModale.imageUrl
    figure.appendChild(img);

    span.innerText = "éditer";
    span.style.marginTop = "5px";
    span.style.fontWeight = "500";
    figure.appendChild(span);
    
    figure.appendChild(icon);
    return figure;
}