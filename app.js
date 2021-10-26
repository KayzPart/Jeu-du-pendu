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
var mot = ["Libre","Charmant","Champion","Sardaigne","Soleil","Lune","Montagne","Solidaire","Coquelicot","Aventurier","Labyrinthe","Quadriceps","Maharadjah","Rhododendron","Montgolfière","Abracadabra","Chlorophylle","Qualification","Métamorphose","Baccalauréat","Narrateur","Cabriolet","Printemps","Dangereux","Toujours","Scorpion","Gangster","Oxygène","Lionne","Thym","Rhum"];

var randomWord = mot[(Math.random() * mot.length) | 0];

console.log(randomWord);
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
        checkCaract(valeurInput);
        ajoutLettre(valeurInput);
        input.value = "";
    });
};

function checkCaract(letterToTest){
    let letterVerif = /^[A-Za-z]+$/;
    if(letterToTest == "" || letterToTest == " " || !letterToTest.match(letterVerif)){
        // quand il a rentré autre chose qu'une lettre
        input.setAttribute("placeholder", "Veuillez saisir une minuscule");
        return;
    }
    else{
        // quand il a saisie une lettre
        checkLettre(letterToTest);
    }

}

function checkLettre(lettre){
    // checker si la valeur reçu est incluse dans ma chaîne de caractère (le mot a trouver)    
    if(randomWord.includes(lettre.toLowerCase()) || randomWord.includes(lettre.toUpperCase())){
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
    
    for(let i=0; i<randomWord.length; i++){

        if(randomWord[i] == lettre.toLowerCase() || randomWord[i] == lettre.toUpperCase()){
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
    for (let i=0; i<randomWord.length; i++){
        let piece = randomWord.substring(i,i+1);
        tabMot.push(piece);
        let lettreDiv = document.createElement('div');
        lettreDiv.className = ('lettre-Div');
        afficherMot.appendChild(lettreDiv);
        lettreDiv.innerHTML = piece;
        lettreDiv.style.visibility = "hidden";
    }
}
function changeImage(badLetter){
    let img = document.getElementById('img-afficher');
    if(badLetter <= 8){
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
    btnRejouer.addEventListener('click', function(){
        replay();
    })
}
function replay(){
    location.reload();
}