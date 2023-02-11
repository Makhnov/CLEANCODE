const CV = document.getElementById('CVin');
const rotation = document.getElementById('rotationStand');
const teleport = document.getElementById('teleport');
const rotationIcon = document.getElementById('rotationStandIcon');
const iconCV = document.getElementById('openStandIcon');
const stand = document.getElementById('openStand');

rotation.addEventListener('change', function () {
    if (this.checked) {
        rotationIcon.classList.add('anim');
    } else {
        rotationIcon.classList.remove('anim');
    }
});

function openCV(bool) {
    let rotate = rotation.checked;
    stand.checked = !stand.checked;
    if (rotate) {
        rotation.checked = false;
    }
    iconCV.classList.toggle('closed');
    if (stand.checked) {
        iconCV.children[0].style.zIndex = "110";
        if (bool) {// CLIC
            tempo = false;
            console.log(tempo);
        } else {//FROM HUD

        }
    } else {
        iconCV.children[0].style.zIndex = "90";
        if (bool) {// CLIC
            tempo = true;
        }
    }
}