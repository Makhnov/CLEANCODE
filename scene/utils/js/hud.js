const li = document.querySelectorAll('li.gauche');
const navGauche = document.getElementsByTagName('nav')[0];
const navDroite = document.getElementsByTagName('nav')[1];
const scene = document.getElementById('containerView').children;
const modal = document.getElementById('modal');

const waitingMenu = document.getElementById('waitingMenu');
let vitesse1 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseEntree');
let vitesse2 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseSortie');
let speedIn = parseFloat(vitesse1.replace('s', '')) * 1000;
let speedOut = parseFloat(vitesse2.replace('s', '')) * 1000;
let tempo = false;

const vortex = document.getElementsByClassName('vortex')[0];
const blurBG = document.getElementById('blurBackground');
const urlGIF = "../../../divers/img/loading175s.gif?time=";

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

window.onresize = function () {
    clearTimeout(resizeSpamm);
    resizeSpamm = setTimeout(function () {
        resize();
    }, 500);
};

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
    } else if ( width < 1600) {
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

    document.documentElement.style.setProperty('--menuAngle', iDeg +'deg');
    //let iDegree = getComputedStyle(document.documentElement).getPropertyValue('--menuAngle');
    //console.log(iDegree);
    document.documentElement.style.setProperty('--menuProfondeur', depth +'px');
    //let depthBar = getComputedStyle(document.documentElement).getPropertyValue('--menuPronfondeur');
    //console.log(depthBar);

    navGauche.style.transform = "rotateY("+angle+"deg) translate3d("+decal+"px, 0, 0)";
    waitingMenu.style.width = depth+"px";
    waitingMenu.style.transform = "translate3d(0, 0, -"+depth+"px) rotateY("+-angle+"deg)";
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

    let menuHeight = waitingMenu.clientWidth;
    let loadingPosY = (25 * iTemp) + (2 - iTemp) * 1.25;
    waitingMenu.style.backgroundPositionX = "center";
    waitingMenu.style.backgroundPositionY = loadingPosY+"%";
    waitingMenu.style.backgroundSize = menuHeight+"px "+menuHeight+"px";

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
        console.log('temporisé')
        await delayLi(speedOut);
    } else {
        console.log('non temporisé')
        await delayLi(0);
    }// FIN TEMPO
    
    
    // AFTER
    //console.log("AFTER :" + tabNav);
}

function delayLi(int) {
    return new Promise((resolve,reject)=>{
        //here our function should be implemented 
        menuSpamm = setTimeout(()=>{
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
                        } else {
                            navDroite.children[0].children[j].children[k].style.visibility = "visible";
                        }
                    }
                }
                waitingMenu.style.backgroundImage = "none";
                //blurBG.style.display = "none";
                navDroite.style.display = "grid";
                resolve();
            ;} , int
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
            break;
        case 4://CONTACT
            break;
    }
}

function clearScene(int) {
    const boxes = scene[int].querySelectorAll("input[type=checkbox]");
    for (let box of boxes) {
        box.checked = false;
    }
}

function checkTabNav() {
    for (let i = 0; i < 5; i++) {
        if (tabNav[i]) {
            return i;
        }
    }
}