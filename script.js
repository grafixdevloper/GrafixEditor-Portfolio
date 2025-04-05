// Vertical Progress Bar
document.addEventListener('DOMContentLoaded', function() {
    // Apply custom scrollbar styles dynamically
    applyCustomScrollbar();
    
    // Hide the vertical progress bar element
    const progressBar = document.querySelector('.vertical-progress');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
    
    // Fix navbar toggler icon
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        // Check if the toggler already has the custom structure
        if (!navbarToggler.querySelector('.navbar-toggler-icon span')) {
            const togglerIcon = navbarToggler.querySelector('.navbar-toggler-icon');
            
            // If using the default icon, replace it with our custom structure
            if (togglerIcon) {
                // Clear any existing content
                togglerIcon.innerHTML = '';
                
                // Create the middle line as a span
                const middleLine = document.createElement('span');
                togglerIcon.appendChild(middleLine);
                
                // Add custom class to identify our modified toggler
                togglerIcon.classList.add('custom-toggler-icon');
            }
        }
    }
});

// Function to apply custom scrollbar styles
function applyCustomScrollbar() {
    // Create a style element
    const style = document.createElement('style');
    
    // Define the scrollbar styles
    const css = `
        /* Hide default scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        /* Track */
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: rgba(229, 9, 20, 0.7);
            border-radius: 5px;
        }
        
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(229, 9, 20, 1);
        }
        
        /* Firefox */
        * {
            scrollbar-width: thin;
            scrollbar-color: rgba(229, 9, 20, 0.7) rgba(0, 0, 0, 0.1);
        }
        
        /* Hide default vertical progress bar when custom scrollbar is active */
        @media screen and (min-width: 768px) {
            body::-webkit-scrollbar {
                display: none;
            }
            body {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        }
        
        /* Fix for navbar toggler icon to ensure three lines */
        .navbar-toggler-icon.custom-toggler-icon {
            background-image: none !important;
            position: relative;
            height: 24px;
            width: 24px;
            transition: all 0.3s ease;
        }
        
        .navbar-toggler-icon.custom-toggler-icon::before,
        .navbar-toggler-icon.custom-toggler-icon::after,
        .navbar-toggler-icon.custom-toggler-icon span {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
        }
        
        .navbar-toggler-icon.custom-toggler-icon::before {
            top: 5px;
        }
        
        .navbar-toggler-icon.custom-toggler-icon span {
            top: 50%;
            transform: translateY(-50%);
        }
        
        .navbar-toggler-icon.custom-toggler-icon::after {
            bottom: 5px;
        }
        
        /* X transformation when toggled */
        .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon.custom-toggler-icon::before {
            transform: translateY(7px) rotate(45deg);
        }
        
        .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon.custom-toggler-icon span {
            opacity: 0;
        }
        
        .navbar-toggler[aria-expanded="true"] .navbar-toggler-icon.custom-toggler-icon::after {
            transform: translateY(-7px) rotate(-45deg);
        }
    `;
    
    // Add the CSS to the style element
    style.appendChild(document.createTextNode(css));
    
    // Add the style element to the head
    document.head.appendChild(style);
}

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

// Mobile detection
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Optimize particle animation for mobile
const particleCount = isMobile ? 20 : 45; // Reduced number of particles as requested
const connectionDistance = isMobile ? 0.12 : 0.25; // Increased for more visible connections
const mouseRadius = isMobile ? 50 : 100;

// Throttle function for better performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll handler
const handleScroll = throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100);

// Optimized parallax effect
const handleParallax = throttle(() => {
    const parallax = document.querySelector('.hero-content');
    if (parallax) {
        parallax.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
    }
}, 16);

// Remove this progress bar handler since we're removing the vertical progress bar
// const handleProgress = throttle(() => {
//     const progressBarFill = document.querySelector('.vertical-progress-bar');
//     if (progressBarFill) {
//         const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
//         const scrolled = (window.scrollY / windowHeight) * 100;
//         progressBarFill.style.height = scrolled + '%';
//     }
// }, 16);

