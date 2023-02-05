const CVin = document.getElementById('CVin');
const CVout = document.getElementById('CVout');
const rotation = document.getElementById('rotation');
const tp = document.getElementById('teleport');
const doc = document.getElementById('zoneCV');

let longueur = getComputedStyle(document.documentElement).getPropertyValue('--longueur');
let vitesse1 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseIn');
let vitesse2 = getComputedStyle(document.documentElement).getPropertyValue('--vitesseOut');

let size = parseInt(longueur.replace('vh', ''));
let speed1 = parseInt(vitesse1.replace('s', '')) * 1000;
let speed2 = parseInt(vitesse2.replace('s', '')) * 1000;

console.log(size);
console.log(speed1);
console.log(speed2);

CVin.addEventListener('change', function() {
        if (this.checked) {
                this.style.display = "none";

                setTimeout(() => {
                        CVout.style.display = "block";
                        rotation.style.display = "block";
                }, speed1)
        }
});

CVout.addEventListener('change', function() {
        if (this.checked) {
                this.style.display = "none";
                rotation.style.display = "none";

                setTimeout(() => {
                        this.checked = false;
                        rotation.checked = false;
                        CVin.style.display = "block";
                        CVin.checked = false;
                }, speed2)
        }       
});

