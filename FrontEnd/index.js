// todo : mettre les messages derreur en roug
// corriger filtres
// corriger connexion
// 
var works = []
var binaryImage;

if (localStorage.getItem("token") !== null) {
    document.getElementById("loginButton").innerHTML = "logout";
    document.getElementById("adminHeader").style.display = "flex";
}

async function updateWorks() {
    return fetchWorks() 
        .then((data) => {
            createGallery(data) //
            works = data
        });
}

fetchCategories()
    .then((data) => {
           createFiltersPerCategories(data) 
    });

updateWorks()


// ajoute le html de la gallerie en fonction du tableau data
function createGallery(data) {
    document.getElementById("gallery").innerHTML = "";
    data.forEach(work => {
        
        const figure = createGalleryElement(work)
    
        // ajouter les figures dans la gallerie en fonction du résultat du back-end //
        document.getElementById("gallery").appendChild(figure);
    });
}

// créer le html pour les filtres par catégorie
function createFiltersPerCategories(data) {
    // 
    const filterToutes = createElementCategoryFilterAll()
    document.getElementById("categoryFilters").appendChild(filterToutes);
    
    data.forEach(categorie => {
        const newSelectFilter = createElementCategoryFilter(categorie);
        document.getElementById("categoryFilters").appendChild(newSelectFilter);

        const optionCategoryModale = createCategoryModaleOption(categorie)
        document.getElementById("categoryWork").appendChild(optionCategoryModale);
    })
}

// appelée lors d'un clic sur un filtre d'une catégorie, elle filtre le tableau des travaux
function filterWorks(idCategory) {
    // permet au filtre choisit de s'afficher avec les bonnes couleurs
    const filters = document.getElementsByClassName("allFilters");
    Array.from(filters).forEach( elem => {
        elem.classList.remove("filterChoosed");
    })
    if (idCategory != -1) {
        // retourne un tableau des works filtrés par rapport à idCategory
        var filteredWorks = works.filter(work => work.categoryId == idCategory);
        // regenere le html de la gallerie avec le tableau filtré
        createGallery(filteredWorks);
        document.getElementById("filter" + idCategory).classList.add("filterChoosed");
    }
    else {
        document.getElementById(idCategory).classList.add("filterChoosed");
        // regenere le html de la gallerie avec works
        createGallery(works);
    } 

    
    
    
    
}

const editorButtonEvent = document.getElementById("modeEdition");
editorButtonEvent.addEventListener("click", function() {
        var cols = document.getElementsByClassName("modify");
        for(let i = 0 ; i < cols.length ; i++) {
            cols[i].style.visibility = 'visible';
        }
})



function modale() {
    
    document.getElementById("myModal2").style.display = "none";
    document.getElementById("galleryModale").innerHTML = "" ;
    works.forEach(workModale => {
        const figure = createWorkModale(workModale);
        // ajouter les figures dans la gallerie en fonction du résultat du back-end //
        document.getElementById("galleryModale").appendChild(figure);
        // ajouter l'icone de la poubelle pour supprimer l'image en question (onclick)
    })
    document.getElementById("myModal").style.display = "block";
    
}
const modifymodaleEvent = document.getElementById("modifymodale");
modifymodaleEvent.addEventListener("click", modale)

const modaleEvent = document.getElementById("returnButton");
modaleEvent.addEventListener("click", modale)

//

const close = document.querySelector(".close");
close.addEventListener("click", closeModal);

function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal2").style.display = "none";
}

const btnAdd = document.querySelector("#buttonAddPhoto");
btnAdd.addEventListener("click", openSecondModale);

function openSecondModale() {
    closeModal();
    document.getElementById("myModal2").style.display="block";  
}



function deleteGallery() {
    console.log("deleted gallery")
}

function deleteAndUpdateWork(id) {
    deleteWork(id)
        .then((data) => {
            updateWorks()
                .then(data => {
                    modale()
                })  
        }); 
}

const addWorkEvent = document.getElementById("buttonAddToGallery");
addWorkEvent.addEventListener("click", function() {
    {   
        const listCategories = document.getElementById("categoryWork");
        
        let areFieldsDefined = true;
        if(document.getElementById("file").files[0] == '' || document.getElementById("file").files[0] == undefined || document.getElementById("file").files[0] == null) {
            areFieldsDefined = false;
            let span = document.getElementById('errorImg');
            span.innerText = 'Image obligatoire';
            
        }
        if(document.getElementById("titleWork").value == '' || document.getElementById("titleWork").value == undefined || document.getElementById("titleWork").value == null){
            areFieldsDefined = false;
            let span =document.getElementById('errorTitle')
            span.innerText = 'Titre obligatoire';
            
         }
        
    
        if(areFieldsDefined){
            let formData = new FormData();
            formData.append("image", document.getElementById("file").files[0]);
            formData.append("title", document.getElementById("titleWork").value);
            
            formData.append("category", listCategories.options[listCategories.selectedIndex].value);
            
                
            createWork(formData)
                .then(data => {
                    updateWorks()
                        .then(modale)  
                })  
        }
    }   
})

let elemFile = document.getElementById("file");
elemFile.addEventListener('change', (e) =>{
    let img = document.createElement('img');
    // récupère l'URL que l'utilisateur a selectionné dans son ordi
    img.src= URL.createObjectURL(e.target.files[0]);
    // l'ajoute au src de l'image selectionnée
    img.classList.add("prevImage")
    let elemPrevImage = document.getElementById('prevImage');
    elemPrevImage.replaceWith(img);
    // console.log(e.target.files[0])
    let span = document.getElementById('errorImg');
        span.innerText = '';
        
        // todo mettre en rouge 
})

const titleWork = document.getElementById('titleWork');
titleWork.addEventListener('blur',() =>{
    let span =document.getElementById('errorTitle')
    span.innerText = '';
})

window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }