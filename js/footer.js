/**
 * Footer Component JavaScript
 * Handles footer functionality
 */

function initFooter() {
    console.log('Footer Component Initialized');
    setupFooterNavigation();
    setupSocialLinks();
    setupBackToTop();
}

/**
 * Sets up mobile footer navigation
 * Collapsible footer navigation sections on mobile
 */
function setupFooterNavigation() {
    // On mobile, make footer navigation titles toggleable
    if (window.innerWidth <= 768) {
        const footerTitles = utils.getElements('.footer-nav-title');
        
        if (!footerTitles.length) return;
        
        footerTitles.forEach(title => {
            // Add click event to toggle visibility
            utils.addEvent(title, 'click', function() {
                const navList = title.nextElementSibling;
                if (!navList) return;
                
                // Toggle visibility of the navigation list
                if (navList.style.display === 'none') {
                    navList.style.display = 'block';
                    title.classList.add('expanded');
                } else {
                    navList.style.display = 'none';
                    title.classList.remove('expanded');
                }
            });
            
            // Initially hide all footer navigation lists on mobile
            const navList = title.nextElementSibling;
            if (navList) {
                navList.style.display = 'none';
            }
        });
    }
    
    // Add window resize listener to adjust footer navigation based on screen size
    utils.addEvent(window, 'resize', utils.debounce(function() {
        const footerTitles = utils.getElements('.footer-nav-title');
        if (!footerTitles.length) return;
        
        if (window.innerWidth <= 768) {
            // On mobile, initially hide navigation lists unless they are expanded
            footerTitles.forEach(title => {
                const navList = title.nextElementSibling;
                if (navList && !title.classList.contains('expanded')) {
                    navList.style.display = 'none';
                }
            });
        } else {
            // On desktop, always show navigation lists
            footerTitles.forEach(title => {
                const navList = title.nextElementSibling;
                if (navList) {
                    navList.style.display = 'block';
                }
            });
        }
    }, 150));
}

/**
 * Sets up social media link interactions
 */
function setupSocialLinks() {
    const socialLinks = utils.getElements('.social-link');
    
    if (!socialLinks.length) return;
    
    socialLinks.forEach(link => {
        // Add hover animation
        utils.addEvent(link, 'mouseenter', function() {
            link.style.transform = 'translateY(-3px)';
        });
        
        utils.addEvent(link, 'mouseleave', function() {
            link.style.transform = '';
        });
        
        // Add click tracking (in a real application, this would track social engagement)
        utils.addEvent(link, 'click', function(e) {
            const platform = link.querySelector('i').className;
            console.log(`Social link clicked: ${platform}`);
            
            // In a real application, you might send this data to an analytics service
            // analytics.track('social_click', { platform });
        });
    });
}

/**
 * Sets up back to top button functionality
 * Creates and appends a back to top button when scrolled down
 */
function setupBackToTop() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: var(--white);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-normal);
        z-index: 99;
    `;
    
    // Append to body
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    const scrollHandler = utils.debounce(function() {
        if (window.scrollY > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    }, 100);
    
    utils.addEvent(window, 'scroll', scrollHandler);
    
    // Add click event to scroll to top
    utils.addEvent(backToTopButton, 'click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect
    utils.addEvent(backToTopButton, 'mouseenter', function() {
        backToTopButton.style.backgroundColor = 'var(--secondary-color)';
        backToTopButton.style.transform = 'translateY(-3px)';
    });
    
    utils.addEvent(backToTopButton, 'mouseleave', function() {
        backToTopButton.style.backgroundColor = 'var(--primary-color)';
        backToTopButton.style.transform = '';
    });
} 