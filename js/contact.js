/**
 * Contact Page JavaScript - CentralGuards
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Components
    initContactForm();
    initLocationTabs();
    initFaqAccordion();
    initSmoothScroll();
    handleUrlParameters();
});

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    // Get the hero CTA button
    const heroCta = document.querySelector('.hero-cta');
    
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                
                // Calculate the target position
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on first form field after scrolling
                setTimeout(function() {
                    const firstInput = targetElement.querySelector('input[type="text"]');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    }
}

/**
 * Initialize the contact form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.form-success-message');
    const newMessageBtn = document.getElementById('newMessageBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                companyName: document.getElementById('companyName').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
                urgentRequest: document.getElementById('urgentRequest').checked
            };
            
            // Validate form data
            if (!validateForm(formData)) {
                return;
            }
            
            // Simulate form submission (replace with actual API call in production)
            simulateFormSubmission(formData);
        });
    }
    
    // Handle "Send Another Message" button click
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function(e) {
            e.preventDefault();
            successMessage.style.display = 'none';
            contactForm.reset();
            contactForm.style.display = 'block';
        });
    }
}

/**
 * Validate form data
 * @param {Object} formData - The form data to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(formData) {
    // Check required fields
    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(formData.email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Check if an email address is valid
 * @param {string} email - The email address to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Simulate form submission (replace with actual API call in production)
 * @param {Object} formData - The form data to submit
 */
function simulateFormSubmission(formData) {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.form-success-message');
    const referenceNumber = document.getElementById('reference-number');
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call delay
    setTimeout(function() {
        // Generate a reference number
        const refNumber = `CG-${new Date().getTime().toString().substr(-8)}`;
        referenceNumber.textContent = refNumber;
        
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Log form data (for demo purposes)
        console.log('Form submitted:', formData);
    }, 1500);
}

/**
 * Initialize location tabs for the map section
 */
function initLocationTabs() {
    const locationTabs = document.querySelectorAll('.location-tab');
    const mapIframe = document.querySelector('.map-responsive iframe');
    
    if (locationTabs.length > 0 && mapIframe) {
        // Map location URLs
        const locationMaps = {
            headquarters: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sus!4v1592939158799!5m2!1sen!2sus',
            east: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175905899304!2d-73.98602908400426!3d40.75889997932592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1592939251401!5m2!1sen!2sus',
            west: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.24368308425228!3d34.05361748060504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b85dea2a93%3A0x1ff47c3ceb7a6f3b!2sLos%20Angeles%20City%20Hall!5e0!3m2!1sen!2sus!4v1592939303476!5m2!1sen!2sus'
        };
        
        // Add click event to each tab
        locationTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                locationTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Update map based on selected location
                const location = this.getAttribute('data-location');
                if (location && locationMaps[location]) {
                    mapIframe.src = locationMaps[location];
                }
            });
        });
    }
}

/**
 * Initialize the FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.new-faq-item');
    
    // First, set all closed except the first one (or one with active class)
    faqItems.forEach((faqItem, index) => {
        const content = faqItem.querySelector('.new-faq-content');
        const contentInner = faqItem.querySelector('.new-faq-content-inner');
        
        if (!faqItem.classList.contains('active')) {
            content.style.maxHeight = '0';
        } else {
            // Calculate the proper height including padding
            content.style.maxHeight = contentInner.offsetHeight + 40 + 'px'; // 20px top + 20px bottom padding
        }
    });
    
    // Add click handlers
    faqItems.forEach(item => {
        const header = item.querySelector('.new-faq-header');
        const content = item.querySelector('.new-faq-content');
        const contentInner = item.querySelector('.new-faq-content-inner');
        
        header.addEventListener('click', function() {
            // Check if this item is already active
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.new-faq-content').style.maxHeight = '0';
            });
            
            // If this item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                // Add extra padding to height calculation
                content.style.maxHeight = contentInner.offsetHeight + 40 + 'px'; // 20px top + 20px bottom padding
                
                // Scroll the item into view (if it's not fully visible)
                setTimeout(() => {
                    const itemRect = item.getBoundingClientRect();
                    if (itemRect.top < 0 || itemRect.bottom > window.innerHeight) {
                        const headerHeight = document.querySelector('.site-header').offsetHeight;
                        window.scrollTo({
                            top: item.offsetTop - headerHeight - 20,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        });
    });
}

/**
 * Handle URL parameters to pre-fill the contact form
 */
function handleUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const serviceParam = urlParams.get('service');
    
    if (serviceParam && document.getElementById('subject')) {
        // Pre-fill subject with service if available
        const subjectField = document.getElementById('subject');
        subjectField.value = 'service';
        
        // Pre-fill message with service information
        if (document.getElementById('message')) {
            const messageField = document.getElementById('message');
            messageField.value = `I'm interested in learning more about your ${serviceParam} services.`;
        }
        
        // Check urgent checkbox if parameter is present
        const urgentParam = urlParams.get('urgent');
        if (urgentParam === 'true' && document.getElementById('urgentRequest')) {
            document.getElementById('urgentRequest').checked = true;
        }
        
        // Scroll to contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            setTimeout(() => {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = contactForm.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
} 