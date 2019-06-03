import * as vivus from "./vivus.js"

adjustViewport();

window.addEventListener("load", function() {

    const navHandler = navManager();
    activateNavLinks();

    new Vivus('my-pic', {duration: 200, type: 'oneByOne', animTimingFunction: Vivus.EASE, start: 'autostart'}, () => {
        document.querySelector("#my-pic-paths").style.fill = "#000000";
    });
    document.querySelector("#my-pic").classList.add("show-my-pic");

    new Vivus('me-pointing-about-right', {duration: 150, type: 'sync'}, () => {
        document.querySelector("#me-pointing-about-right g").style.fill = "#000000";
    });
    new Vivus('me-pointing-about-left', {duration: 150, type: 'sync'}, () => {
        document.querySelector("#me-pointing-about-left g").style.fill = "#000000";
    });
    new Vivus(`stars-left`, {duration: 50, type: 'oneByOne', animTimingFunction: Vivus.EASE}, () => keepDrawingStars('left'));
    new Vivus(`stars-right`, {duration: 50, type: 'oneByOne', animTimingFunction: Vivus.EASE}, () => keepDrawingStars('right'));
    
    document.querySelector(".welcome-nav-arrow").addEventListener('click', navHandler);
    window.addEventListener('scroll', navHandler);
}, false);

function adjustViewport() {
    if (window.innerHeight < 750) {
        document.querySelector(".welcome-header").style.height = `${window.innerHeight}px`;
    }
}

function navManager() {
    let menuButtonShown = true;
    return function(evt) {
        if (window.scrollY !== 0 && menuButtonShown) {
            menuButtonShown = false;
            hideNav();
        } else if (!menuButtonShown && (evt.type === 'click' || window.scrollY === 0)) {
            menuButtonShown = true;
            showNav();
        }
    }
}

function showNav() {
    const container = document.querySelector(".welcome-nav-arrow-container");
    const links = document.querySelectorAll(".welcome-nav-item");
    container.style.borderColor = "#00000000";
    links.forEach(link => link.style.display = "inline");
    setTimeout(function() {
        container.style.height = "190px";
        links.forEach(link => link.style.opacity = 1);
    }, 150);
}

function hideNav() {
    const container = document.querySelector(".welcome-nav-arrow-container");
    const links = document.querySelectorAll(".welcome-nav-item");
    container.style.height = "60px";
    links.forEach(link => link.style.opacity = 0);
    setTimeout(function() {
        container.style.borderColor = "#000000FF";
        links.forEach(link => link.style.display = "none");
    }, 300);
}

function activateNavLinks() {
    const links = document.querySelectorAll(".welcome-nav-link");
    links.forEach(link => link.addEventListener('click', handleInternalLink));
}

function handleInternalLink(evt) {
    const destination = evt.target.getAttribute("href");
    document.querySelector(destination).scrollIntoView({behavior: "smooth"})
    evt.preventDefault();
}

function keepDrawingStars(dir) {
    const list = document.querySelector(`.stars-container-${dir}`);
    const starsCurr = list.childElementCount;
    const availableSpace = window.innerWidth - 150 - starsCurr * 300;
    if (availableSpace > 0) {
        const newStars = document.querySelector(`#stars-${dir}`).cloneNode(true);
        newStars.id = `stars-${dir}-${availableSpace}`;
        list.appendChild(newStars);
        randomizeStars(newStars);
        new Vivus(`stars-${dir}-${availableSpace}`, {duration: 50, type: 'oneByOne', animTimingFunction: Vivus.EASE}, () => keepDrawingStars(dir));
    }
}

function randomizeStars(stars) {
    const spin = Math.floor(Math.random() * 360);
    const scale = 0.8 + Math.random() * 0.4;
    stars.style.transform = `scale(${scale}) rotate(${spin}deg)`;
}