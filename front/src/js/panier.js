//params name,img,prix,descrip
function createCard(name,price,descrip){
    let boxpanier = document.getElementById('boxpanier');
    let panier = document.createElement('div')
    panier.id = 'panier'
    panier.style.paddingLeft = '20px'
    panier.style.display ='flex'
    panier.style.flexDirection ='row'
    panier.style.justifyContent = 'space-around'
    panier.style.alignItems = 'center'
    panier.style.border = 'solid 1px black'
    panier.style.width = '844px'
    panier.style.height = '164px'

    let itembox = document.createElement('div');
    itembox.style.display = 'flex'
    itembox.style.flexDirection = 'row-reverse'
    itembox.style.alignItems = 'center';
    itembox.innerText = name
    itembox.style.fontSize = '25px'
    itembox.style.fontFamily = 'Parisienne';


    let image = document.createElement('img');
    image.src ="/front/images/"+name+".jpg";
    image.style.width = '120px'
    image.style.height = '120px'
    image.style.paddingRight = '20px';

    let prix = document.createElement('h2');
    prix.innerHTML = price + "$"
    prix.style.fontSize = '';
    prix.style.fontFamily = 'Parisienne';

    let boxdesc = document.createElement('div');
    let description = document.createElement('p');
    description.innerHTML = descrip
    description.style.fontSize = '25px'
    description.style.fontFamily = 'Parisienne';

    //héritage de l'ancêtre
    boxpanier.appendChild(panier);
    panier.appendChild(itembox);
    itembox.appendChild(image)
    panier.appendChild(boxdesc)
    boxdesc.appendChild(description);
    boxdesc.appendChild(prix);  
}
getCart()
function getCart(){
    let userid = sessionStorage.getItem("id")
    console.log(userid)
    fetch('http://localhost:51/api/cart',{
        method:'POST',
        body:JSON.parse(userid)
    }).then((data) => data.json())
    .then((data) => {
        console.log(data[2].pierre_ID)
        for(i=0;i<data.length;i++){
            GetParameterForCreateCard(data[i].pierre_ID)
        }
    })
}
    



function GetParameterForCreateCard(ID){
    fetch ('http://localhost:51/api/pierre/'+ID)
    .then((data) => data.json())
    .then((data) => {
        createCard(data.pierre_name,data.pierre_price,data.pierre_description)
        console.log(data.pierre_name,data.pierre_price)
    })
}


