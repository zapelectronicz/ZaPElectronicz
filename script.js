/* ============================================
   ZaP ELECTRONICZ - INTERACTIVE SCRIPT
   Synthwave | Vaporwave | Cyberpunk Aesthetic
   ============================================ */

// Global state
const state = {
    isMusicPlaying: false,
    soundEnabled: true,
    konamiCode: [],
    konamiCodeSequence: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeStars();
    initializeScrollAnimations();
    initializeEventListeners();
    initializeKonamiCode();
    setCustomCursor();
});

/* ============================================
   PARTICLE SYSTEM
   ============================================ */

function initializeParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }

    // Create new particles periodically
    setInterval(() => {
        if (document.querySelectorAll('.particle').length < particleCount) {
            createParticle(container);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const size = Math.random() * 4 + 2;
    
    const colors = ['var(--color-cyan)', 'var(--color-neon-pink)', 'var(--color-yellow)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.background = color;
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
    
    const duration = Math.random() * 15 + 10;
    particle.style.setProperty('--duration', duration + 's');
    particle.style.animation = `floatParticle ${duration}s linear forwards`;
    
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), duration * 1000);
}

/* ============================================
   STARS GENERATION
   ============================================ */

function initializeStars() {
    const container = document.getElementById('starsContainer');
    const starCount = window.innerWidth > 768 ? 100 : 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const x = Math.random() * 100;
        const y = Math.random() * 60;
        const size = Math.random() * 2 + 1;
        const duration = Math.random() * 3 + 2;
        
        star.style.left = x + '%';
        star.style.top = y + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        container.appendChild(star);
    }
}

/* ============================================
   EVENT LISTENERS
   ============================================ */

function initializeEventListeners() {
    // Menu toggle for mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Music toggle
    const musicToggle = document.getElementById('musicToggle');
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    // Button interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            playSound('click');
            createPixelExplosion(e);
        });

        button.addEventListener('mouseenter', function() {
            playSound('hover');
        });
    });

    // Service cards hover
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            playSound('hover');
            this.style.animation = 'pulse 0.5s ease-out';
        });
    });

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

/* ============================================
   PIXEL EXPLOSION EFFECT
   ============================================ */

