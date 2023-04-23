

function loginForm() {
    var emailValue = document.getElementById("e-mail").value;
    var passwordValue = document.getElementById("password").value;
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            
        },
        body: JSON.stringify({email: emailValue, password: passwordValue})
        
    })
        .then((response) => { 
            if (response.status != 200) {
                return response.status;
            };
            return response.json();
        })
            
        .then((data) => {
            if (data == 401) {
                const errorPassword = document.createElement("span");
                const errorTextNode = document.createTextNode("wrong e-mail or password");
                errorPassword.appendChild(errorTextNode);
                document.getElementById("errorContainer").appendChild(errorPassword);
            }
            else {
                localStorage.setItem("token", data.token);
                location.href = 'index.html';
            }
        });
}

// headers: {
//    "authorization":"Bearer " + localStorage.getItem("token");
// }