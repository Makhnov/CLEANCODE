const cadre = document.getElementById('aboutPortrait');
const presentation = document.getElementById('aboutTexte');
const portrait = document.getElementById('portrait');


class Particule {
	constructor(x, y, size, color, index) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.index = index;
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
}

const iconPixel = document.getElementById('pixelize');
const ctx = portrait.getContext('2d');
portrait.width = 350;
portrait.height = 318.75;

const particulesTrue = [];
let particulesFalse = null;
const width = 80;
const height = 65;
const partSize = 5;

let animationStarted;
let completedAnimations;
let isSwap = true;
let firstCreate = true;
let listener = true;
let isZoomed = false;

fetch('../../files/nicoPixel.csv')
	.then(response => response.text())
	.then(csv => {
		const colors = csv.split('\n').map(ligne => ligne.split(',').map(Number)).flat();

		for (let y = 0; y < height * 4; y += 4) {
			for (let x = 0; x < width * 4; x += 4) {
				const index = y * width + x;
				const opa = Math.round(colors[index + 3] / 255 * 1000) / 1000;
				const color = `rgba(${colors[index]},${colors[index + 1]},${colors[index + 2]},${opa})`;
				const particule = new Particule((x / 4) * partSize, (y / 4) * partSize, partSize, color, index);
				particulesTrue.push(particule);
			}
		}

		particulesTrue.sort((a, b) => a.index - b.index);
		//console.log(particulesFalse);
	})
	.catch(error => console.error(error));

apropos.addEventListener('change', event => {
	const classIn = event.target.classList.contains('anim');
	if (classIn) {
		particulesFalse = [...particulesTrue];
		tempo = false;
		listener = true;
		openPixel(false);
	}
});

function drawParticules(ctx, tabObj) {
	tabObj.forEach(particule => {
		particule.draw(ctx);
	});
}

function initialisationNico(tabObj) {
	function drawFrame() {
		// Effacer le portrait
		ctx.clearRect(0, 0, portrait.width, portrait.height);

		// Redessiner chaque particule à sa nouvelle position
		drawParticules(ctx, tabObj);

		// Vérifier si toutes les animations sont terminées
		if (completedAnimations === tabObj.length) {
			animationStarted = false;
		} else {
			// Demander une nouvelle frame
			requestAnimationFrame(drawFrame);
		}
	}

	tabObj.forEach((particule) => {
		const duration = Math.floor(Math.random() * speedIn);
		const targetX = particule.x;
		const targetY = particule.y;
		particule.startX = Math.floor(Math.random() * width * partSize);
		particule.startY = Math.floor(Math.random() * height * partSize);

		let startTime = null;

		function moveParticule(timestamp, startX, startY) {
			if (!startTime) startTime = timestamp;
			const progress = timestamp - startTime;

			if (progress < duration) {
				const deltaX = targetX - startX;
				const deltaY = targetY - startY;
				const easeProgress = 1 - Math.cos((progress / duration) * (Math.PI / 2));
				particule.x = startX + deltaX * easeProgress;
				particule.y = startY + deltaY * easeProgress;

				requestAnimationFrame((t) => moveParticule(t, startX, startY));
			} else {
				particule.x = targetX;
				particule.y = targetY;
				completedAnimations++;
			}
		}

		requestAnimationFrame((t) => moveParticule(t, particule.startX, particule.startY));
	});

	animationStarted = true;

	// Démarrer l'animation en demandant la première frame
	drawFrame();

	// Retourner le tableau de particules avec les positions de départ générées aléatoirement
	return particulesTrue;
}

function swapNico(tabObj) {
	function drawFrame() {
		// Effacer le portrait
		ctx.clearRect(0, 0, portrait.width, portrait.height);

		// Redessiner chaque particule à sa nouvelle position
		drawParticules(ctx, tabObj);

		// Vérifier si toutes les animations sont terminées
		if (completedAnimations === tabObj.length) {
			animationStarted = false;
		} else {
			// Demander une nouvelle frame
			requestAnimationFrame(drawFrame);
		}
	}

	if (tabObj !== null) {
		tabObj.forEach((particule) => {
			const duration = Math.floor(Math.random() * speedOut);
			const targetX = particule.startX;
			const targetY = particule.startY;
			const startX = particule.x;
			const startY = particule.y;

			let startTime = null;

			function moveParticule(timestamp) {
				if (!startTime) startTime = timestamp;
				const progress = timestamp - startTime;

				if (progress < duration) {
					const deltaX = targetX - startX;
					const deltaY = targetY - startY;
					const easeProgress = 1 - Math.cos((progress / duration) * (Math.PI / 2));
					particule.x = startX + deltaX * easeProgress;
					particule.y = startY + deltaY * easeProgress;
					requestAnimationFrame(moveParticule);

				} else {
					particule.x = targetX;
					particule.y = targetY;
					completedAnimations++;
				}
			}

			requestAnimationFrame(moveParticule);
		});
	}


	// Initialiser les positions initiales des particules dans particulesFalse
	if (particulesFalse !== null) {
		particulesFalse.forEach((particuleFalse, index) => {
			particuleFalse.startX = particulesTrue[index].x;
			particuleFalse.startY = particulesTrue[index].y;
		});
	}
	animationStarted = true;

	// Démarrer l'animation en demandant la première frame
	drawFrame();
}

