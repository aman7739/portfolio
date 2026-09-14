/* Toggle Icon Navbar  */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); 
    navbar.classList.toggle('active');
};

/*  Scroll Sections Active Link  */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    
    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove toggle icon and navbar when scroll
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/*  Read More Button Toggle Logic  */
const readMoreBtn = document.getElementById('readMoreBtn');
const moreInfoDiv = document.querySelector('.about-more-info');

if(readMoreBtn) {
    readMoreBtn.addEventListener('click', function() {
        moreInfoDiv.classList.toggle('active');

        if (moreInfoDiv.classList.contains('active')) {
            readMoreBtn.innerText = 'Read Less';
        } else {
            readMoreBtn.innerText = 'Read More';
        }
    });
}

/*  Dark/Light Mode Toggle  */
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const body = document.body;

function handleThemeToggle() {
    body.classList.toggle('light-mode');
    const isLight = body.classList.contains('light-mode');
    
    // Update desktop icon
    if (themeToggle) {
        if (isLight) {
            themeToggle.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeToggle.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Update mobile icon & label
    if (mobileThemeToggle) {
        const mobIcon = mobileThemeToggle.querySelector('i');
        const mobText = mobileThemeToggle.querySelector('.mobile-toggle-text');
        if (isLight) {
            if (mobIcon) mobIcon.classList.replace('fa-moon', 'fa-sun');
            if (mobText) mobText.textContent = 'Light Mode';
        } else {
            if (mobIcon) mobIcon.classList.replace('fa-sun', 'fa-moon');
            if (mobText) mobText.textContent = 'Dark Mode';
        }
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', handleThemeToggle);
}
if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', handleThemeToggle);
}

/*  Typing Animation  */
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['Full-Stack Developer', 'AI/ML & Cloud Explorer', 'Open Source Contributor'],
        typeSpeed: 100,
        backSpeed: 60,
        backDelay: 1000,
        loop: true
    });
}

/*  Timeline Animation  */
const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

items.forEach((item) => observer.observe(item));

const EMAILJS_PUBLIC_KEY  = 'Bj3B6P6hJ4nGvqOwx';
const EMAILJS_SERVICE_ID  = 'service_bmr6hzw';
const EMAILJS_TEMPLATE_ID = 'template_x6thgog';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

document.getElementById('submit').addEventListener('click', function () {
    const name    = document.getElementById('name').value.trim();
    const email   = document.getElementById('email').value.trim();
    const msg     = document.getElementById('msg').value.trim();
    const status  = document.getElementById('form-status');
    const btnText = document.getElementById('btn-text');

    // Validation
    if (!name || !email || !msg) {
        showStatus('⚠️ Please fill in all fields!', '#f59e0b');
        return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showStatus('⚠️ Please enter a valid email address.', '#f59e0b');
        return;
    }

    // Loading state
    btnText.textContent = 'Sending...';
    document.getElementById('submit').disabled = true;

    // If EmailJS keys are not set yet, simulate success
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        setTimeout(() => {
            showStatus('✅ Message sent! (Configure EmailJS keys in main.js to enable real sending)', '#10b981');
            resetForm();
        }, 1000);
        return;
    }

    // Send via EmailJS using sendForm (native form serialization)
    const form = document.getElementById('contact-form');

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then((response) => {
            console.log('EmailJS SUCCESS:', response.status, response.text);
            showStatus('✅ Message sent successfully! I\'ll get back to you soon.', '#10b981');
            resetForm();
        })
        .catch((error) => {
            console.error('EmailJS error:', error);
            const detail = error && error.text ? ` (${error.text})` : '';
            showStatus('❌ ' + (error && error.text ? error.text : 'Something went wrong') + '. Please email me directly at amankr7739@gmail.com', '#ef4444');
            btnText.textContent = 'Send Message';
            document.getElementById('submit').disabled = false;
        });
});

function showStatus(message, color) {
    const status = document.getElementById('form-status');
    status.textContent = message;
    status.style.color = color;
    status.style.display = 'block';
}

function resetForm() {
    document.getElementById('name').value  = '';
    document.getElementById('email').value = '';
    document.getElementById('msg').value   = '';
    document.getElementById('btn-text').textContent = 'Send Message';
    document.getElementById('submit').disabled = false;
}

/*  3D Tilt Effect on Cards  */
function init3DTilt() {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cards = document.querySelectorAll('.portfolio-box, .cert-card');

    cards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.08s ease-out, box-shadow 0.3s ease, border-color 0.3s ease';
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease, border-color 0.3s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            setTimeout(() => {
                if (!card.matches(':hover')) {
                    card.style.transform = '';
                    card.style.transition = '';
                }
            }, 500);
        });
    });
}
init3DTilt();