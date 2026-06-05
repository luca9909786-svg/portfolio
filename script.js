// ===========================
// ANIMATED CIRCUIT BACKGROUND
// ===========================

const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Circuit particles
const particles = [];
const circuitNodes = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
        ctx.fillStyle = `rgba(56, 189, 248, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class CircuitNode {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 2;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulsePhase += 0.02;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Keep in bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(34, 211, 238, ${this.opacity * pulse})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.strokeStyle = `rgba(56, 189, 248, ${this.opacity * pulse * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.stroke();
    }
}

// Initialize particles and nodes
for (let i = 0; i < 50; i++) {
    particles.push(new Particle());
}

for (let i = 0; i < 15; i++) {
    circuitNodes.push(new CircuitNode());
}

// Draw circuit lines
function drawCircuitLines() {
    for (let i = 0; i < circuitNodes.length; i++) {
        for (let j = i + 1; j < circuitNodes.length; j++) {
            const dx = circuitNodes[i].x - circuitNodes[j].x;
            const dy = circuitNodes[i].y - circuitNodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
                const opacity = (1 - distance / 200) * 0.3;
                ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(circuitNodes[i].x, circuitNodes[i].y);
                ctx.lineTo(circuitNodes[j].x, circuitNodes[j].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    // Clear canvas
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Update and draw circuit nodes
    circuitNodes.forEach(node => {
        node.update();
        node.draw();
    });

    // Draw circuit lines
    drawCircuitLines();

    requestAnimationFrame(animate);
}

animate();

// ===========================
// TYPING EFFECT
// ===========================

const typingText = document.querySelector('.typing-text');
const fullText = 'Building Intelligent Software Today, Creating Tomorrow\'s Technology.';
let index = 0;
let isDeleting = false;

function typeEffect() {
    if (!isDeleting && index <= fullText.length) {
        typingText.textContent = fullText.substring(0, index);
        index++;
        setTimeout(typeEffect, 50);
    } else if (isDeleting && index >= 0) {
        typingText.textContent = fullText.substring(0, index);
        index--;
        setTimeout(typeEffect, 30);
    } else if (!isDeleting && index > fullText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 3000);
    } else if (isDeleting && index < 0) {
        isDeleting = false;
        index = 0;
        setTimeout(typeEffect, 1000);
    }
}

// Start typing effect after page load
window.addEventListener('load', () => {
    setTimeout(typeEffect, 500);
});

// ===========================
// NAVIGATION & SMOOTH SCROLL
// ===========================

const navLinks = document.querySelectorAll('.nav-links a');
const hamburger = document.querySelector('.hamburger');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================

const revealElements = document.querySelectorAll('section');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, revealOptions);

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(element);
});

// ===========================
// SKILL CARDS HOVER ANIMATION
// ===========================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = '';
        }, 10);
    });
});

// ===========================
// YEAR IN FOOTER
// ===========================

document.getElementById('year').textContent = new Date().getFullYear();

// ===========================
// ACTIVE NAV LINK
// ===========================

function setActiveNav() {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#38BDF8';
        } else {
            link.style.color = '#F8FAFC';
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===========================
// RESPONSIVE NAVIGATION
// ===========================

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const navLinksContainer = document.querySelector('.nav-links');
        navLinksContainer.style.display = navLinksContainer.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// ===========================
// PARALLAX EFFECT ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0 ${scrollTop * 0.5}px`;
    }
});

// ===========================
// CARD HOVER GLOW EFFECT
// ===========================

const glassCards = document.querySelectorAll('.glass-effect');

glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
            radial-gradient(circle at ${x}px ${y}px, rgba(56, 189, 248, 0.1), rgba(15, 23, 42, 0.5))
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(15, 23, 42, 0.5)';
    });
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Reduce animation on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', 'none');
    document.documentElement.style.setProperty('--transition-slow', 'none');
}

// ===========================
// SCROLL TO TOP ON PAGE LOAD
// ===========================

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
