const loupe = document.getElementById('loupe');
let zoom = 150;

document.addEventListener('mousemove', function() {
    let mx = event.clientX; 
    let my = event.clientY;

    loupe.style.top = (my - (zoom / 2))+"px";
    loupe.style.left = (mx - (zoom / 2))+"px";
});

window.addEventListener("wheel", event => {
    zoom += (20 * Math.sign(event.deltaY));
    loupe.style.height = zoom+"px";
    loupe.style.width = zoom+"px";
});

