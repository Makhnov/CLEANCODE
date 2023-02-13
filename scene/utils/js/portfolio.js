const nextP = document.getElementById('nextPage');
const prevP = document.getElementById('previousPage');
const pageD = document.getElementById('pageD');
const pageG = document.getElementById('pageG');
const livre = document.getElementById('livre');
const readBook = document.getElementById('readBook');
const iconBook = document.getElementById('openBook');

const vitessePage = getComputedStyle(document.documentElement).getPropertyValue('--vitessePage');
const speedPage = parseFloat(vitessePage.replace('s', '')) * 1000;

let pageSpamm = true;

function openBook(bool) {
    if (pageSpamm) {
        readBook.checked = !readBook.checked;
        iconBook.classList.toggle('closed');
        if (readBook.checked) {
            iconBook.children[0].style.zIndex = "110";
            if (bool) {// CLIC FERMETURE
                tempo = false;
            } else {//FROM HUD
                document.documentElement.style.setProperty('--zoomLivre', '-200px');
            }
        } else {
            iconBook.children[0].style.zIndex = "90";
            if (bool) {// CLIC OUVERTURE
                tempo = true;
            }
        }
    }
}

function pageSuivante(e) {
    let zInd = window.getComputedStyle(livre).getPropertyValue("z-index");
    if (pageSpamm && zInd > 20) {
        pageSpamm = false;
        pageD.classList.add('anim');
        pageAsync(e)
    }
}

function pagePrecedente(e) {
    let zInd = window.getComputedStyle(livre).getPropertyValue("z-index");
    if (pageSpamm && zInd > 20) {
        pageSpamm = false;
        pageG.classList.add('anim');
        pageAsync(e)
    }
}

async function pageAsync(e) {
    // BEFORE
    //console.log("BEFORE :");

    //IN-BETWEEN
    await delayPage(e);

    // AFTER
    pageD.classList.remove('anim');
    pageG.classList.remove('anim');
    pageSpamm = true;
}

function delayPage(e) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(e);
            ;
        }, speedPage
        );
    });
}

function zoomLivre() {
    document.documentElement.style.setProperty('--zoomLivre', '200px');
    document.documentElement.style.setProperty('--inclinaisonLivre', '0deg');
    document.documentElement.style.setProperty('--justifyLivre', '-5vw');
    document.documentElement.style.setProperty('--alignLivre', '0vh');
    document.documentElement.style.setProperty('--rotationLivre', '0deg');
}

function dezoomLivre() {
    document.documentElement.style.setProperty('--zoomLivre', '-300px');
    document.documentElement.style.setProperty('--inclinaisonLivre', '-8deg');
    document.documentElement.style.setProperty('--justifyLivre', '0vw');
    document.documentElement.style.setProperty('--alignLivre', '-7.5vh');
    document.documentElement.style.setProperty('--rotationLivre', '35deg');
}

function variables() {
    let zoom = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zoomLivre').replace('px', ''));
    let angle = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--inclinaisonLivre').replace('deg', ''));
    let posX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--positionLivre').replace('vw', ''));

    console.log('zoom : ' + zoom);
    console.log('angle : ' + angle);
    console.log('posX : ' + posX);
}

function portfolioInfos() {
    openModal(1);
}

function portfolioPlus() {
    window.open("https://makh.fr/", "_blank");
}   
