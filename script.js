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
    };
}

// ===== ADVANCED BACKGROUND EFFECTS =====

// ===== PARTICLE NETWORK SYSTEM =====
function initializeParticleNetwork() {
    const container = document.getElementById('particle-network');
    if (!container) return;
    
    const particles = [];
    const connections = [];
    const particleCount = 15;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.setProperty('--rotation', Math.random() * 360 + 'deg');
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        container.appendChild(particle);
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2
        });
    }
    
    // Update particle positions
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > 100) particle.vx *= -1;
            if (particle.y < 0 || particle.y > 100) particle.vy *= -1;
            
            particle.x = Math.max(0, Math.min(100, particle.x));
            particle.y = Math.max(0, Math.min(100, particle.y));
            
            particle.element.style.left = particle.x + '%';
            particle.element.style.top = particle.y + '%';
        });
        
        requestAnimationFrame(updateParticles);
    }
    
    updateParticles();
}

// ===== MATRIX RAIN EFFECT =====
function initializeMatrixRain() {
    const container = document.getElementById('matrix-rain');
    if (!container) return;
    
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = (i * 20) + 'px';
        column.style.animationDuration = (10 + Math.random() * 20) + 's';
        column.style.animationDelay = Math.random() * 20 + 's';
        
        // Generate random characters
        let text = '';
        const length = Math.floor(Math.random() * 20) + 10;
        for (let j = 0; j < length; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        column.textContent = text;
        
        container.appendChild(column);
    }
    
    // Regenerate matrix periodically
    setInterval(() => {
        const columns = container.querySelectorAll('.matrix-column');
        columns.forEach(column => {
            if (Math.random() < 0.1) { // 10% chance to regenerate
                let text = '';
                const length = Math.floor(Math.random() * 20) + 10;
                for (let j = 0; j < length; j++) {
                    text += chars[Math.floor(Math.random() * chars.length)] + '\n';
                }
                column.textContent = text;
            }
        });
    }, 2000);
}

// ===== NEURAL NETWORK VISUALIZATION =====
function initializeNeuralNetwork() {
    const container = document.getElementById('neural-network');
    if (!container) return;
    
    const nodes = [];
    const nodeCount = 12;
    
    // Create neural nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'neural-node';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        node.style.left = x + '%';
        node.style.top = y + '%';
        node.style.animationDelay = Math.random() * 4 + 's';
        
        container.appendChild(node);
        nodes.push({ element: node, x: x, y: y });
    }
    
    // Create connections between nodes
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) +
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 30) { // Only connect nearby nodes
                const connection = document.createElement('div');
                connection.className = 'neural-connection';
                
                const angle = Math.atan2(nodes[j].y - nodes[i].y, nodes[j].x - nodes[i].x);
                const length = distance;
                
                connection.style.left = nodes[i].x + '%';
                connection.style.top = nodes[i].y + '%';
                connection.style.width = length + 'vw';
                connection.style.transform = `rotate(${angle}rad)`;
                connection.style.animationDelay = Math.random() * 6 + 's';
                
                container.appendChild(connection);
            }
        }
    }
}

// ===== DYNAMIC BACKGROUND EFFECTS =====
function initializeBackgroundEffects() {
    // Add security scan lines periodically
    setInterval(createSecurityScanLine, 8000);
    
    // Add data streams
    setInterval(createDataStream, 12000);
    
    // Add glitch effects to random elements
    setInterval(addGlitchEffect, 15000);
}

