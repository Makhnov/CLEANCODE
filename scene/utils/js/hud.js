const li = document.getElementsByTagName('li');
const nav = document.getElementsByTagName('nav')[0];
const scene = document.getElementById('containerView').children;
let itemp = 0;
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
        console.log('1');
        angle = 65;
        decal = 60;
        depth = '50px';
    } else if (width < 1200) {
        console.log('2');
        angle = 75;
        decal = 150;
        depth = '60px';
    } else if ( width < 1600) {
        console.log('3');
        angle = 80;
        decal = 250;
        depth = '80px';
    } else {
        console.log('4');
        angle = 85;
        decal = 350;
        depth = '100px';
    }


    document.documentElement.style.setProperty('--depthBar', depth);
    nav.style.transform = "rotateY("+angle+"deg) translate3d("+decal+"px, 0, 0)";
    let depz = getComputedStyle(document.documentElement).getPropertyValue('--depthBar');
    console.log(depz);
}

for (let i = 0; i < li.length; i++) {
    let itemp = i;
    li[i].addEventListener('click', function () {
        menuAsync(itemp);
    });
}

async function menuAsync(int){
    // BEFORE
    console.log(li[int].innerText);
    li[int].classList.add("clicked"); 
    tabNav[int] = true;
    console.log(int);
    open(int);
    scene[int].classList.remove("hidden"); 

    for (j = 0; j < li.length; j++) {
        if (li[j].classList.contains("clicked") && j !== int) {
            li[j].classList.remove("clicked"); 
            tabNav[j] = false;
        }
    }
    console.log("BEFORE")

    //IN-BETWEEN
    await delay(int);
    
    // AFTER
    console.log(tabNav);
    console.log("AFTER")
}

function delay(int){
    return new Promise((resolve,reject)=>{
        //here our function should be implemented 
        setTimeout(()=>{
                for (j = 0; j < tabNav.length; j++) {
                    if (!tabNav[j]) {
                        scene[j].classList.add("hidden"); 
                        console.log(scene[j]);
                    }
                }
                resolve();
            ;} , speed2
        );
    });
}

function open(int) {
    switch (int) {
        case 0:
            if (teleport.classList.contains('anim')) {
                teleport.classList.add('denim');
                teleport.classList.remove('anim');
            } 
            rotation.classList.remove('anim');
            console.log('case :'+int);
            break;
        case 1:
            if (teleport.classList.contains('anim')) {
                teleport.classList.add('denim');
                teleport.classList.remove('anim');
            } 
            rotation.classList.remove('anim');
            console.log('case :'+int);
            break;
        case 2:
            if (teleport.classList.contains('denim')) {
                teleport.classList.remove('denim');
            } 
            teleport.classList.add('anim');
            rotation.classList.add('anim');
            console.log('case :'+int);
            break;
        case 3:
            if (teleport.classList.contains('anim')) {
                teleport.classList.add('denim');
                teleport.classList.remove('anim');
            } 
            rotation.classList.remove('anim');
            console.log('case :'+int);
            break;
        case 4:
            if (teleport.classList.contains('anim')) {
                teleport.classList.add('denim');
                teleport.classList.remove('anim');
            } 
            rotation.classList.remove('anim');
            console.log('case :'+int);
            break;
    }
}

