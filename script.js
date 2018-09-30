var isTablet;
var pos = 0;
var topScroll = 0;
const logoSize = 34;
const tabletWidth = 870;
const logoNode = document.getElementById('logo');
const menuNode = document.getElementById('menu-container');
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector("#menu ul");
const fastContactIcons = document.querySelectorAll("#fast-contact .blocks");
const fastContactText = document.querySelectorAll("#fast-contact .box");
const fastContactInfo = document.getElementById("fast-contact-info");
const submitBtn = document.getElementById('submit-button');
const currentDate = new Date();

function windowWidth() {
    return window.innerWidth;
}

// Menu height toggle when scrolling
function getTopDistance() {
    var distance = window.pageYOffset || document.documentElement.scrollTop
    if (distance > topScroll) {
        logoNode.classList.add('logo-scrolled');
    } else {
        logoNode.classList.remove('logo-scrolled');
    }
};

window.addEventListener("scroll", getTopDistance);

// Toggle menu when mobile or tablet;
menuIcon.addEventListener("click", toggleMenu);

function toggleMenu() {
    menuList.classList.toggle("open-menu");
}

// On load Events - /if windows is scrolled/ - /if Mobile or tablet/
document.addEventListener('DOMContentLoaded', function() {
    getTopDistance();
    if (windowWidth() <= tabletWidth) {
        isTablet = true;
        firstTimeContactMessage(pos);
    }
});

//On resize events - /close mobile menu/ - /close fast contact mobile menu/
window.addEventListener("resize", function() {
    onFullScreen();
    if (windowWidth() > tabletWidth && isTablet) {
        firstTimeContactMessage(pos);
        isTablet = false;
    }
    if (windowWidth() <= tabletWidth && !isTablet) {
        firstTimeContactMessage(pos);
        isTablet = true;
    }
});

function onFullScreen() {
    if (menuList.classList.contains("open-menu") && (windowWidth() >= tabletWidth)) {
        menuList.classList.remove("open-menu");
    }
}

//Set default selected message when loading page for the firtTime;
function firstTimeContactMessage(idx) {
    fastContactIcons[idx].classList.toggle("selected-Icon-FS");
    fastContactInfo.innerHTML = fastContactText[idx].innerHTML;
}

//Fast contact menu action 
fastContactIcons.forEach(function(element, index) {
    element.addEventListener('click', function () {
        if (windowWidth() <= tabletWidth) {
            fastContactIcons.forEach(function(el) {
                el.classList.remove('selected-Icon-FS');
            })
            firstTimeContactMessage(index);
            pos = index;
        }
    })
});

//Send Mail
submitBtn.addEventListener('click', sentForm);

function sentForm(event) {
    event.preventDefault();

    var userName = document.getElementById('name').value;
    var userEmail = document.getElementById('email-address').value;
    var userSubject = "From LauraSputenService.com";
    var userMessage = document.getElementById('message').value;

    var params = ("name="+userName)+("&subject="+userSubject)+("&email="+userEmail)+("&message="+userMessage);

    var formRequest = new XMLHttpRequest();
    formRequest.open('POST', 'contactForm.php', true);
    formRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    formRequest.onreadystatechange = function() {//Call a function when the state changes.
        if(formRequest.readyState == XMLHttpRequest.DONE && formRequest.status == 200) {
            console.log(this.responseText, 'ready');
        }
    }

    formRequest.send(params);
}

//Update trademark year
document.getElementById("current-year").textContent = ", " + currentDate.getFullYear();