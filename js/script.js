// ==========================================
// NAVIGATION & HEADER
// ==========================================

const header = document.getElementById('header');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Header scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Active navigation based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// ANIMATED COUNTERS
// ==========================================

const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
    const triggerBottom = window.innerHeight * 0.8;

    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();

        if (rect.top < triggerBottom && !countersAnimated) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const steps = 60;
            const stepValue = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += stepValue;
                if (current >= target) {
                    counter.textContent = target + (counter.nextElementSibling.textContent.includes('%') ? '' : '+');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, duration / steps);

            countersAnimated = true;
        }
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ==========================================
// SMOOTH SCROLL
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards, product cards, and testimonials
const animatedElements = document.querySelectorAll(
    '.service-card, .product-card, .testimonial-card, .feature-item, .contact-method'
);

animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ==========================================
// CONTACT FORM HANDLING
// ==========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission (in production, this would send to a server)
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;

    setTimeout(() => {
        // Show success message
        showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');

        // Reset form
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// ==========================================
// NEWSLETTER FORM
// ==========================================

const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;
    const submitButton = newsletterForm.querySelector('button');
    const originalText = submitButton.textContent;

    submitButton.textContent = 'Procesando...';
    submitButton.disabled = true;

    setTimeout(() => {
        showNotification('¡Te has suscrito exitosamente al newsletter!', 'success');
        newsletterForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1000);
});

// ==========================================
// PRODUCT BUTTONS
// ==========================================

const productButtons = document.querySelectorAll('.product-card .btn');

productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.closest('.product-card').querySelector('h3').textContent;
        showNotification(`Interesado en ${productName}. Un representante se contactará pronto.`, 'info');
    });
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    return icons[type] || icons.info;
}

// Add notification animations to head
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

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-icon {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .notification-success .notification-icon {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    .notification-info .notification-icon {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
    }

    .notification-message {
        flex: 1;
        color: #2d3748;
    }

    .notification-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #718096;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.3s ease;
    }

    .notification-close:hover {
        color: #2d3748;
    }
`;
document.head.appendChild(style);

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// TECH STACK ANIMATION
// ==========================================

const techItems = document.querySelectorAll('.tech-item');

techItems.forEach((item, index) => {
    item.style.animation = `fadeInUp 0.6s ease ${index * 0.05}s both`;
});

// Add tech stack animation to styles
const techStyle = document.createElement('style');
techStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(techStyle);

// ==========================================
// LAZY LOADING FOR IMAGES (if any added later)
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================

const hero = document.querySelector('.hero');
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// TYPING EFFECT FOR HERO TITLE (Optional Enhancement)
// ==========================================

function addTypingEffect() {
    const gradientText = document.querySelector('.gradient-text');
    if (!gradientText) return;

    const originalText = gradientText.textContent;
    gradientText.textContent = '';
    gradientText.style.borderRight = '2px solid var(--primary)';

    let charIndex = 0;

    function type() {
        if (charIndex < originalText.length) {
            gradientText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            gradientText.style.borderRight = 'none';
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// Uncomment to enable typing effect
// window.addEventListener('load', addTypingEffect);

// ==========================================
// PERFORMANCE OPTIMIZATION
// ==========================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
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

// Apply debouncing to scroll-heavy functions
const debouncedScroll = debounce(() => {
    highlightNavigation();
    animateCounters();
});

window.addEventListener('scroll', debouncedScroll);

// ==========================================
// ACCESSIBILITY ENHANCEMENTS
// ==========================================

// Trap focus in mobile menu when open
navMenu.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;

    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.focus();
    }
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================

console.log('%c🚀 TechNova Website', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cDesarrollado con tecnologías modernas', 'font-size: 14px; color: #718096;');
console.log('%cHTML5 • CSS3 • JavaScript ES6+', 'font-size: 12px; color: #764ba2;');

// ==========================================
// INITIALIZE ON LOAD
// ==========================================

window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Log page load time
    const loadTime = performance.now();
    console.log(`⚡ Página cargada en ${loadTime.toFixed(2)}ms`);
});