function createSecurityScanLine() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.8), transparent);
        animation: securityScan 4s ease-in-out;
        z-index: 3;
        pointer-events: none;
    `;
    
    hero.appendChild(scanLine);
    
    setTimeout(() => {
        hero.removeChild(scanLine);
    }, 4000);
}

function createDataStream() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const stream = document.createElement('div');
    stream.style.cssText = `
        position: absolute;
        top: ${Math.random() * 80 + 10}%;
        left: -10%;
        width: 200px;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6), transparent);
        animation: dataStream 6s linear;
        z-index: 3;
        pointer-events: none;
    `;
    
    hero.appendChild(stream);
    
    setTimeout(() => {
        hero.removeChild(stream);
    }, 6000);
}

function addGlitchEffect() {
    const elements = document.querySelectorAll('.hero-title, .project-card, .testimonial-card');
    if (elements.length === 0) return;
    
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    randomElement.style.animation = 'glitch 0.3s ease-in-out';
    
    setTimeout(() => {
        randomElement.style.animation = '';
    }, 300);
}

// ===== CYBERSECURITY THEMED CURSOR EFFECT =====
function initializeCyberCursor() {
    let cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(102, 126, 234, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: all 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
        cursor.style.borderColor = 'rgba(102, 126, 234, 0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = 'rgba(102, 126, 234, 0.5)';
    });
}

// ===== RESPONSIVE BACKGROUND EFFECTS =====
function handleResponsiveBackgrounds() {
    const isMobile = window.innerWidth <= 768;
    
    // Reduce particle count on mobile
    if (isMobile) {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 8) { // Keep only first 8 particles on mobile
                particle.style.display = 'none';
            }
        });
        
        // Reduce matrix columns on mobile
        const matrixColumns = document.querySelectorAll('.matrix-column');
        matrixColumns.forEach((column, index) => {
            if (index % 3 !== 0) { // Keep every 3rd column
                column.style.display = 'none';
            }
        });
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function optimizeBackgroundEffects() {
    // Pause background animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        const animations = document.querySelectorAll('.particle, .matrix-column, .neural-node, .floating-element');
        
        if (document.hidden) {
            animations.forEach(el => {
                el.style.animationPlayState = 'paused';
            });
        } else {
            animations.forEach(el => {
                el.style.animationPlayState = 'running';
            });
        }
    });
    
    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            .particle, .matrix-column, .neural-node, .floating-element,
            .cyber-grid, .cyber-scanline, .holographic-overlay {
                animation: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize cyber cursor and responsive effects
document.addEventListener('DOMContentLoaded', () => {
    initializeCyberCursor();
    handleResponsiveBackgrounds();
    optimizeBackgroundEffects();
});

// Handle window resize
window.addEventListener('resize', debounce(handleResponsiveBackgrounds, 250));

// ===== CERTIFICATE ACCESS REQUEST FUNCTION =====
function requestCertificateAccess() {
    const email = prompt('For business verification purposes, please enter your email address to request access to our CAC certificate:');
    
    if (email) {
        if (isValidEmail(email)) {
            // Track certificate request
            if (typeof trackButtonClick === 'function') {
                trackButtonClick('certificate_access_request');
            }
            
            // Show loading state
            const button = document.querySelector('.certificate-request');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            button.disabled = true;
            
            // Simulate processing
            setTimeout(() => {
                showNotification(`✅ Certificate access request received! We'll email the certificate to ${email} within 24 hours for verification purposes.`, 'success');
                
                // Send notification email (using existing EmailJS setup)
                const templateParams = {
                    from_name: 'Certificate Requestor',
                    from_email: email,
                    subject: 'CAC Certificate Access Request',
                    message: `Certificate access requested by: ${email}\nDate: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}\n\nThis is an automated request for business verification purposes.`,
                    to_name: 'Nehemiah',
                    reply_to: email
                };
                
                if (typeof emailjs !== 'undefined') {
                    emailjs.send('service_70qxuz3', 'template_emryv6d', templateParams)
                        .then(function(response) {
                            console.log('Certificate request notification sent:', response.status);
                        })
                        .catch(function(error) {
                            console.error('Certificate request notification error:', error);
                        });
                }
                
                // Restore button
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    } else {
        showNotification('Email address is required to request certificate access.', 'error');
    }
}

// ===== MOBILE TIMELINE FUNCTIONALITY =====
function initializeMobileTimeline() {
    // Only activate on mobile devices
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function initializeCollapsibleTimeline() {
        const expandBtn = document.getElementById('timelineExpandBtn');
        const historicalSection = document.getElementById('timelineHistorical');
        
        if (!expandBtn || !historicalSection) return;
        
        let isExpanded = false;
        
        expandBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Expand timeline
                historicalSection.classList.add('expanded');
                expandBtn.classList.add('expanded');
                expandBtn.innerHTML = '<i class="fas fa-chevron-up"></i><span>Show Less</span>';
                
                // Smooth scroll to see more content after animation
                setTimeout(() => {
                    expandBtn.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            } else {
                // Collapse timeline
                historicalSection.classList.remove('expanded');
                expandBtn.classList.remove('expanded');
                expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i><span>View Complete Timeline</span>';
                
                // Scroll back to 2025 section
                setTimeout(() => {
                    const currentItems = document.querySelector('.timeline-current');
                    if (currentItems) {
                        currentItems.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 300);
            }
        });
    }
    
    function handleTimelineClick() {
        if (!isMobile()) return; // Only work on mobile
        
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close other expanded items
                timelineItems.forEach(otherItem => {
                    if (otherItem !== this) {
                        otherItem.classList.remove('expanded');
                    }
                });
                
                // Toggle current item
                this.classList.toggle('expanded');
                
                // Smooth scroll to item if expanding
                if (this.classList.contains('expanded')) {
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            });
        });
    }
    
    // Initialize both features
    initializeCollapsibleTimeline();
    handleTimelineClick();
    
    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        // Remove all expanded classes on desktop
        if (!isMobile()) {
            document.querySelectorAll('.timeline-item').forEach(item => {
                item.classList.remove('expanded');
            });
            
            // Reset collapsible timeline on desktop
            const historicalSection = document.getElementById('timelineHistorical');
            const expandBtn = document.getElementById('timelineExpandBtn');
            if (historicalSection) historicalSection.classList.remove('expanded');
            if (expandBtn) {
                expandBtn.classList.remove('expanded');
                expandBtn.innerHTML = '<i class="fas fa-chevron-down"></i><span>View Complete Timeline</span>';
            }
        }
    });
}
