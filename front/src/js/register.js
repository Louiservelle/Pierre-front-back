function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        var test = false
        e.preventDefault();
        var text = document.getElementById("text_login");
        var pass = document.getElementById("pass_login");
        console.log(text.value,pass.value)
        // Perform your AJAX/Fetch login
        fetch('http://localhost:50/api/login',{
            method:'POST',
            body:JSON.stringify({
                email:text.value,
                password:pass.value
            })
        }).then((data) => data.json())
        .then((data) => {
            console.log(data.name)
            console.log(data)
            if (data.ID>0){
                test = true
            }
            console.log(test)
            if(test == false){
                setFormMessage(loginForm, "error", "Invalide username/password combination");
            }else if (test == true){
                sessionStorage.setItem("name",data.name)
                document.location.href="http://127.0.0.1:5500/front/index.html";
            }
        })
    });
    createAccountForm.addEventListener("submit",e=>{
        e.preventDefault();
        var name = document.getElementById("signupUsername");
        var email = document.getElementById("email_incription");
        var pass = document.getElementById("pass_incription");
        console.log(name.value)
        console.log(pass.value)
        console.log(email.value)
        // Perform your AJAX/Fetch login
        fetch('http://localhost:50/api/register',{
            method:'POST',
            body:JSON.stringify({
                Name : name.value,
                Email:email.value,
                Password:pass.value
            })
        })
    })

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 2) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
