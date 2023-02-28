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

const canvas = document.getElementById('portrait');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 325;

const particulesTrue = [];
let particulesFalse = null;
const width = 80;
const height = 65;
const partSize = 5;

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
		particulesFalse = [...particulesTrue];
		console.log(particulesFalse);

		apropos.addEventListener('change', event => {
			const classIn = event.target.classList.contains('anim');
			if (classIn) {
				Nico();
			}
		});
	})
	.catch(error => console.error(error));

let animationStarted;
let completedAnimations;
let isSwap = true;
let firstCreate = true;

function Nico() {
	if (firstCreate) {
		console.log('create');
		animationStarted = false;
		completedAnimations = 0;
		console.log(initialisationNico(particulesTrue));
	} else {
		if (isSwap && !animationStarted) {
			console.log('destroy');
			animationStarted = false;
			completedAnimations = 0;
			isSwap = !isSwap;
			swapNico(particulesFalse);
		} else if (!animationStarted) {
			console.log('create');
			animationStarted = false;
			completedAnimations = 0;
			isSwap = !isSwap;
			swapNico(particulesTrue);
		} else {
			console.log('TOUDOUBIJOU!');
		}
	}
	firstCreate = false;
}

function initialisationNico(tabObj) {
	function drawFrame() {
		// Effacer le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

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
		const duration = Math.floor(Math.random() * (speedIn - 500)) + 500;
		const targetX = particule.x;
		const targetY = particule.y;
		const signX = PoF();
		particule.startX = Math.floor((.5 + (Math.random() * 1 * signX)) * width) * partSize;
		const signY = PoF();
		particule.startY = Math.floor((.5 + (Math.random() * 1 * signY)) * height) * partSize;

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
		// Effacer le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);

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
		const duration = Math.floor(Math.random() * (speedIn - 500)) + 500;
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

	// Initialiser les positions initiales des particules dans particulesFalse
	particulesFalse.forEach((particuleFalse, index) => {
		particuleFalse.startX = particulesTrue[index].x;
		particuleFalse.startY = particulesTrue[index].y;
	});

	animationStarted = true;

	// Démarrer l'animation en demandant la première frame
	drawFrame();
}

function drawParticules(ctx, tabObj) {
	tabObj.forEach(particule => {
		particule.draw(ctx);
	});
}