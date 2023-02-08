const nextP = document.getElementById('nextPage');
const prevP = document.getElementById('previousPage');
const pageD = document.getElementById('pageD');
const pageG = document.getElementById('pageG');
const livre = document.getElementById('livre');
const readBook = document.getElementById('readBook');
const iconBook = document.getElementById('openBook');
const speedPage = 2600;

let pageSpamm = true;

function openBook(e) {
    readBook.checked = !readBook.checked;
    let str = window.getComputedStyle(e).getPropertyValue('background');
    let url1 = str.slice(0 ,str.search(/\)/)+1);
    let url2 = (url1 === 'url("../../../divers/img/inputBook2.png")' ? 'url("../../../divers/img/inputBook1.png")' : 'url("../../../divers/img/inputBook2.png")'); 
    e.style.backgroundImage = url2;
}

function pageSuivante(e) {
    if (pageSpamm) {
        pageSpamm = false;
        pageD.classList.add('anim');
        pageAsync(e)
    }
;
}

function pagePrecedente(e) {
    console.log(e);
}

async function pageAsync(e) {
    // BEFORE
    console.log("BEFORE :");

    //IN-BETWEEN
    await delayPage(e);
    
    // AFTER
    pageD.classList.remove('anim');
    pageSpamm = true;
}

function delayPage(e) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(e);
            ;} , speedPage
        );
    });
}