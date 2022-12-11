let br = "\n";
let space = " ";
let timer;
let swap = document.getElementById('switch');
let digits = document.getElementsByClassName('time');
let millis = 0;

for (i = 0; i < digits.length; i++) {
    digits[i].value = 0;
    if (i < 3) {
        digits[i].innerHTML = "00";
    } else {
        digits[i].innerHTML = "000";
    }
}

function pause () {
    clearInterval(timer);
    swap.checked = false;
}

function reset () {
    clearInterval(timer);
    for (i = 0; i < digits.length; i++) {
        digits[i].value = 0;
        if (i < 3) {
            digits[i].innerHTML = "00";
        } else {
            digits[i].innerHTML = "000";
        }
    }
    millis = 0;
    swap.checked = false;
}

function start() {
    timer = setInterval(chrono, 100);
    swap.checked = true;    
}

function chrono() {

    setInterval(function () {

        millis++;
        if (millis > 99) {
            millis = 0;
        }

    }, 1);

    digits[3].value++
    
    if (digits[3].value > 9) {
        
        digits[3].value = 0;
        digits[2].value++

        if (digits[2].value > 59) {

            digits[2].value = 0;
            digits[1].value++;

            if (digits[1].value > 59) {
                
                digits[1].value = 0;
                digits[0]++;
            }
        }
    }

    for (i = 0; i < 3; i++) {

        if (digits[i].value < 10) {
            digits[i].innerHTML = "0"+digits[i].value;
        } else {
            digits[i].innerHTML = digits[i].value;
        }
    }

    if (millis > 9) {
        digits[3].innerHTML = digits[3].value+""+millis;
    } else {
            digits[3].innerHTML = digits[3].value+"0"+millis;
    }
}   

