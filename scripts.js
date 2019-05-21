window.addEventListener("load", function() {
    adjustViewport();

    const navHandler = navManager();
    activateNavLinks();

    createDesktopSkillsObserver();
    createDesktopProjectsObserver();

    if (!window.matchMedia("(min-width: 650px)").matches) {
        createMobileSkillsObserver();
        createMobileProjectsObserver()
    }

    createAboutImagesObserver();
    document.querySelector(".welcome-nav-arrow").addEventListener('click', navHandler);
    window.addEventListener('scroll', navHandler);
}, false);

function adjustViewport() {
    console.log(window.innerHeight)
    if (window.innerHeight < 750) {
        console.log(window.innerHeight)
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

function createDesktopSkillsObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.4]
    };

    const observer = new IntersectionObserver(handleDesktopSkillsIntersect, options);
    observer.observe(document.querySelector(".skills-section"));
}

function handleDesktopSkillsIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.35) {
            document.querySelector(".skills-covering-rect-one").style.transform = "translateX(100%) scaleX(0.5)";
            document.querySelector(".skills-covering-rect-two").style.transform = "translateX(-100%) scaleX(0.5)";
            setTimeout(function() {
                document.querySelector(".skills-covering-rect-one").style.transform = "translateX(100%) scaleX(0.5) scaleY(2.1)";
                document.querySelector(".skills-covering-rect-two").style.transform = "translateX(-100%) scaleX(0.5) scaleY(2.1)";
            }, 300);
            observer.unobserve(entry.target);
        }
    });
}

function createDesktopProjectsObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1]
    };

    const observer = new IntersectionObserver(handleDesktopProjectsIntersect, options);
    observer.observe(document.querySelector(".projects-section"));
}

function handleDesktopProjectsIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.1) {
            document.querySelector(".projects-covering-rect-one").style.transform = "translateY(100%)";
            document.querySelector(".projects-covering-rect-two").style.transform = "translateY(-100%)";
            setTimeout(function() {
                document.querySelector(".projects-covering-rect-one").style.transform = "translateY(100%) scaleX(1.5)";
                document.querySelector(".projects-covering-rect-two").style.transform = "translateY(-100%) scaleX(1.5)";
            }, 300);
            observer.unobserve(entry.target);
        }
    });
}

function createMobileSkillsObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0.1, 0.2]
    };

    const observer = new IntersectionObserver(handleMobileSkillsIntersect, options);
    document.querySelectorAll(".skill-list-item").forEach(skill => {observer.observe(skill)});
}

function handleMobileSkillsIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0.15) {
            const heading = entry.target.querySelector(".skill-list-heading-container");
            heading.style.transform = `translateX(0px)`
            observer.unobserve(entry.target);
        }
    });
}

function createMobileProjectsObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0.1, 0.2]
    };

    const observer = new IntersectionObserver(handleMobileProjectsIntersect, options);
    document.querySelectorAll(".project").forEach(project => {observer.observe(project)});
}

function handleMobileProjectsIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0.15) {
            const heading = entry.target.querySelector(".project-name-container");
            heading.style.transform = `translateX(0px)`
            observer.unobserve(entry.target);
        }
    });
}

function createAboutImagesObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4]
    };

    const observer = new IntersectionObserver(handleAboutIntersect, options);
    observer.observe(document.querySelector(".about-section"));
}

function handleAboutIntersect(entries, observer) {
    entries.forEach(entry => {
        if (entry.intersectionRatio >= 0.2) {
            document.querySelector(".about-image-list").style.display = "block";
            if (window.matchMedia("(min-width: 1000px)").matches) {
                document.querySelector(".about-image-list-second").style.display = "block";
            }
            observer.unobserve(entry.target);
        }
    });
}
