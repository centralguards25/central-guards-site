/**
 * Main JavaScript
 * Contains utility functions and initializes all components
 */

// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    console.log('CentralGuards Website Initialized');
    
    // Initialize other components
    initializeAllComponents();
});

/**
 * Initializes all components of the website
 */
function initializeAllComponents() {
    console.log('Initializing all components');
    
    // Initialize components
    setupLogoClickHandler();
    setupMobileMenuLinks();
    
    // Initialize modals
    ensureModalsWork();
}

/**
 * Handles click events on the logo
 * Returns user to the homepage
 */
function setupLogoClickHandler() {
    const logo = document.querySelector('.logo');
    if (!logo) return;
    
    logo.addEventListener('click', function(e) {
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

/**
 * Ensures mobile menu links close the menu when clicked
 */
function setupMobileMenuLinks() {
    const navLinks = document.querySelectorAll('nav a');
    const menuCheckbox = document.querySelector('#mobile-menu-toggle');
    
    if (menuCheckbox) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuCheckbox.checked = false;
            });
        });
    }
}

// Utility Functions
const utils = {
    /**
     * Toggles a class on an element
     * @param {HTMLElement} element - The element to toggle class on
     * @param {string} className - The class to toggle
     */
    toggleClass: function(element, className) {
        if (!element) return;
        element.classList.toggle(className);
    },
    
    /**
     * Adds a class to an element
     * @param {HTMLElement} element - The element to add class to
     * @param {string} className - The class to add
     */
    addClass: function(element, className) {
        if (!element) return;
        element.classList.add(className);
    },
    
    /**
     * Removes a class from an element
     * @param {HTMLElement} element - The element to remove class from
     * @param {string} className - The class to remove
     */
    removeClass: function(element, className) {
        if (!element) return;
        element.classList.remove(className);
    },
    
    /**
     * Checks if an element has a class
     * @param {HTMLElement} element - The element to check
     * @param {string} className - The class to check for
     * @return {boolean} - True if element has class, false otherwise
     */
    hasClass: function(element, className) {
        if (!element) return false;
        return element.classList.contains(className);
    },
    
    /**
     * Gets an element by selector
     * @param {string} selector - The CSS selector
     * @return {HTMLElement} - The element or null if not found
     */
    getElement: function(selector) {
        return document.querySelector(selector);
    },
    
    /**
     * Gets multiple elements by selector
     * @param {string} selector - The CSS selector
     * @return {NodeList} - The elements or empty NodeList if none found
     */
    getElements: function(selector) {
        return document.querySelectorAll(selector);
    },
    
    /**
     * Adds an event listener to an element
     * @param {HTMLElement} element - The element to add listener to
     * @param {string} event - The event type (e.g., 'click')
     * @param {Function} callback - The callback function
     */
    addEvent: function(element, event, callback) {
        if (!element) return;
        element.addEventListener(event, callback);
    },
    
    /**
     * Removes an event listener from an element
     * @param {HTMLElement} element - The element to remove listener from
     * @param {string} event - The event type (e.g., 'click')
     * @param {Function} callback - The callback function
     */
    removeEvent: function(element, event, callback) {
        if (!element) return;
        element.removeEventListener(event, callback);
    }
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The debounce wait time in milliseconds
 * @return {Function} - The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

/**
 * Function to ensure all modals work properly
 * Acts as a failsafe if the individual component scripts haven't initialized correctly
 */
function ensureModalsWork() {
    console.log('Ensuring modals work properly...');
    
    // Quote Modal Buttons
    const quoteButtons = document.querySelectorAll('#getQuoteBtn, #footerQuoteBtn, #ctaQuoteBtn, #mobilQuoteBtn');
    const quoteModal = document.getElementById('quoteModal');
    
    if (quoteButtons.length > 0 && quoteModal) {
        console.log('Quote buttons found:', quoteButtons.length);
        
        quoteButtons.forEach(button => {
            // Check if button already has event listeners by looking for our data attribute
            if (!button.getAttribute('data-main-listener')) {
                button.setAttribute('data-main-listener', 'true');
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Quote button clicked from main.js failsafe');
                    
                    // Show the modal
                    quoteModal.classList.add('active');
                    document.body.classList.add('modal-open');
                    
                    // Show form, hide confirmation
                    const quoteForm = document.getElementById('quoteRequestForm');
                    const quoteConfirmation = document.querySelector('.quote-confirmation');
                    
                    if (quoteForm) quoteForm.style.display = 'flex';
                    if (quoteConfirmation) quoteConfirmation.style.display = 'none';
                    
                    // Focus first field
                    const fullNameField = document.getElementById('fullName');
                    if (fullNameField) {
                        setTimeout(() => {
                            fullNameField.focus();
                        }, 100);
                    }
                });
            }
        });
        
        // Close button
        const quoteModalClose = document.getElementById('quoteModalClose');
        if (quoteModalClose && !quoteModalClose.getAttribute('data-main-close-listener')) {
            quoteModalClose.setAttribute('data-main-close-listener', 'true');
            
            quoteModalClose.addEventListener('click', function() {
                quoteModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
        }
        
        // Click outside to close
        if (!quoteModal.getAttribute('data-main-outside-click')) {
            quoteModal.setAttribute('data-main-outside-click', 'true');
            
            quoteModal.addEventListener('click', function(e) {
                if (e.target === quoteModal) {
                    quoteModal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            });
        }
    }
} 