document.addEventListener('DOMContentLoaded', () => {

    // --- Typewriter Effect ---
    const texts = ["Web Developer", "UI/UX Designer", "Problem Solver"];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';
    const typewriterElement = document.getElementById('typewriter');

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        typewriterElement.textContent = letter;
        
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); // pause at end of word
        } else {
            setTimeout(type, 100);
        }
    }
    // Start typing
    setTimeout(type, 1000);


    // --- Sticky Navbar & Active Link Update ---
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        // Sticky nav
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when clicking a link
    navLinks.forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }));

    // --- Form Submission Integration ---
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.7';

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/monishc8925@gmail.com", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
                btn.style.opacity = '1';
                btn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            })
            .catch(error => {
                btn.innerHTML = 'Error! <i class="fas fa-times"></i>';
                btn.style.opacity = '1';
                btn.style.background = '#ef4444';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            });
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Copyright Year ---
    document.getElementById('year').textContent = new Date().getFullYear();
});

function sendmail() {
    let params ={
    name : document.getElementById("name").value,
    email : document.getElementById("email").value,
    subject : document.getElementById("subject").value,
    message : document.getElementById("message").value 
    }

    emailjs.send("service_a2ee058", "template_uxjj99p", params).then(alert("Message Sent Successfully!"))
}