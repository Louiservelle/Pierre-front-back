function getArtciles(){
    fetch ('http://localhost:51/api/pierre')
    .then((data) => data.json())
    .then((data) => {
        console.log(data.pierre_name)
        console.log(data.ID);
        let card = document.getElementsByClassName("card-title");
        console.log(card[4])
        gemmes = [1,5,6,7,8,9,10,11]
        for(i = 0;i<card.length;i++){
            card[i].innerHTML = data[gemmes[i]].pierre_name
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
}
function buy(){
    
}
getArtciles();

