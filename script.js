// Theme Toggle
const themeBtn = document.getElementById('themeBtn');
let isDark = true;

themeBtn.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        document.body.style.background = 'var(--dark)';
        document.body.style.color = 'var(--text-light)';
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.body.style.background = 'var(--light)';
        document.body.style.color = 'var(--text-dark)';
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input, textarea');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const subject = inputs[2].value;
        const message = inputs[3].value;

        const mailtoLink = `mailto:adham.ahmed.cs@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoLink;
        this.reset();
    });
}

console.log('Portfolio loaded! ✨');