function createPixelExplosion(event) {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const particleCount = 12;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const colors = ['var(--color-cyan)', 'var(--color-neon-pink)', 'var(--color-yellow)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let life = 1;
        
        const animate = () => {
            life -= 0.02;
            posX += vx;
            posY += vy;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = life;
            particle.style.transform = `scale(${life})`;
            
            if (life > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

/* ============================================
   SOUND EFFECTS
   ============================================ */

function playSound(soundType) {
    if (!state.soundEnabled) return;
    
    // Using Web Audio API for sound synthesis (retro beeps)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    if (soundType === 'click') {
        // Click sound - descending beep
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (soundType === 'hover') {
        // Hover sound - ascending beep
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        
        osc.start(now);
        osc.stop(now + 0.05);
    }
}

/* ============================================
   MUSIC TOGGLE
   ============================================ */

function toggleMusic() {
    const musicToggle = document.getElementById('musicToggle');
    state.isMusicPlaying = !state.isMusicPlaying;
    
    if (state.isMusicPlaying) {
        musicToggle.style.color = 'var(--color-neon-pink)';
        musicToggle.style.textShadow = '0 0 10px var(--color-neon-pink)';
        // In a real implementation, play synthwave music here
        console.log('🎵 Now playing: Synthwave Vibes');
    } else {
        musicToggle.style.color = 'var(--color-cyan)';
        musicToggle.style.textShadow = '0 0 5px var(--color-cyan)';
        console.log('🔇 Music paused');
    }
}

/* ============================================
   KONAMI CODE EASTER EGG
   ============================================ */

function initializeKonamiCode() {
    document.addEventListener('keydown', (e) => {
        state.konamiCode.push(e.key);
        state.konamiCode = state.konamiCode.slice(-state.konamiCodeSequence.length);
        
        if (state.konamiCode.join(',') === state.konamiCodeSequence.join(',')) {
            activateKonamiCode();
        }
    });
}

function activateKonamiCode() {
    // Invert the color scheme for a fun easter egg
    const root = document.documentElement;
    const isInverted = root.style.getPropertyValue('--color-primary-inverted');
    
    if (!isInverted) {
        // Save original values and invert
        const originalCyan = getComputedStyle(root).getPropertyValue('--color-cyan');
        const originalPink = getComputedStyle(root).getPropertyValue('--color-neon-pink');
        
        root.style.setProperty('--color-cyan', originalPink);
        root.style.setProperty('--color-neon-pink', originalCyan);
        root.style.setProperty('--color-primary-inverted', 'true');
        
        // Create celebration particles
        celebrationExplosion();
        
        // Play a special sound
        playSpecialSound();
        
        console.log('🎮 KONAMI CODE ACTIVATED! Colors inverted!');
        
        // Revert after 10 seconds
        setTimeout(() => {
            root.style.setProperty('--color-cyan', originalCyan);
            root.style.setProperty('--color-neon-pink', originalPink);
            root.style.removeProperty('--color-primary-inverted');
        }, 10000);
    }
}

function celebrationExplosion() {
    const container = document.getElementById('particlesContainer');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createParticle(container);
        }, i * 30);
    }
}

function playSpecialSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioContext.currentTime;
    
    // Play a little melody
    const notes = [329.63, 392.00, 493.88, 587.33]; // E, G, B, D
    let time = now;
    
    notes.forEach((frequency, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.value = frequency;
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        
        osc.start(time);
        osc.stop(time + 0.2);
        
        time += 0.15;
    });
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */

function setCustomCursor() {
    // Create a custom cursor effect
    document.addEventListener('mousemove', function(e) {
        // Update for interactive elements
        const target = e.target;
        
        if (target.classList.contains('btn') || 
            target.classList.contains('glow-card') ||
            target.closest('.btn') ||
            target.closest('.glow-card')) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    });
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initializeScrollAnimations() {
    // Add fade-in animations to sections as they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

/* ============================================
   FORM HANDLING
   ============================================ */

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        device: formData.get('device'),
        problem: formData.get('problem'),
        message: formData.get('message'),
    };
    
    // In a real application, send this to a server
    console.log('Form submitted:', data);
    
    // Show success message
    showNotification('Thank you! We\'ll contact you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 2rem';
    notification.style.background = type === 'success' ? 'var(--color-cyan)' : 'var(--color-neon-pink)';
    notification.style.color = 'var(--color-navy)';
    notification.style.borderRadius = '4px';
    notification.style.fontFamily = 'var(--font-body)';
    notification.style.fontSize = '14px';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = `0 0 20px ${type === 'success' ? 'var(--color-cyan)' : 'var(--color-neon-pink)'}`;
    notification.style.animation = 'slideIn 0.5s ease-out';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-out forwards';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add slide animations
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
document.head.appendChild(style);

/* ============================================
   WINDOW RESIZE HANDLER
   ============================================ */

let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Recreate particles on resize
        const container = document.getElementById('particlesContainer');
        container.innerHTML = '';
        initializeParticles();
    }, 250);
});

/* ============================================
   PARALLAX SCROLLING
   ============================================ */

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
    }

    // Subtle parallax for grid floor
    const gridFloor = document.querySelector('.grid-floor');
    if (gridFloor) {
        gridFloor.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
});

/* ============================================
   PAGE VISIBILITY API - AUTO PAUSE MUSIC
   ============================================ */

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        if (state.isMusicPlaying) {
            console.log('🔇 Music paused (page hidden)');
            state.isMusicPlaying = false;
        }
    } else {
        // Page is visible
        console.log('👋 Welcome back to ZaP Electronicz!');
    }
});

/* ============================================
   PERFORMANCE OPTIMIZATION
   ============================================ */

// Reduce animations on low-end devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-smooth', 'all 0s');
    document.documentElement.style.setProperty('--transition-fast', 'all 0s');
}

/* ============================================
   LAZY LOADING
   ============================================ */

// Intersection Observer for lazy loading content
const lazyLoadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            lazyLoadObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glow-card').forEach(card => {
    lazyLoadObserver.observe(card);
});
