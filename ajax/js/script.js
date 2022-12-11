let closed = false;
let button = document.getElementsByTagName('button')[0];
let presTemp;
let tab = [];
let scene = document.getElementById('tableau');

class Presidents {
    constructor(number, president, birth_year, death_year, took_office, left_office, party) {
        this.number = number;
        this.president = president;
        this.birth_year = birth_year;
        this.death_year = death_year;
        this.took_office = took_office;
        this.left_office = left_office;
        this.party = party;
    }
}

function clic() {
    closed = !closed;
    if (closed) {
        button.style.clipPath = "Circle(25px at 0 0)";
        button.style.top = "0";
        button.style.left = "0";
        button.style.filter = "brightness(2)";
        button.style.transform = "translate(0)";

        scene.style.display = "grid";
        download();
    } else {
        button.style.clipPath = "Circle(100%)";
        button.style.top = "50%";
        button.style.left = "50%";
        button.style.transform = "translate(-50%, -50%)";
        button.style.filter = "brightness(1)";

        scene.style.display = "none";
    }
}

async function requete() {
    return new Promise((resolve, reject) => {
        let requete = new XMLHttpRequest();
        requete.open("GET", 'https://makh.fr/files/presidents.json');
        requete.responseType = "json";
        requete.send();
        requete.onload = function () {
            if (requete.status != 200) {
                reject(new Error("Error uploading file"));
            } else {                
                resolve(requete.response);
            }
        }
    });
}

async function download () {
    await requete().then(pres => {
        objets(pres);
    }).catch(() =>{
        console.log("Echecs");
        clic();
    });
}

function objets(pres) {

    for (i = 0; i < pres.length; i++) {
        presTemp = new Presidents(pres[i].number, pres[i].president, pres[i].birth_year, pres[i].death_year, pres[i].took_office, pres[i].left_office, pres[i].party);
        tab.push(presTemp);
    }

    return tableau(tab);
}

function tableau(tab) {
    console.log(tab);
    for (i = 2; i < 9; i++) {
        let div = document.createElement('div');
        div.classList.add('col');
        div.classList.add('col'+i);
        div.style.gridRow = "2";
        div.style.gridColumn = i;
        scene.appendChild(div);
        console.log(i);
    }
}

document.addEventListener("keypress", function(press) {
    if (press.key === "Enter") {
        test();
    }
});

function test() {

}



