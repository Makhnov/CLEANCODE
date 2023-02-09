const CV = document.getElementById('CVin');
const rotation = document.getElementById('rotationStand');
const teleport = document.getElementById('teleport');
const rotationIcon = document.getElementById('rotationStandIcon');

rotation.addEventListener('change', function() {
        if (this.checked) {
                rotationIcon.classList.add('anim');
        } else {
                rotationIcon.classList.remove('anim');
        }
});

