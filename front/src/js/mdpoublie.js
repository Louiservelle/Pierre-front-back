function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

const mdpoublie = document.querySelector("#mdpoublie");

mdpoublie.addEventListener("submit", e => {
    var test = false
    e.preventDefault();
    var email = document.getElementById("text_login");
    console.log(email.value)
    // Perform your AJAX/Fetch login
    fetch('http://localhost:50/api/oublie',{
        method:'POST',
        body:JSON.stringify({
            email:email.value,
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
            setFormMessage(mdpoublie, "error", "invalide mail(le mail saisie n'existe pas)");
        }else if (test == true){
            console.log(data.name,data.password)
        }
    })
});