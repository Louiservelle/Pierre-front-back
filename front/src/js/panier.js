//params name,img,prix,descrip
function createCard(){
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
    itembox.innerText ='proudit'
    itembox.style.fontSize = '25px'
    itembox.style.fontFamily = 'Parisienne';


    let image = document.createElement('img');
    image.src ="/front/images/rubis.jpg";
    image.style.width = '120px'
    image.style.height = '120px'
    image.style.paddingRight = '20px';

    let prix = document.createElement('h2');
    prix.innerHTML = '30 £'
    prix.style.fontSize = '';
    prix.style.fontFamily = 'Parisienne';

    let boxdesc = document.createElement('div');
    let description = document.createElement('p');
    description.innerHTML = 'Ruby Rouhe rare'
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
