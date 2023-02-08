const CV = document.getElementById('CVin');
const rotation = document.getElementById('rotation');
const teleport = document.getElementById('teleport');
const checkBook = document.getElementById('readBook');
const iconBook = document.getElementById('openBook');

let vitesse1 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseIn');
let vitesse2 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseOut');

let speed1 = parseInt(vitesse1.replace('s', '')) * 1000;
let speed2 = parseInt(vitesse2.replace('s', '')) * 1000;

function openBook(e) {
        checkBook.checked = !checkBook.checked;
        let str = window.getComputedStyle(e).getPropertyValue('background')
        let url1 = str.slice(0 ,str.search(/\)/)+1);
        let url2 = (url1 === 'url("../../../divers/img/inputBook1.png")' ? 'url("../../../divers/img/inputBook2.png")' : 'url("../../../divers/img/inputBook1.png")'); 
        e.style.backgroundImage = url2;
}

function toggleBackgroundImage(element) {
        
        element.style.backgroundImage = newUrl;
      }

      
/*
CV.addEventListener('change', function() {
        if (this.checked) {
                setTimeout(() => {
                        rotation.style.display = "block";
                }, speed1)
        } else {
                rotation.style.display = "none";
                setTimeout(() => {
                        rotation.checked = false;
                }, speed2)
        }
});*/

