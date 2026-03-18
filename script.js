// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeSmoothScroll();
    initializeNavigation();
    initializeAnimations();
    initializeContactForm();
});

// ==================== THEME MANAGEMENT ====================
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';

    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('themeToggle').querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ==================== SMOOTH SCROLLING ====================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Close mobile menu
                document.getElementById('navMenu').classList.remove('active');
                document.getElementById('menuToggle').classList.remove('active');
            }
        });
    });
}

// ==================== NAVIGATION ====================
function initializeNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== ANIMATIONS ====================
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Animate skill bars when in view
    const skillsSection = document.querySelector('.skills-section');
    const skillBars = document.querySelectorAll('.progress-fill');

    if (skillsSection && skillBars.length > 0) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    skillBars.forEach(bar => {
                        const progress = bar.style.getPropertyValue('--progress');
                        bar.style.animation = `fillProgress 1.2s ease-out forwards`;
                    });
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        if (skillsSection) {
            skillsObserver.observe(skillsSection);
        }
    }

    // Stagger animation for certification cards
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ==================== CONTACT FORM ====================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[name="name"]').value.trim();
        const email = this.querySelector('input[name="email"]').value.trim();
        const subject = this.querySelector('input[name="subject"]').value.trim();
        const message = this.querySelector('textarea[name="message"]').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showFormStatus('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address', 'error');
            return;
        }

        // Create mailto link
        const mailtoLink = `mailto:adhem5465660195@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        // Open email client
        window.open(mailtoLink);

        // Show success message and reset form
        showFormStatus('Message ready to send! Opening your email client...', 'success');
        this.reset();

        // Reset status after 3 seconds
        setTimeout(() => {
            showFormStatus('', '');
        }, 3000);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormStatus(message, type) {
    const statusEl = document.querySelector('.form-status');
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.className = `form-status ${type}`;
    }
}

// ==================== SCROLL ANIMATIONS ====================
window.addEventListener('scroll', () => {
    updateNavBar();
});

function updateNavBar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
}

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for lazy loading (optional for future images)
function createLazyLoadObserver() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ENHANCED INTERACTIONS ====================
// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate numbers on scroll (optional counter animation)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== ACCESSIBILITY ====================
// Ensure keyboard navigation works properly
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('menuToggle').classList.remove('active');
    }
});

// ==================== PERFORMANCE MONITORING ====================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #00d4ff;
        color: #000;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        font-weight: bold;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Lazy loading for images (if added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .cert-card, .skill-category').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Analytics (optional - uncomment if using)
// window.addEventListener('load', () => {
//     console.log('Portfolio loaded successfully');
// });