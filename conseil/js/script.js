// let zoom = 1;

// function zoomIn() {
//   zoom += 0.1;
//   document.getElementById("scene").style.transform =
//     "translate(-50%, -50%) scale(" + zoom + ")";
// }

// function zoomOut() {
//   zoom -= 0.1;
//   document.getElementById("scene").style.transform =
//     "translate(-50%, -50%) scale(" + zoom + ")";
// }

// function zoomInit() {
//   if (innerWidth / innerHeight < 1.25) {
//     let largeur = window.innerWidth / 2560;
//     let hauteur = (window.innerWidth * (9 / 16)) / 1440;
//     document.getElementById("scene").style.transform =
//       "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
//     zoom = hauteur;
//   } else if (innerWidth / innerHeight > 2.5) {
//     let largeur = (window.innerHeight * (16 / 9)) / 2560;
//     let hauteur = window.innerHeight / 1440;
//     document.getElementById("scene").style.transform =
//       "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
//     zoom = largeur;
//   } else {
//     let largeur = window.innerWidth / 2560;
//     let hauteur = window.innerHeight / 1440;
//     document.getElementById("scene").style.transform =
//       "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
//     zoom = largeur;
//   }
// }

let ResizeTimer;

function test() {
  if (innerWidth / innerHeight < 1.25) {
    let largeur = window.innerWidth / 2560;
    let hauteur = (window.innerWidth * (9 / 16)) / 1440;
    document.getElementById("scene").style.transform =
      "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
  } else if (innerWidth / innerHeight > 2.5) {
    let largeur = (window.innerHeight * (16 / 9)) / 2560;
    let hauteur = window.innerHeight / 1440;
    document.getElementById("scene").style.transform =
      "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
  } else {
    let largeur = window.innerWidth / 2560;
    let hauteur = window.innerHeight / 1440;
    document.getElementById("scene").style.transform =
      "translate(-50%, -50%) scale(" + largeur + ", " + hauteur + ")";
  }
}

window.onresize = function () {
  clearTimeout(ResizeTimer);
  ResizeTimer = setTimeout(function () {
    test();
  }, 500);
};

/*
async function requete() {
  return new Promise((resolve, reject) => {
      let requete = new XMLHttpRequest();
      requete.open("GET", '../test.php');
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
  await requete().then(membres => {
      tableau(membres);
  }).catch(() =>{
      console.log("Echecs");
  });
}

function tableau(membres) {

  for (i = 0; i < membres.length; i++) {
      membresTemp = new MembresConseil(membresTemp[i].id, membresTemp[i].nom, membresTemp[i].image, membresTemp[i].titre, membresTemp[i].role, membresTemp[i].description);
      tab.push(membresTemp);
  }

  return console.log(tableau(tab));
}
*/

let tab = [];
let membresTemp;

class MembresConseil {
    constructor(id, nom, image, titre, role, description) {
        this.id = id;
        this.nom = nom;
        this.image = image;
        this.titre = titre; 
        this.role = role;
        this.description = description;
    }
}

let data = document.getElementById('data').textContent;
console.Log(data);

