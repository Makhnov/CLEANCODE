let space = " ";
let br = "\n";

// document.getElementById('jeu').children[8].children[6].style.display = "none";

let ballX = 15;
let dirX = 1;
let ballY = 50;
let dirY = 1;
let move = false;
let tabBrik = [7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7];
let bing;
let infos = document.getElementById('INFOS');
let posX = 0;
let posY = 0;
let rayonX = 0;
let rayonY = 0;
let x1;
let x2;
let y1;
let y2;

function rayon() {
    rayonX = 600 / window.innerWidth;
    rayonY = 600 / window.innerHeight;
}

function start() {

    move = true;

    setTimeout(function () {
        ballX += dirX * 0.3;
        ballY += dirY * 0.4;

        document.getElementById("ball").style.transform = "translate(" + ballX + "vw, " + ballY + "vh)";

        posX = Math.round((window.innerWidth / 100) * ballX);
        posY = Math.round((window.innerHeight / 100) * ballY);

        rayon();

        infos.children[0].innerHTML = "Taille de la fenêtre :" + space + window.innerWidth + space + "*" + space + window.innerHeight + br;
        infos.children[1].innerHTML = "position de la balle en Pixels : " + space + "x :" + space + posX + ", y :" + space + posY;
        infos.children[2].innerHTML = "position de la balle en Viewport :" + space + "x :" + space + ballX + ", y :" + space + ballY;
        infos.children[3].innerHTML = "RayonX, rayonY :" + space + rayonX + "," + space + rayonY;
        infos.children[4].innerHTML = "Infos à venir :";


        if ((ballX + (2 * rayonX)) > 80 || ballX < 0) {
            dirX *= -1;
        }

        if ((ballY + (2 * rayonY)) > 80) {
            dirY *= -1;
        } else if (ballY < 0) {
            bing = (Math.trunc(((ballX - 10) / 4)));
            console.log(tabBrik[bing]);
            tabBrik[bing]--;
            console.log(tabBrik + " " + tabBrik[bing]);
            dirY *= -1;
            switch (Math.trunc(((ballX - 10) / 4))) {
                case bing:
                    document.getElementById('jeu').children[bing].children[tabBrik[bing]].style.display = "none";
                    break;
            }
        }

        for (i = 0; i < 20; i++) {
            for (j = 0; j < 7; j++) {

                x1 = ((4 * i) - (2 * rayonX));
                x2 = (4 + (4 * i));
                y1 = ((5 * j) - (2 * rayonY));
                y2 = (5 + (5 * j));

                if ((ballX > x1) && 
                    (ballX < x2) && 
                    (ballY > y1) && 
                    (ballY < y2) ) {

                        document.getElementById('jeu').children[i].children[j].style.display = "none";

                        if ((dirX == 1) && 
                            (dirY == 1)) {
                                
                            if ((ballX - x1) > (ballY - y1)) {
                                dirY *= -1;
                            } else {
                                dirX *= -1;
                            }
                                
                        } else if ((dirX == 1) && 
                        (dirY == -1)) {

                            if ((ballX - x1) > (ballY - y2)) {
                                dirY *= -1;
                            } else {
                                dirX *= -1;
                            }

                        } else if ((dirX == -1) && 
                        (dirY == 1)) {

                            if ((ballX - x2) > (ballY - y1)) {
                                dirY *= -1;
                            } else {
                                dirX *= -1;
                            }

                        } else {

                            if ((ballX - x2) > (ballY - y2)) {
                                dirY *= -1;
                            } else {
                                dirX *= -1;
                            }
                        }
                }
            }
        }

        if (move) {
            start();
        }


    }, 5)
}

function stop() {
    move = false;
}

