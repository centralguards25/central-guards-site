/**
 * Header Component JavaScript
 * Handles header functionality including mobile menu navigation
 */

function initHeader() {
    console.log('Header Component Initialized');
    setupMobileMenu();
    setupLanguageSelector();
    setupScrollBehavior();
}

/**
 * Sets up the mobile navigation menu toggle functionality
 */
function setupMobileMenu() {
    const menuToggle = utils.getElement('.mobile-menu-toggle');
    const navList = utils.getElement('.nav-list');
    
    if (!menuToggle || !navList) return;
    
    utils.addEvent(menuToggle, 'click', function() {
        // Toggle the navigation menu
        utils.toggleClass(navList, 'active');
        
        // Toggle ARIA expanded state
        const isExpanded = utils.hasClass(navList, 'active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Change hamburger icon to X when menu is open
        const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
        if (hamburgerIcon) {
            if (isExpanded) {
                hamburgerIcon.style.backgroundColor = 'transparent';
                hamburgerIcon.style.transform = 'rotate(90deg)';
            } else {
                hamburgerIcon.style.backgroundColor = '';
                hamburgerIcon.style.transform = '';
            }
        }
    });
    
    // Close mobile menu when clicking outside
    utils.addEvent(document, 'click', function(event) {
        // Skip if menu is not active or if click is on the menu toggle itself
        if (!utils.hasClass(navList, 'active') || 
            menuToggle.contains(event.target)) {
            return;
        }
        
        // If click is outside the nav list, close the menu
        if (!navList.contains(event.target)) {
            utils.removeClass(navList, 'active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
            if (hamburgerIcon) {
                hamburgerIcon.style.backgroundColor = '';
                hamburgerIcon.style.transform = '';
            }
        }
    });
    
    // Close mobile menu when window resizes
    const resizeHandler = utils.debounce(function() {
        if (window.innerWidth > 768 && utils.hasClass(navList, 'active')) {
            utils.removeClass(navList, 'active');
            menuToggle.setAttribute('aria-expanded', 'false');
            
            // Reset hamburger icon
            const hamburgerIcon = menuToggle.querySelector('.hamburger-icon');
            if (hamburgerIcon) {
                hamburgerIcon.style.backgroundColor = '';
                hamburgerIcon.style.transform = '';
            }
        }
    }, 150);
    
    utils.addEvent(window, 'resize', resizeHandler);
}

/**
 * Sets up the language selector functionality
 */
function setupLanguageSelector() {
    const languageSelect = utils.getElement('#language-select');
    
    if (!languageSelect) return;
    
    utils.addEvent(languageSelect, 'change', function() {
        // Language change logic would go here
        // For now, we'll just log the selected language
        console.log('Language changed to:', this.value);
        
        // In a real application, this might redirect to a localized version
        // or trigger a translation function
    });
}

/**
 * Sets up header scroll behavior
 * Changes header appearance on scroll
 */
function setupScrollBehavior() {
    const header = utils.getElement('.site-header');
    
    if (!header) return;
    
    const scrollHandler = utils.debounce(function() {
        if (window.scrollY > 100) {
            utils.addClass(header, 'scrolled');
            header.style.boxShadow = 'var(--shadow-md)';
            header.style.padding = '0.5rem 0';
        } else {
            utils.removeClass(header, 'scrolled');
            header.style.boxShadow = '';
            header.style.padding = '';
        }
    }, 10);
    
    utils.addEvent(window, 'scroll', scrollHandler);
}

/**
 * Header JavaScript - CentralGuards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const header = document.querySelector('.site-header');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            document.body.classList.toggle('mobile-menu-open');
            header.classList.toggle('mobile-menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (document.body.classList.contains('mobile-menu-open') && 
            !event.target.closest('.main-nav') && 
            !event.target.closest('.mobile-menu-toggle')) {
            document.body.classList.remove('mobile-menu-open');
            header.classList.remove('mobile-menu-open');
        }
    });
    
    // Header scroll effect
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScrollPosition > 100) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
}); 