// Add event listeners with passive option for better performance
document.addEventListener('scroll', handleScroll, { passive: true });
document.addEventListener('scroll', handleParallax, { passive: true });
// Remove this event listener since we're removing the vertical progress bar
// document.addEventListener('scroll', handleProgress, { passive: true });

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
    const scrollFactor = 0.1; // How much scroll affects particles

    function createParticles() {
        particles.length = 0;
        for(let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                baseX: Math.random() * width,
                baseY: Math.random() * height,
                speedX: (Math.random() - 0.5) * 1,
                speedY: (Math.random() - 0.5) * 1,
                size: Math.min(width, height) * 0.006, // Increased particle size as requested
                neighbors: [] // Array to track nearest neighbors
            });
        }
    }

    createParticles();

    function drawParticles() {
        if (!isMobile || document.visibilityState === 'visible') {
            ctx.clearRect(0, 0, width, height);
            
            // Find 4-5 nearest neighbors for each particle
            particles.forEach(particle => {
                // Reset neighbors
                particle.neighbors = [];
                
                // Calculate distances to all other particles
                const distances = particles.map((p, index) => {
                    if (p === particle) return { index, distance: Infinity };
                    const dx = particle.x - p.x;
                    const dy = particle.y - p.y;
                    return { 
                        index, 
                        distance: Math.sqrt(dx * dx + dy * dy)
                    };
                });
                
                // Sort by distance and get 4-5 nearest (randomly choose between 4 and 5)
                distances.sort((a, b) => a.distance - b.distance);
                const neighborCount = Math.random() > 0.5 ? 4 : 5; // Randomly choose 4 or 5 neighbors
                particle.neighbors = distances.slice(0, neighborCount).map(d => d.index);
            });
            
            // Draw string-like connections between particles and their neighbors
            particles.forEach((particle, i) => {
                // Draw connections to neighbors
                particle.neighbors.forEach(neighborIndex => {
                    const neighbor = particles[neighborIndex];
                    const dx = particle.x - neighbor.x;
                    const dy = particle.y - neighbor.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Only draw if within reasonable distance
                    if (distance < width * connectionDistance) {
                        // Calculate opacity based on distance
                        const opacity = 1 - (distance / (width * connectionDistance));
                        
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(229, 9, 20, ${opacity * (isMobile ? 0.25 : 0.4)})`; // Increased opacity for better visibility
                        ctx.lineWidth = Math.min(width, height) * 0.001; // Slightly thicker lines for string-like effect
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(neighbor.x, neighbor.y);
                        ctx.stroke();
                    }
                });
                
                // Draw additional connections for web-like effect but much more sparingly
                if (i % 8 === 0) { // Significantly reduced frequency of secondary connections
                    particles.forEach((otherParticle, j) => {
                        if (i !== j && !particle.neighbors.includes(j)) {
                            const dx = particle.x - otherParticle.x;
                            const dy = particle.y - otherParticle.y;
                            const distance = Math.sqrt(dx * dx + dy * dy);
                            
                            if (distance < width * (connectionDistance * 0.5)) { // Reduced connection distance
                                const opacity = (1 - distance/(width * connectionDistance * 0.5)) * 0.08; // Reduced opacity
                                
                                ctx.beginPath();
                                ctx.strokeStyle = `rgba(229, 9, 20, ${opacity})`;
                                ctx.lineWidth = Math.min(width, height) * 0.0002; // Thinner secondary connections
                                ctx.moveTo(particle.x, particle.y);
                                ctx.lineTo(otherParticle.x, otherParticle.y);
                                ctx.stroke();
                            }
                        }
                    });
                }
            });

            // Update and draw particles
            particles.forEach(particle => {
                // Mouse interaction with reduced effect on mobile
                const dx = mouseX - particle.x;
                const dy = mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseRadius) {
                    const force = (mouseRadius - distance) / mouseRadius;
                    particle.x -= dx * force * (isMobile ? 0.01 : 0.03);
                    particle.y -= dy * force * (isMobile ? 0.01 : 0.03);
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

// Optimize image loading
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Scroll to top button functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        // Show button when user scrolls down 300px
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});