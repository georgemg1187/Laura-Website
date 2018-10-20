var isTablet;
var pos = 0;
var topScroll = 0;
var selectedButton = 0;
// const logoSize = 34;
const tabletWidth = 870;
const logoNode = document.getElementById('logo');
const menuNode = document.getElementById('menu-container');
const menuIcon = document.querySelector(".menu-icon");
const menuList = document.querySelector("#menu ul");
const menuButtons = document.querySelectorAll("#menu ul a");
const fastContactIcons = document.querySelectorAll("#fast-contact .blocks");
const fastContactText = document.querySelectorAll("#fast-contact .box");
const fastContactInfo = document.getElementById("fast-contact-info");
const submitBtn = document.getElementById('submit-button');
const footerConainter = document.getElementById("kontakt");
const usserMessage = document.getElementById("user-message");
const theForm = document.getElementById("theForm");
const logo = document.getElementById("logo");
const menuItems = Array.prototype.slice.call(document.querySelectorAll("#menu li"));
const sections = ["zuhause", "dienstleistungen", "warum-wir", "kontakt"];
const currentDate = new Date();


menuItems.forEach(function(element, index) {
    element.addEventListener("click", function() {
        event.preventDefault();
        window.scrollTo({
            top: document.getElementById(sections[index]).offsetTop,
            behavior: "smooth"
        })
    })
})

menuButtons[0].classList.add('activeButton');

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

// Close menu on mobile when clicking on menu buttons + active button collor;
menuButtons.forEach(function (element, index) {
    element.addEventListener('click', function () {
        if (windowWidth() <= tabletWidth) {
            menuList.classList.remove("open-menu");
        }
        menuButtons[selectedButton].classList.remove('activeButton');
        element.classList.add('activeButton');
        selectedButton = index;
    })
})

// On load Events - /if windows is scrolled/ - /if Mobile or tablet/
document.addEventListener('DOMContentLoaded', function () {
    getTopDistance();
    if (windowWidth() <= tabletWidth) {
        isTablet = true;
        firstTimeContactMessage(pos);
    }
});

//On resize events - /close mobile menu/ - /close fast contact mobile menu/
window.addEventListener("resize", function () {
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
fastContactIcons.forEach(function (element, index) {
    element.addEventListener('click', function () {
        if (windowWidth() <= tabletWidth) {
            fastContactIcons.forEach(function (el) {
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

    var params = ("name=" + userName) + ("&subject=" + userSubject) + ("&email=" + userEmail) + ("&message=" + userMessage);

    var formRequest = new XMLHttpRequest();
    formRequest.open('POST', 'contactForm.php', true);
    formRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    formRequest.onreadystatechange = function () {//Call a function when the state changes.
        if (formRequest.readyState == XMLHttpRequest.DONE && formRequest.status == 200) {
            // console.log(this.responseText, 'ready');
            onSubmitComplete();
        }
    }

    formRequest.send(params);
}

function onSubmitComplete() {
    usserMessage.style.display = "none";
    theForm.style.display = "none";

    var endMessageContainer = document.createElement("div");
    endMessageContainer.classList.add("end-message");
    var endMessage = "<div>" + "Vielen Dank." + "<br>" + "Wir kommen bald auf Sie zurück" + "</div>"
    endMessageContainer.innerHTML = endMessage;

    footerConainter.appendChild(endMessageContainer);
}

// Logo on click

logo.addEventListener("click", logoAction);
function logoAction() {
    window.scrollTo({top: 0, behavior: "smooth"});
}


//Update trademark year
document.getElementById("current-year").textContent = ", " + currentDate.getFullYear();