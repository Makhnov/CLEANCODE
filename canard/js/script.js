let bt = document.getElementById('bt');
let tab = ['red', 'green', 'yellow', 'blue'];
let para = document.getElementsByTagName('p');

bt.addEventListener('click', function() {
    let col = Math.trunc(4*Math.random());
    for (i = 0; i < para.length; i++) {
        console.log(para[i].textContent);

        if (para[i].textContent == "si tu gagne tu n'auras pas les canard") {
            para[i].style.color = tab[col];
        }
    }
});

