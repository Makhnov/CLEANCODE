const nextP = document.getElementById('nextPage');
const prevP = document.getElementById('previousPage');
const pageD = document.getElementById('pageD');
const pageG = document.getElementById('pageG');
const livre = document.getElementById('livre');
const readBook = document.getElementById('readBook');
const iconBook = document.getElementById('openBook');

const speedPage = 1700;

let pageSpamm = true;

function openBook(bool) {
    if (pageSpamm) {
        readBook.checked = !readBook.checked;
        iconBook.classList.toggle('closed');
        if (readBook.checked) {
            iconBook.children[0].style.zIndex = "110";
            if (bool) {// CLIC
                tempo = false;
            } else {//FROM HUD
                document.documentElement.style.setProperty('--zoomLivre', '-200px');
            }
        } else {
            iconBook.children[0].style.zIndex = "90";
            if (bool) {// CLIC
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
    let zoom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--zoomLivre').replace('px', ''));
    console.log(zoom);
    if (zoom <= 250) {
        zoom += 50;
        document.documentElement.style.setProperty('--zoomLivre', zoom + 'px');
    } else {
        window.alert("Zoom maximal atteint !");
    }
}

function dezoomLivre() {
    let zoom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--zoomLivre').replace('px', ''));
    console.log(zoom);
    if (zoom >= -800) {
        zoom -= 50;
        document.documentElement.style.setProperty('--zoomLivre', zoom + 'px');
    } else {
        window.alert("Zoom minimal atteint !");
    }
}

function portfolioInfos() {
    modal.style.display = "block";
}

function portfolioInfosOut() {
    modal.style.display = "none";
}

function portfolioPlus() {
    window.open("https://makh.fr/", "_blank");
}   