function openPixel(bool) {
	/*
	if (!isZoomed) {
		portrait.style.opacity = '1';
		setTimeout(() => {
			portrait.style.removeProperty("opacity");
		}, speedIn)
	}
	*/
	if (bool) {// FROM USER CLICK
		if (isSwap && !animationStarted) {// CLOSED FROM CLICK
			//console.log('destroy');
			animationStarted = false;
			completedAnimations = 0;
			isSwap = !isSwap;
			iconPixel.classList.add('closed');
			iconPixel.children[0].style.zIndex = "90";
			tempo = false;
			swapNico(particulesFalse);
		} else if (!animationStarted) {// OPENED FROM CLICK
			//console.log('create');
			animationStarted = false;
			completedAnimations = 0;
			isSwap = !isSwap;
			iconPixel.classList.remove('closed');
			iconPixel.children[0].style.zIndex = "110";
			tempo = true;
			swapNico(particulesTrue);
		} else {
			//console.log('TOUDOUBIJOU!');
		}
	} else {//FROM HUD
		if (firstCreate) {// FIRST TIME FROM HUD
			//console.log('FIRST create');
			tempo = true;
			animationStarted = false;
			completedAnimations = 0;
			initialisationNico(particulesTrue);
		} else if (tempo && !animationStarted) {// FROM HUD PORTRAIT IS OPEN
			//console.log('HUD destroy');
			iconPixel.classList.add('closed');
			iconPixel.children[0].style.zIndex = "90";
			animationStarted = false;
			completedAnimations = 0;
			isSwap = !isSwap;
			swapNico(particulesFalse);
		} else if (!animationStarted) {// FROM HUD PORTRAIT IS CLOSE
			if (listener) {// PORTRAIT OPENED FROM LISTENER (HUD IN)
				//console.log('LISTENER create');
				animationStarted = false;
				completedAnimations = 0;
				isSwap = !isSwap;
				if (iconPixel.classList.contains('closed')) {
					swapNico(particulesTrue);
				} else {
					isSwap = !isSwap;
				}
				tempo = true;
				iconPixel.classList.remove('closed');
				iconPixel.children[0].style.zIndex = "110";
			} else {// PORTRAIT CLOSE FROM HUD (HUD OUT)
				//console.log('HUD LEAVE');
				animationStarted = false;
				completedAnimations = 0;
			}
		} else {
			//console.log('TOUDOUBIJOU!');
		}
	}
	firstCreate = false;
}

function aproposInfos() {
	openModal(0, tempo);
}

function zoomPixel() {
	portrait.style.clipPath = "polygon(50% 0%,100% 0%,100% 100%,50% 100%,0% 100%,0% 0%)";
	portrait.style.height = "78vh";
	portrait.style.width = "65vw";
	portrait.style.transform = "none";
	portrait.style.top = "0";
	portrait.style.left = "calc(-100% - 20vw)";
	portrait.style.pointerEvents = "none";
	cadre.style.pointerEvents = "none";
	presentation.style.pointerEvents = "none";
	isZoomed = true;
}

function dezoomPixel() {
	portrait.style.clipPath = "polygon(49.5% 0%,87% 25%,87% 75%,49.5% 100%,12% 75%,12% 25%)";
	portrait.style.height = "100%";
	portrait.style.width = "100%";
	portrait.style.removeProperty('left');
	portrait.style.removeProperty('top');
	portrait.style.removeProperty('transform');
	portrait.style.pointerEvents = "auto";
	cadre.style.pointerEvents = "auto";
	presentation.style.pointerEvents = "auto";
	isZoomed = false;
}