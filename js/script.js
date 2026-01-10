// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('#mainbody section, .sidebar-section').forEach(el => {
    el.classList.add('reveal-element');
    revealObserver.observe(el);
});

// ===== Typing Effect for Name =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--accent-color)';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 500);
        }
    }
    type();
}

const nameElement = document.getElementById('name');
if (nameElement) {
    const originalName = nameElement.textContent;
    typeWriter(nameElement, originalName, 80);
}

// ===== Smooth Hover Effect for Sidebar Links =====
document.querySelectorAll('.link-list a').forEach(link => {
    link.addEventListener('mouseenter', function () {
        this.style.transform = 'translateX(5px)';
    });
    link.addEventListener('mouseleave', function () {
        this.style.transform = 'translateX(0)';
    });
});

// ===== Skill Items Animation =====
document.querySelectorAll('#skill li').forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.classList.add('skill-animate');
});

// ===== Active Section Highlight (for scrolling) =====
const sections = document.querySelectorAll('#mainbody section');
const sidebarSections = document.querySelectorAll('.sidebar-section');

function highlightActiveSection() {
    let scrollPos = window.scrollY + 200;
    let activeFound = false;

    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50;

    if (isAtBottom && sections.length > 0) {
        sections.forEach(section => section.classList.remove('active-section'));
        sections[sections.length - 1].classList.add('active-section');
        return;
    }

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;

        if (scrollPos >= top && scrollPos < top + height) {
            section.classList.add('active-section');
            activeFound = true;
        } else {
            section.classList.remove('active-section');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===== Profile Image Glow Effect =====
const profileImg = document.querySelector('.pfp');
if (profileImg) {
    profileImg.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 4px 20px rgba(135, 206, 235, 0.6)';
    });
    profileImg.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'var(--shadow)';
    });
}

// ===== Copy Email to Clipboard =====
const emailElement = document.querySelector('.contact-item .text');
if (emailElement && emailElement.textContent.includes('@')) {
    emailElement.style.cursor = 'pointer';
    emailElement.title = 'Click to copy email';

    emailElement.addEventListener('click', function () {
        navigator.clipboard.writeText(this.textContent.trim()).then(() => {
            const originalText = this.textContent;
            this.textContent = 'Copied!';
            this.style.color = '#4ade80';
            setTimeout(() => {
                this.textContent = originalText;
                this.style.color = '';
            }, 1500);
        });
    });
}

// ===== Parallax Effect for Sidebar =====
const sidebar = document.getElementById('sidebar');
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.scrollY;
        sidebar.style.backgroundPosition = `center ${scrolled * 0.3}px`;
    }
});

// ===== Console Easter Egg =====
console.log('%c👋 Hello there, curious developer!', 'font-size: 20px; color: skyblue;');
console.log('%cThis resume was crafted with HTML, CSS & JS.', 'font-size: 14px; color: #888;');
console.log('%c📧 Contact: vatsalpandya2007@gmail.com', 'font-size: 12px; color: #aaa;');
