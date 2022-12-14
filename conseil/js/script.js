let space = " ";
let br = "\n";
let obj;
let editActive = false;

class MembresConseil {
  constructor(id, nom, image, titre, role, description) {
    this.id = id;
    this.nom = nom;
    this.image = image;
    this.titre = titre;
    this.role = role;
    this.description = description;
  }

  toString() {
    return "Id :" + space + this.id + space + "- Nom :" + space + this.nom + space + "- Titre :" + space + this.titre + space + "- Role :" + space + this.role + space + "- Description :" + space + this.description + space + "- url(image) :" + space + this.image;
  }

  getNom() {
    return this.nom;
  }

  getTitre() {
    return this.titre;
  }

  getRole() {
    return this.role;
  }

  getDescription() {
    return this.description;
  }

  getImage() {
    return this.image;
  }

  setNom(info) {
    this.nom = info;
  }

  setTitre(info) {
    this.titre = info;
  }

  setRole(info) {
    this.role = info;
  }

  setDescription(info) {
    this.description = info;
  }

  setImage(info) {
    this.image = info;
  }
}

function resize() {
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
  const mp = document.getElementsByClassName('mainPage').length;
  if (mp > 0) {
    let resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      resize();
    }, 500);
  }
};

async function getBdd(n) {
  //récupéation du json
  const list = await fetch('https://makh.fr/conseil/index2.php');
  //convertion en tableau
  const tabTemp = await list.json();
  obj = tabTemp[n];

  let membre = new MembresConseil(n, obj.nom, obj.img, obj.titre, obj.role, obj.description);

  const h1 = document.getElementsByTagName('h1')[0];
  const h2 = document.getElementsByTagName('h2')[0];
  const h3 = document.getElementsByTagName('h3')[0];
  const para = document.getElementsByTagName('p')[0];
  const img = document.getElementById('imageConseil');
  const text = document.getElementById('inputText');

  console.log(obj);

  let nom = membre.getNom();
  let titre = membre.getTitre();
  let role = membre.getRole();
  let description = membre.getDescription();
  let url = membre.getImage();

  console.log(membre);
  h1.textContent = nom;
  console.log(nom);
  h2.textContent = titre;
  console.log(titre);
  h3.textContent = role;
  console.log(role);
  para.textContent = description;
  console.log(description);
  text.value = description;
  img.style.backgroundImage = "url(\'" + url + "\')";
  console.log(url);
}

function edition() {
  const form = document.getElementsByTagName('form')[0];
  const edit = document.getElementById('edition');
  const logo = document.getElementById('imgDescription');
  const para = document.getElementsByTagName('p')[0];

  editActive = !editActive;

  if (editActive) {
    edit.textContent = "Annuler";
    edit.style.backgroundColor = "rgba(175, 0, 0, 0.25)";
    form.style.clipPath = "inset(0 -10px -10px 0)";
    logo.style.clipPath = "inset(0 48vw 39vh 0)";
  } else {
    edit.textContent = "Editer";
    edit.style.backgroundColor = "rgba(0, 128, 0, 0.25)";
    logo.style.clipPath = "inset(0 0 0 0)";
    form.style.clipPath = "inset(0 52vw 37vh 0)";
  }

}



