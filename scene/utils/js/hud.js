const br = '\n';
const space = ' ';
const lorem = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque inventore rem fugiat doloremque. Neque eveniet voluptate sequi incidunt cupiditate fugit autem nihil, blanditiis optio veritatispraesentium quam dolorem officiis! Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque impedit quibusdam vero veritatis distinctio dignissimos cupiditate nisi doloremque eum provident error atque porro, pariatur corporis. Numquam, unde expedita? Eius, laboriosam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores amet cumque minima, ipsum aut atque soluta harum facere nisi dicta odio eius doloribus quo obcaecati officia quia, voluptas exercitationem sequi!'
const textInfosPortfolio = "Bienvenue sur mon portfolio, j'ai commencé la programmation web en septembre 2022 en rejoignant une formation de développeur web avec l'ADRAR de Lourdes.<br>Tous mes sites, quel que soit le(s) langage(s), sont 100% originaux, il m'arrive de chercher l'inspiration à droite à gauche bien évidemment mais je ne copie jamais la moindre ligne de code. En cliquant sur l'icone du bas dans la navigation de droite vous pouvez aller visiter les sites présentés ici et bien d'autres que j'ai pu faire tout au long de ma formation.<br>Je travaille principalement en HTML, SASS, Javascript, PHP et SQL, j'ai aussi commencé la pratique de divers frameworks (Vue, React, Laravel, Symfony, etc.).<br><br>Mon gitHub : <a href='https://github.com/Makhnov/' target='_blank'>Makhnov</a>"
const li = document.querySelectorAll('li.gauche');
const navGauche = document.getElementsByTagName('nav')[0];
const navDroite = document.getElementsByTagName('nav')[1];
const scene = document.getElementById('containerView').children;

const waitingMenu = document.getElementById('waitingMenu');
let vitesse1 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseEntree');
let vitesse2 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseSortie');
let speedIn = parseFloat(vitesse1.replace('s', '')) * 1000;
let speedOut = parseFloat(vitesse2.replace('s', '')) * 1000;
let tempo = false;

const vortex = document.getElementsByClassName('vortex')[0];
const blurBG = document.getElementById('blurBackground');
const urlGIF = "../../../divers/img/loading175s.gif?time=";

const modal = document.getElementById('modal');
const modalBackground = document.getElementById('backgroundModal');
const modalBox = document.getElementById('containerModal');
const modalTitre = document.getElementById('containerModal').children[0];
const modalResume = document.getElementById('containerModal').children[1];
const modalTexte = document.getElementById('containerModal').children[2];

const skills = document.getElementById('COMPETENCES').children;

function loadingGIF() {
    waitingMenu.style.backgroundImage = `url(${urlGIF + new Date().getTime()})`;
}

let menuSpamm;
let resizeSpamm;

let angle = 0;
let decal = 0;
let depth = 50;
let iDeg = 20;
let iTemp = 0;

let tabNav = [false, false, false, false, false];

function refresh() {
    clearScene('all');
    resize();
}

window.onresize = function () {
    clearTimeout(resizeSpamm);
    resizeSpamm = setTimeout(function () {
        resize();
    }, 500);
}

function resize() {

    let width = document.documentElement.clientWidth; // On récupère la largeur de l'écran de l'utilisateur
    // let height = document.documentElement.clientHeight; // On récupère la hauteur de l'écran de l'utilisateur
    let angle = 0;
    let decal = 0;
    let depth = 50;

    console.log('width :' + width);

    if (width < 800) {
        angle = 70;
        decal = 80;
        depth = 70;
        iDeg = 20;
    } else if (width < 1200) {
        angle = 75;
        decal = 100;
        depth = 80;
        iDeg = 15;
    } else if (width < 1600) {
        angle = 78;
        decal = 125;
        depth = 90;
        iDeg = 10;
    } else {
        angle = 80;
        decal = 150;
        depth = 110;
        iDeg = 8;
    }

    document.documentElement.style.setProperty('--menuAngle', iDeg + 'deg');
    //let iDegree = getComputedStyle(document.documentElement).getPropertyValue('--menuAngle');
    //console.log(iDegree);
    document.documentElement.style.setProperty('--menuProfondeur', depth + 'px');
    //let depthBar = getComputedStyle(document.documentElement).getPropertyValue('--menuPronfondeur');
    //console.log(depthBar);

    navGauche.style.transform = "rotateY(" + angle + "deg) translate3d(" + decal + "px, 0, 0)";
    //waitingMenu.style.width = depth + "px";
    //waitingMenu.style.height = depth + "px";//En +
    //waitingMenu.style.transform = "translate3d(0, 0, -" + depth + "px) rotateY(" + -angle + "deg)";
}

for (let i = 0; i < li.length; i++) {
    let iTemp = i;
    li[i].addEventListener('click', function () {
        clearTimeout(menuSpamm);
        menuAsync(iTemp);
    });
}

