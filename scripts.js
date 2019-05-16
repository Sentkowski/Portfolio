window.addEventListener("load", function() {
    createDesktopSkillsObserver();
    createDesktopProjectsObserver();
    createMobileSkillsObserver();
    createMobileProjectsObserver();
}, false);

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
            observer.unobserve(document.querySelector(".skills-section"))
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
            observer.unobserve(document.querySelector(".projects-section"))
        }
    });
}

function createMobileSkillsObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const observer = new IntersectionObserver(handleMobileSkillsIntersect, options);
    document.querySelectorAll(".skill-list-item").forEach(skill => {observer.observe(skill)});
}

function handleMobileSkillsIntersect(entries, observer) {
    entries.forEach(entry => {
        const heading = entry.target.querySelector(".skill-list-heading-container");
        newTransform = 60 - (entry.intersectionRatio * 60);
        heading.style.transform = `translateX(-${newTransform}px)`
    });
}

function createMobileProjectsObserver() {
    const options = {
        root: null,
        rootMargin: "0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    };

    const observer = new IntersectionObserver(handleMobileProjectsIntersect, options);
    document.querySelectorAll(".project").forEach(project => {observer.observe(project)});
}

function handleMobileProjectsIntersect(entries, observer) {
    entries.forEach(entry => {
        const heading = entry.target.querySelector(".project-name-container");
        newTransform = 110 - (entry.intersectionRatio * 110);
        heading.style.transform = `translateX(${newTransform}px)`
    });
}

