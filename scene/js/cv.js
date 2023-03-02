const CV = document.getElementById('CVin');
const rotation = document.getElementById('rotationStand');
const teleport = document.getElementById('teleport');
const iconRotation = document.getElementById('rotationStandIcon');
const iconCV = document.getElementById('openStandIcon');
const stand = document.getElementById('openStand');

rotation.addEventListener('change', function () {
	//console.log('rotation changed ! Stand status is :' + stand.checked);
	if (!stand.checked) {
		if (rotation.checked) {
			iconRotation.classList.add('anim');
			//console.log('Rotation status is :' + rotation.checked);
		} else {
			iconRotation.classList.remove('anim');
			//console.log('Rotation status is :' + rotation.checked);
		}
	} else {
		if (!rotation.checked) {
			iconRotation.classList.remove('anim');
			//console.log('Rotation status is :' + rotation.checked);
		} else {
			rotation.checked = false;
			iconRotation.classList.remove('anim');
			//console.log('Rotation status is :' + rotation.checked);
		}
	}
});

stand.addEventListener('change', function () {
	//console.log('stand changed ! Stand status is :' + stand.checked);
	if (stand.checked) {
		iconRotation.classList.add('closed');
		//console.log('rotation status is : ' + rotation.checked);
		if (rotation.checked) {
			rotation.checked = false;
			rotation.dispatchEvent(new Event("change"));
		}
	} else {
		iconRotation.classList.remove('closed');
	}
});

function openCV(bool) {
	if (bool) {// FROM USER CLICK
		stand.checked = !stand.checked;
		stand.dispatchEvent(new Event("change"));
		iconCV.classList.toggle('closed');
	} else {// FROM HUD
		stand.checked = true;
		iconCV.classList.remove('closed');
		iconCV.children[0].style.zIndex = "90";
	}
	if (stand.checked && bool) {// CLOSED FROM CLICK
		iconCV.children[0].style.zIndex = "90";
		tempo = false;
	} else {// OPENED FROM CLICK
		iconCV.children[0].style.zIndex = "110";
		tempo = true;
	}
}

function clicCV(bool) {
	clearScene(2);
	openModal(2, bool);
}
