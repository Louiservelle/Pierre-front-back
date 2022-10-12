getArtciles();


function getArtciles(){
    fetch ('http://localhost:50/api/pierre')
    .then((data) => data.json())
    .then((data) => {
        let card = document.getElementsByClassName("card-title");
        for(i = 0;i<card.length;i++){
            card[i].innerHTML = data[i].pierre_name
        } 
    })
    .catch(error => alert("Erreur" + error));
}