async function menuAsync(iTemp) {
    // BEFORE
    //console.log("BEFORE :" + iTemp);

    li[iTemp].classList.add("clicked");
    tabNav[iTemp] = true;

    //let menuHeight = waitingMenu.clientWidth;
    //let loadingPosY = (25 * iTemp) + (2 - iTemp) * 1.25;
    //waitingMenu.style.backgroundPositionX = "center";
    //waitingMenu.style.backgroundPositionY = loadingPosY + "%";
    //waitingMenu.style.backgroundSize = menuHeight + "px " + menuHeight + "px";

    for (j = 0; j < li.length; j++) {
        if (li[j].classList.contains("clicked") && j !== iTemp) {
            li[j].classList.remove("clicked");
            tabNav[j] = false;
            closingScene(j);
        }
    }

    // TEMPO
    if (tempo) {
        loadingGIF();
        await delayLi(speedOut);
    } else {
        await delayLi(0);
    }// FIN TEMPO


    // AFTER
    //console.log("AFTER :" + tabNav);
}

function delayLi(int) {
    return new Promise((resolve, reject) => {
        //here our function should be implemented 
        menuSpamm = setTimeout(() => {
            for (j = 0; j < tabNav.length; j++) {
                if (!tabNav[j]) {
                    scene[j].classList.add("hidden");
                    scene[j].classList.remove("anim");
                    clearScene(j);
                } else {
                    scene[j].classList.remove("hidden");
                    scene[j].classList.add("anim");
                    tempo = true;
                }

                for (k = 0; k < tabNav.length; k++) {
                    if (!tabNav[k]) {
                        navDroite.children[0].children[j].children[k].style.visibility = "hidden";
                        navDroite.children[0].children[j].children[k].classList.remove('open');
                    } else {
                        navDroite.children[0].children[j].children[k].style.visibility = "visible";
                        navDroite.children[0].children[j].children[k].classList.add('open');
                    }
                }
            }
            waitingMenu.style.backgroundImage = "none";
            //blurBG.style.display = "none";
            navDroite.style.display = "grid";
            resolve();
            ;
        }, int
        );
    });
}

function closingScene(int) {
    switch (int) {
        case 0://A PROPOS
            break;
        case 1://PORTFOLIO
            openBook(false);
            break;
        case 2:
            openCV(false);
            break;
        case 3://COMPETENCES
            openSkills(false);
            break;
        case 4://CONTACT
            break;
    }
}

function openSkills(bool) {
    let i = 0;
    let animSpeed = (speedOut / 6000).toFixed(1);

    for (let skill of skills) {
        skill.style.animation = "leaveSkills" + space + animSpeed + "s" + space + "linear" + space + animSpeed * i + "s forwards";
        i++;
    }

    setTimeout(function () {
        for (let skill of skills) {
            skill.style.removeProperty("animation");
        }
    }, speedOut);
}

function clearScene(int) {
    if (typeof int === 'number') {
        const boxes = scene[int].querySelectorAll("input[type=checkbox]");
        for (let box of boxes) {
            box.checked = false;
            box.dispatchEvent(new Event("change"));
        }

        const navboxes = navDroite.children[0].children[int].children[int].querySelectorAll("input[type=checkbox]");
        for (let navBox of navboxes) {
            navBox.checked = false;
            navBox.dispatchEvent(new Event("change"));
        }
    } else {
        const boxes = document.querySelectorAll("input[type=checkbox]");
        for (let box of boxes) {
            box.checked = false;
            box.dispatchEvent(new Event("change"));
        }
    }
}

function checkTabNav() {
    for (let i = 0; i < 5; i++) {
        if (tabNav[i]) {
            return i;
        }
    }
}

function openModal(int) {
    switch (int) {
        case 0://A PROPOS
            break;
        case 1://PORTFOLIO
            modal.style.display = "block";
            modalTitre.textContent = "PORTFOLIO";
            modalResume.textContent = "Mes créations depuis septembre 2022";
            modalTexte.innerHTML = textInfosPortfolio;
            break;
        case 2:
            modal.style.display = "block";
            modalBox.style.height = "100vh";
            modalBox.style.width = "calc(7000vh / 99)";
            modalBox.style.top = "0";
            modalBox.style.left = "50%";
            modalBox.style.transform = "translate(-50%, 0)";
            modalBox.style.padding = "0";

            modalTitre.style.display = "none";
            modalResume.style.display = "none";

            modalTexte.style.margin = "0";
            modalTexte.style.height = "100vh";
            modalTexte.style.background = "url('../../../divers/img/docFront.jpg')";
            modalTexte.style.backgroundSize = "contain";
            break;
        case 3://COMPETENCES
            break;
        case 4://CONTACT
            break;
    }
    modalBackground.value = int;
}

function closeModal(e) {
    let int = e.value;
    switch (int) {
        case 0://A PROPOS
            break;
        case 1://PORTFOLIO
            modalTitre.textContent = '';
            modalResume.textContent = '';
            modalTexte.textContent = '';
            break;
        case 2:
            modalBox.style.removeProperty("height");
            modalBox.style.removeProperty("width");
            modalBox.style.removeProperty("top");
            modalBox.style.removeProperty("left");
            modalBox.style.removeProperty("transform");
            modalBox.style.removeProperty("padding");

            modalTitre.style.removeProperty("display");
            modalResume.style.removeProperty("display");

            modalTexte.style.removeProperty("margin");
            modalTexte.style.removeProperty("height");
            modalTexte.style.removeProperty("background");
            modalTexte.style.removeProperty("background-size");

            break;
        case 3://COMPETENCES
            break;
        case 4://CONTACT
            break;
    }
    modal.style.display = "none";
}