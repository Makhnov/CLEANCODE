const space = ' ';
const header = document.getElementsByTagName('nav')[0];
const articles = document.getElementsByTagName('article');
const racine = document.documentElement;

let previousScroll = 0;

//linear-gradient(to right, var(--main-color), whitesmoke)

window.addEventListener('scroll', function () {
    let scrolling = window.pageYOffset;
    //console.log('scroll :' + space + scrolling);
    console.log('Width :' + space + racine.clientWidth);

    if (scrolling === 0) {
        header.classList.remove('scrolled');
        header.style.background = "transparent";

    } else if (scrolling > previousScroll) {
        //header.style.height = '75px';
        header.classList.add('scrolled');
        header.style.background = "linear-gradient(to right, var(--main-color) 20%, var(--sub-color))";

    } else {
        //header.style.height = '125px';
        header.classList.add('scrolled');
        header.style.background = "linear-gradient(to right, var(--main-color) 20%, var(--sub-color))";
    }

    if (scrolling === 0) {
        header.style.boxShadow = "none";
    } else if (scrolling < 700) {
        header.style.boxShadow = "0px 4px 8px 0px var(--main-color)";
    } else {
        header.style.boxShadow = "0px 4px 8px 0px var(--sub-color)";//rgb(100, 100, 100)";
    }

    if (scrolling > 300) {
        articles[1].classList.add('scrolled');
    } else {
        articles[1].classList.remove('scrolled');
    }

    previousScroll = scrolling;
});

