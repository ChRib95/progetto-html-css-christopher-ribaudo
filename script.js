// Header scroll
const body = document.body;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset

    if (currentScroll <= 0) {
        body.classList.remove("scroll-up")
    }

    if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up")
        body.classList.add("scroll-down")
    }

    if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down")
        body.classList.add("scroll-up")
    }

    lastScroll = currentScroll;
});

// Active Nav link smooth scroll
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active-nav');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active-nav');
            });
        };
    });
});

// Back to top scroll button
let calcScrollValue = () => {
    let scrollProgress = document.getElementById("progress");
    let progressValue = document.getElementById("progress-value");
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if(pos>100){
        scrollProgress.style.display = "grid";
    }
    else {
        scrollProgress.style.display = "none";
    }
    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#f9b24d ${scrollValue}%, #ffffff ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

// About section tabs
const tabs = document.querySelectorAll(".tab");
const tabBtns = document.querySelectorAll(".tab-btn");

const tab_Nav = function(tabBtnClick){
    tabBtns.forEach((tabBtns) => {
        tabBtns.classList.remove("active");
    });

    tabs.forEach((tab) => {
        tab.classList.remove("active");
    });

    tabBtns[tabBtnClick].classList.add("active");
    tabs[tabBtnClick].classList.add("active");
}

tabBtns.forEach((tabBtns, i) => {
    tabBtns.addEventListener("click", () => {
        tab_Nav(i);
    });
});

// Form contact me
const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function senEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Message: ${mess.value}`;

    Email.send({
        SecureToken: "25d6e135-c1fd-4bd7-bb5b-2d9ac3aaa76e",
        To: 'progettoesempio95@gmail.com',
        From: "progettoesempio95@gmail.com",
        Subject: subject.value,
        Body: bodyMessage
    }).then(
        message => {
            if (message == "OK") {
                Swal.fire({
                    title: "Ottimo!",
                    text: "Messaggio inviato con successo!",
                    icon: "success"
                });
            }
        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-txt.email");

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Inserire un indirizzo e-mail valido";
        }
        else {
            errorTxtEmail.innerText = "L'indirizzo email non può essere vuoto";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !subject.classList.contains("error") && !mess.classList.contains("error")) {
        senEmail();

        form.reset();
        return false;
    }
});

// Header responsive
console.log('Inizio script su projects.html');

const toggleBtn = document.querySelector('.toggle-btn');
const navbar = document.querySelector('header .nav-responsive');

const navLinksResp = document.querySelectorAll('header .nav-responsive ul li a');
console.log('navLinksResp:', navLinksResp);

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navbar.classList.toggle('active')
});

navLinksResp.forEach(link => {
    link.addEventListener('click', () => {
        toggleBtn.classList.remove('active');
        navbar.classList.remove('active');
    });
});

navLinksResp.forEach(link => {
    link.addEventListener('click', () => {
        navLinksResp.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
        toggleBtn.classList.remove('active');
        navbar.classList.remove('active');
        setTimeout(() => {
            link.classList.remove('active');
        }, 1000);
    });
});

function changeColorOnScroll() {
    const fromTop = window.scrollY;

    navLinksResp.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active-scroll');
        } else {
            link.classList.remove('active-scroll');
        }
    });
}

window.addEventListener('scroll', changeColorOnScroll);