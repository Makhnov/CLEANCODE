const li = document.getElementsByTagName('li');
const nav = document.getElementsByTagName('nav')[0];
const scene = document.getElementById('containerView').children;
const waitingMenu = document.getElementById('waitingMenu');
const vortex = document.getElementsByClassName('vortex')[0];
const blurBG = document.getElementById('blurBackground');

const urlGIF = "../../../divers/img/loading3s.gif?time=";
function loadingGIF() {
    waitingMenu.style.backgroundImage = `url(${urlGIF + new Date().getTime()})`;
}

let angle = 0;
let decal = 0;
let depth = 50;
let iDeg = 20;
let iTemp = 0;

tabNav = [false, false, false, false, false];

window.onresize = function () {
    let resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
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
        angle = 65;
        decal = 60;
        depth = 50;
        iDeg = 40;
    } else if (width < 1200) {
        angle = 70;
        decal = 125;
        depth = 60;
        iDeg = 25;
    } else if ( width < 1600) {
        angle = 75;
        decal = 150;
        depth = 80;
        iDeg = 15;
    } else {
        angle = 80;
        decal = 200;
        depth = 100;
        iDeg = 5;
    }

    document.documentElement.style.setProperty('--ignitionDegree', iDeg +'deg');
    document.documentElement.style.setProperty('--depthBar', depth +'px');
    nav.style.transform = "rotateY("+angle+"deg) translate3d("+decal+"px, 0, 0)";
    waitingMenu.style.width = depth+"px";
    waitingMenu.style.transform = "translate3d(0, 0, -"+depth+"px) rotateY("+-angle+"deg)";
    let iDegree = getComputedStyle(document.documentElement).getPropertyValue('--ignitionDegree');
    console.log(iDegree);
    }

for (let i = 0; i < li.length; i++) {
    let iTemp = i;
    li[i].addEventListener('click', function () {
        menuAsync(iTemp);
    });
}

async function menuAsync(iTemp){
    // BEFORE
    li[iTemp].classList.add("clicked");
    tabNav[iTemp] = true;

    for (let l of li) {
        if (l.classList.contains('clicked')) {
            console.log(l);
            l.style.transform    //transform:translate3d(0, 0, 0) rotateY(10deg) translateX(10000px) scale(0);

        }
    }

    let menuHeight = waitingMenu.clientWidth;
    let loadingPosY = (25 * iTemp) + (2 - iTemp) * 1.25;
    waitingMenu.style.backgroundPositionX = "center";
    waitingMenu.style.backgroundPositionY = loadingPosY+"%";
    waitingMenu.style.backgroundSize = menuHeight+"px "+menuHeight+"px";
    loadingGIF();

    //let waitingZone = scene[iTemp]
    for (j = 0; j < li.length; j++) {
        if (li[j].classList.contains("clicked") && j !== iTemp) {
            li[j].classList.remove("clicked"); 
            tabNav[j] = false;
            document.getElementById("exit"+j).checked = true;
            console.log(document.getElementById("exit"+j));
        }
    }
    console.log("BEFORE")

    //IN-BETWEEN
    await delay(iTemp);
    
    // AFTER
    console.log(tabNav);
    console.log("AFTER")
}

function delay(){
    return new Promise((resolve,reject)=>{
        //here our function should be implemented 
        setTimeout(()=>{
                for (j = 0; j < tabNav.length; j++) {
                    if (!tabNav[j]) {
                        scene[j].classList.add("hidden");
                    } else {
                        document.getElementById("exit"+j).checked = false;
                        scene[j].classList.remove("hidden");
                        scene[j].classList.add("anim"); 
                    }
                }
                waitingMenu.style.backgroundImage = "none";
                blurBG.style.display = "none";
                resolve();
            ;} , speed2
        );
    });
}

function open(iTemp) {
    switch (iTemp) {
        case 0:

            break;
        case 1:

            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
    }
}

