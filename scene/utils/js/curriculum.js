const CV = document.getElementById('CVin');
const rotation = document.getElementById('rotation');
const teleport = document.getElementById('teleport');

let vitesse1 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseIn');
let vitesse2 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseOut');

let speed1 = parseInt(vitesse1.replace('s', '')) * 1000;
let speed2 = parseInt(vitesse2.replace('s', '')) * 1000;

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

