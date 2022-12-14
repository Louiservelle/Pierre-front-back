pierrre = getArtciles();
const cherche = document.querySelector("#cherche");
cherche.addEventListener("input", e => {
    e.preventDefault();
    for(t=0;t<pierrre.length;t++){
        var cart = document.getElementById(pierrre[t])
        cart.classList.remove("hidden")
    }
    var email = document.getElementById("cher");
    var comparelettre = true
    console.log(email.value)
    console.log(pierrre)
    for(i=0;i<pierrre.length;i++){git 
        comparelettre = true
        console.log(email.value)
        for(z=0;z<email.value.length;z++){
            if(email.value[z] !=pierrre[i][z]){
                comparelettre = false
            }
        }
        if (!comparelettre){
            var cart = document.getElementById(pierrre[i])
            cart.classList.add("hidden")
        }
    }
    
    // Perform your AJAX/Fetch login
});


function getArtciles(){
    let oui = []
    fetch ('http://localhost:51/api/pierre')
    .then((data) => data.json())
    .then((data) => {
        //console.log(data.pierre_name)
        //console.log(data.ID);
        let card = document.getElementsByClassName("card-title");
        //console.log(card[4])
        for(i = 0;i<card.length;i++){
            card[i].innerHTML = data[i].pierre_name
            oui.push(data[i].pierre_name)
        } 
    })
    /*
    .then(data => {
        let card = document.getElementsByClassName('card-title');
        card.value = data.Pierre_name
        console.log(data.Pierre_name)
    })
    */
    .catch(error => alert("Erreur" + error));
    return oui
}
