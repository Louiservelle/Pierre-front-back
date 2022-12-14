getArtciles();
function reqListener(){
    console.log(this.reponseText);
}
let accountt = document.getElementById("compte");
let logoutt = document.getElementById("logout")
let nom = document.getElementById("nomUtilisateur");
let utilisateur = sessionStorage.getItem("name")
let panier = document.getElementById('panier')
console.log(utilisateur)
if (utilisateur.length>0){
    nom.innerHTML = utilisateur
    nom.style.padding ='20px'
    console.log(accountt);
    console.log(logoutt); 
    accountt.classList.add("hidden");
    logoutt.classList.add("hidden");
    logoutt.classList.remove("hidden");
    panier.classList.remove('hidden')
}

function deco(){
    sessionStorage.clear();
    accountt.classList.remove("hidden");
    logoutt.classList.add('hidden');
    nom.classList.add('hidden');
    panier.classList.add('hidden')
    nom.innerHTML = ""
}

function getArtciles(){
    fetch ('http://localhost:51/api/pierre')
    .then((data) => data.json())
    .then((data) => {
        let card = document.getElementsByClassName("card-title");
        for(i = 0;i<card.length;i++){
            card[i].innerHTML = data[i].pierre_name
        } 
    })
    .catch(error => alert("Erreur" + error));
}
