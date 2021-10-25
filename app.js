// Jeu du pendu 
var body = document.getElementsByTagName('body')[0];
console.log(body);
const container = document.getElementsByClassName('container')[0];
console.log(container);
const inputBox = document.getElementById('inputBox');
console.log(inputBox);
const input = document.getElementById('text');
const tabLetterHTML = document.getElementById('lettre-saisie');
console.log(tabLetterHTML);
const afficherMot = document.getElementById('motAfficher');
console.log(afficherMot);
const imageAfficher = document.getElementById('imageAfficher');
console.log(imageAfficher);


// Afficher image par default
    var img = document.createElement('img');
    img.src = './Ressources/pendu-defaut.png';
    img.alt = 'pendu-par-defaut';
    img.id = 'img-afficher';
    imageAfficher.appendChild(img);

var badLetter = 0;
// Générer un mot à trouver 
var mot = "bonjour"
// mot = randomWord;

var tabLettre = [];


function play(){
    listener();
    motAfficher();
};
play();

// recuperer la valeur de linput 
function listener (){
    inputBox.addEventListener('submit', (e) => {
        e.preventDefault();
        var valeurInput = input.value;
        console.log(valeurInput);
        if(valeurInput < 0 || valeurInput > 1) return;
        checkLettre(valeurInput);
        ajoutLettre(valeurInput);
        input.value = "";
    });
};
function checkLettre(lettre){
    // checker si la valeur reçu est incluse dans ma chaîne de caractère (le mot a trouver)    
    if(mot.includes(lettre)){
        console.log("je suis la");
        goodLetter(lettre);
        
    }
    else{
        console.log("je ne fais pas parti du mot");
        badLetter++;
        changeImage(badLetter);
    }
};
function goodLetter(lettre){
    let lettreDiv = document.getElementsByClassName('lettre-Div');
    for(let i=0; i<mot.length; i++){
        if(mot[i]==lettre){
            lettreDiv[i].style.visibility = "visible";
        }
    }
}
//Stocker la lettre qui à été saisie
function ajoutLettre(lettre){
    if(tabLettre.includes(lettre)){
        input.setAttribute("placeholder", "Lettre déjà saisie !");
        return; 
    }
    else{
        tabLettre.push(lettre);
        console.log(tabLettre);
        tabLetterHTML.innerHTML += " "+lettre+" ";
    }
};
function motAfficher(){
    let tabMot = [];
    for (let i=0; i<mot.length; i++){
        let piece = mot.substring(i,i+1);
        tabMot.push(piece);
        console.log(tabMot);
        let lettreDiv = document.createElement('div');
        lettreDiv.className = ('lettre-Div');
        afficherMot.appendChild(lettreDiv);
        lettreDiv.innerHTML = piece;
        lettreDiv.style.visibility = "hidden";
    }
}
function changeImage(badLetter){
    let img = document.getElementById('img-afficher');
    if(badLetter <= 4){
        img.setAttribute("src", "./Ressources/pendu-"+badLetter+".png");
    }
    else{
        looseGame();
        
    }
}
function looseGame(){
    inputBox.style.visibility = 'hidden';
    var btnRejouer = document.createElement('button');
    btnRejouer.id = 'RejouerBtn';
    btnRejouer.innerHTML = "Rejouer ?";
    container.insertBefore(btnRejouer,container.childNodes[2]);
    console.log(container);  
    // btnRejouer.addEventListener
    btnRejouer.addEventListener('click', function(){
        rejouer();
    })
}
function rejouer(){
    play();
}