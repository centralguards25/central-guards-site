/**
 * Content Component JavaScript
 * Handles functionality for main content sections
 */

function initContentComponents() {
    console.log('Content Components Initialized');
    setupServiceCards();
    setupTestimonialSlider();
    setupAnimations();
    setupSmoothScrolling();
}

/**
 * Sets up service card interactions
 */
function setupServiceCards() {
    const serviceCards = utils.getElements('.service-card');
    
    if (!serviceCards.length) return;
    
    serviceCards.forEach(card => {
        // Add hover class when mouse enters card
        utils.addEvent(card, 'mouseenter', function() {
            utils.addClass(card, 'card-hover');
            
            // Animate service icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        // Remove hover class when mouse leaves card
        utils.addEvent(card, 'mouseleave', function() {
            utils.removeClass(card, 'card-hover');
            
            // Reset service icon
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
        
        // Add click event for service cards
        utils.addEvent(card, 'click', function(e) {
            // If the click is on the link, let it behave normally
            if (e.target.closest('.service-link')) {
                return;
            }
            
            // Otherwise, find the link and programmatically click it
            const serviceLink = card.querySelector('.service-link');
            if (serviceLink && serviceLink.getAttribute('href')) {
                serviceLink.click();
            }
        });
    });
}

/**
 * Sets up testimonial slider functionality
 * In a real application, this would be a more robust slider implementation
 */
function setupTestimonialSlider() {
    // For a simple demo, we'll just rotate through testimonials
    // In a real application, you might use a library like Swiper or Slick
    
    const testimonials = [
        {
            content: '"CentralGuards has provided exceptional security services for our corporate offices. Their professionalism and attention to detail are unmatched."',
            author: {
                name: 'John Smith',
                position: 'Facilities Manager, TechCorp',
                image: 'https://placeholder.pics/svg/60x60/DEDEDE/555555/P'
            }
        },
        {
            content: '"We have been working with CentralGuards for over 5 years and their consistent quality and reliability have exceeded our expectations."',
            author: {
                name: 'Sarah Johnson',
                position: 'Operations Director, Retail Group',
                image: 'https://placeholder.pics/svg/60x60/DEDEDE/555555/P'
            }
        },
        {
            content: '"Their team responded quickly to our security needs and implemented a comprehensive solution that gave us peace of mind."',
            author: {
                name: 'Michael Chen',
                position: 'Security Manager, Healthcare Systems',
                image: 'https://placeholder.pics/svg/60x60/DEDEDE/555555/P'
            }
        }
    ];
    
    const slider = utils.getElement('.testimonials-slider');
    if (!slider) return;
    
    let currentTestimonial = 0;
    
    // Function to update testimonial content
    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        // Create testimonial HTML
        const testimonialHTML = `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p>${testimonial.content}</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-image">
                        <img src="${testimonial.author.image}" alt="${testimonial.author.name}">
                    </div>
                    <div class="author-info">
                        <h4 class="author-name">${testimonial.author.name}</h4>
                        <p class="author-position">${testimonial.author.position}</p>
                    </div>
                </div>
            </div>
        `;
        
        // Fade out current testimonial
        slider.style.opacity = '0';
        
        // Update content and fade back in after a short delay
        setTimeout(() => {
            slider.innerHTML = testimonialHTML;
            slider.style.opacity = '1';
        }, 300);
        
        // Increment current testimonial index
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }
    
    // Set initial testimonial
    updateTestimonial();
    
    // Set interval to rotate testimonials (every 5 seconds)
    setInterval(updateTestimonial, 5000);
}

/**
 * Sets up scroll animations for content elements
 * Simple animations to enhance user experience
 */
function setupAnimations() {
    // Ensure the service cards are always visible first
    const servicesSection = document.querySelector('.services-section');
    const servicesGrid = document.querySelector('.services-grid');
    
    if (servicesSection && servicesGrid) {
        console.log('Services section found, ensuring visibility');
        servicesSection.style.display = 'block';
        servicesGrid.style.display = 'grid';
        
        // Force service cards to be visible without animation if they're not showing
        const serviceCards = utils.getElements('.service-card');
        if (serviceCards.length) {
            console.log('Service cards found:', serviceCards.length);
            serviceCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.style.display = 'flex';
            });
        } else {
            console.warn('No service cards found in the DOM');
        }
    } else {
        console.warn('Services section or grid not found in the DOM');
    }
    
    // Add fade-in animation to services - but ensure they're visible first
    const serviceCards = utils.getElements('.service-card');
    if (serviceCards.length) {
        // Make all cards visible immediately first
        serviceCards.forEach(card => {
            card.classList.add('visible');
        });
        
        // Then apply animation only if not already animated
        animateOnScroll(serviceCards, 'animate-fade-in', 100);
    }
    
    // Add slide-in animation to about section
    const aboutContent = utils.getElement('.about-content');
    if (aboutContent) {
        animateOnScroll([aboutContent], 'animate-slide-in', 200);
    }
    
    // Add pulse animation to hero button
    const heroButtons = utils.getElements('.hero-buttons .btn-primary');
    if (heroButtons.length) {
        setTimeout(() => {
            heroButtons.forEach(button => {
                button.style.animation = 'pulse 2s infinite';
            });
        }, 2000);
    }
}

/**
 * Adds animation class to elements when they enter the viewport
 * @param {NodeList|Array} elements - Elements to animate
 * @param {string} animationClass - CSS class for animation
 * @param {number} offset - Offset in pixels before triggering
 */
function animateOnScroll(elements, animationClass, offset = 0) {
    if (!elements || !elements.length) return;
    
    // Make the elements visible by default first
    elements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
    
    // Check if we should actually apply animations
    const shouldAnimate = window.innerWidth > 768 && !sessionStorage.getItem('disableAnimations');
    
    // If we shouldn't animate, just make everything visible and return
    if (!shouldAnimate) {
        console.log('Animations disabled or mobile device detected, making elements immediately visible');
        elements.forEach(element => {
            utils.addClass(element, 'visible');
        });
        return;
    }
    
    // Add CSS class to style tag for animation if not already there
    let styleTag = document.getElementById('scroll-animations');
    if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'scroll-animations';
        styleTag.innerHTML = `
            .animate-fade-in {
                opacity: 0;
                transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                transform: translateY(20px);
            }
            
            .animate-fade-in.visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .animate-slide-in {
                opacity: 0;
                transition: opacity 0.8s ease-out, transform 0.8s ease-out;
                transform: translateX(-30px);
            }
            
            .animate-slide-in.visible {
                opacity: 1;
                transform: translateX(0);
            }
            
            @keyframes pulse {
                0% {
                    box-shadow: 0 0 0 0 rgba(30, 136, 229, 0.4);
                }
                70% {
                    box-shadow: 0 0 0 10px rgba(30, 136, 229, 0);
                }
                100% {
                    box-shadow: 0 0 0 0 rgba(30, 136, 229, 0);
                }
            }
        `;
        document.head.appendChild(styleTag);
    }
    
    // Apply initial animation class only if we're animating
    elements.forEach(element => {
        utils.addClass(element, animationClass);
        // Make half the elements visible immediately for better UX
        if (Math.random() > 0.5) {
            utils.addClass(element, 'visible');
        }
    });
    
    // Check if elements are in viewport and add visible class
    function checkInView() {
        elements.forEach(element => {
            if (isElementInViewport(element, offset) && !utils.hasClass(element, 'visible')) {
                utils.addClass(element, 'visible');
            }
        });
    }
    
    // Check initial state
    checkInView();
    
    // Add scroll listener
    utils.addEvent(window, 'scroll', utils.debounce(checkInView, 10));
    utils.addEvent(window, 'resize', utils.debounce(checkInView, 10));
    
    // Make everything visible after a timeout regardless of scroll position
    setTimeout(() => {
        elements.forEach(element => {
            if (!utils.hasClass(element, 'visible')) {
                utils.addClass(element, 'visible');
            }
        });
    }, 2000);
}

/**
 * Checks if an element is in the viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} offset - Offset in pixels
 * @return {boolean} - True if element is in viewport
 */
function isElementInViewport(element, offset = 0) {
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight - offset) &&
        rect.bottom >= 0 &&
        rect.left <= window.innerWidth &&
        rect.right >= 0
    );
}

/**
 * Sets up smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    // Get all links that have hash/anchor references
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        utils.addEvent(link, 'click', function(e) {
            // Get the target element
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get header height to offset scroll position
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Calculate position to scroll to
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll smoothly to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without refreshing the page (optional)
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
} 