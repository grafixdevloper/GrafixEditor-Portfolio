// Vertical Progress Bar
document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.querySelector('.vertical-progress');
    const progressBarFill = document.querySelector('.vertical-progress-bar');
    
    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBarFill.style.height = scrolled + '%';
    });

    // Click to scroll functionality
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientY - rect.top;
        const percentage = clickPosition / rect.height;
        
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const targetScroll = windowHeight * percentage;
        
        window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
        });
    });

    // Add hover effect for better visibility
    progressBar.addEventListener('mouseenter', () => {
        progressBar.style.width = '8px';
    });

    progressBar.addEventListener('mouseleave', () => {
        progressBar.style.width = '4px';
    });
});

// YouTube API integration
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videos = ['AukR5L1NcEQ', 'rX66EQiqioE'];
var currentVideoIndex = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        player.loadVideoById(videos[currentVideoIndex]);
    }
}

// Optimized Navbar scroll effect with throttling
let lastScroll = 0;
const scrollThreshold = 50;
const scrollThrottle = 100; // ms

window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastScroll >= scrollThrottle) {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = now;
    }
});

// Optimized Parallax effect
let ticking = false;
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const parallax = document.querySelector('.hero-content');
            parallax.style.transform = 'translateY(' + (window.pageYOffset * 0.5) + 'px)';
            ticking = false;
        });
        ticking = true;
    }
});

// Motion Graphics Background Animation
document.addEventListener('DOMContentLoaded', function() {
    const motionBg = document.getElementById('motion-bg');
    if (!motionBg) {
        console.error('Motion background container not found!');
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    motionBg.appendChild(canvas);

    // Set canvas size with proper scaling
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = motionBg.getBoundingClientRect();
        
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
        
        return { width: rect.width, height: rect.height };
    }

    let { width, height } = resizeCanvas();

    // Mouse interaction variables
    let mouseX = width / 2;
    let mouseY = height / 2;
    let scrollOffset = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Track scroll position
    window.addEventListener('scroll', () => {
        scrollOffset = window.pageYOffset;
    });

    const particles = [];
    const particleCount = 50;
    const connectionDistance = Math.min(width, height) * 0.15;
    const mouseRadius = 100; // Radius of mouse influence
    const scrollFactor = 0.1; // How much scroll affects particles

    function createParticles() {
        particles.length = 0;
        for(let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                baseX: Math.random() * width, // Original X position
                baseY: Math.random() * height, // Original Y position
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                size: Math.min(width, height) * 0.004
            });
        }
    }

    createParticles();

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if(distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(229, 9, 20, ${(1 - distance/connectionDistance) * 0.4})`;
                    ctx.lineWidth = Math.min(width, height) * 0.001;
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.stroke();
                }
            });
        });

        // Update and draw particles
        particles.forEach(particle => {
            // Mouse interaction
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouseRadius) {
                const force = (mouseRadius - distance) / mouseRadius;
                particle.x -= dx * force * 0.03;
                particle.y -= dy * force * 0.03;
            }

            // Parallax effect based on scroll
            const scrollDelta = scrollOffset * scrollFactor;
            particle.y = particle.baseY - scrollDelta;

            // Normal movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges with position reset if too far
            if(particle.x < 0 || particle.x > width) {
                particle.speedX *= -1;
                if(Math.abs(particle.x - width/2) > width) {
                    particle.x = particle.baseX;
                }
            }
            if(particle.y < 0 || particle.y > height) {
                particle.speedY *= -1;
                if(Math.abs(particle.y - height/2) > height) {
                    particle.y = particle.baseY - scrollDelta;
                }
            }

            // Draw particle with gradient for better effect
            const gradient = ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 2
            );
            gradient.addColorStop(0, 'rgba(229, 9, 20, 0.9)');
            gradient.addColorStop(1, 'rgba(229, 9, 20, 0)');

            ctx.beginPath();
            ctx.fillStyle = gradient;
            ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newDimensions = resizeCanvas();
            width = newDimensions.width;
            height = newDimensions.height;
            createParticles();
        }, 250);
    });
});

// Optimized Progress bar animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, { threshold: 0.1 });

observer.observe(document.querySelector('#skills'));

// Resume section collapse handling
document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapse');
    
    collapsibles.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', function() {
            const header = this.previousElementSibling;
            const icon = header.querySelector('.toggle-icon');
            icon.style.transform = 'rotate(0deg)';
            
            // Add animation class
            this.classList.add('showing');
        });

        collapse.addEventListener('hide.bs.collapse', function() {
            const header = this.previousElementSibling;
            const icon = header.querySelector('.toggle-icon');
            icon.style.transform = 'rotate(-90deg)';
            
            // Remove animation class
            this.classList.remove('showing');
        });
    });
}); 