async function fetchWorks() {
    return fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
}

async function fetchCategories() {
    return fetch("http://localhost:5678/api/categories")
        .then((response) => response.json())
}

async function deleteWork(id) {
    return fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        
    })
    .then(data => data)
}

async function createWork(body) {
    return fetch ("http://localhost:5678/api/works", {
        method:"POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
            
            
        },
        body: body
    
    })
}