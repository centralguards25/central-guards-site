document.addEventListener('DOMContentLoaded', function() {
    console.log('Quote Button Handler Initialized');
    
    // Find all quote buttons across the site
    const quoteButtons = document.querySelectorAll('#getQuoteBtn, #footerQuoteBtn, #ctaQuoteBtn, .quote-btn');
    console.log(`Found ${quoteButtons.length} quote buttons`);
    
    // Check if openQuoteModal is already available (from quote-modal.js)
    if (typeof window.openQuoteModal === 'function') {
        console.log('openQuoteModal function is available');
        attachEventListeners();
    } else {
        console.log('openQuoteModal function not found, waiting for it to be defined');
        // Check again after a short delay to allow other scripts to load
        setTimeout(function() {
            if (typeof window.openQuoteModal === 'function') {
                console.log('openQuoteModal function now available');
                attachEventListeners();
            } else {
                console.error('openQuoteModal function is still not available');
            }
        }, 500);
    }
    
    function attachEventListeners() {
        // Attach click event listener to all quote buttons
        quoteButtons.forEach(button => {
            if (button) {
                button.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    // Get service type if present in button data attribute
                    const serviceType = this.getAttribute('data-service-type');
                    console.log(`Quote button clicked, service type: ${serviceType || 'not specified'}`);
                    
                    // Open the quote modal with the service type if available
                    window.openQuoteModal(serviceType);
                });
                console.log(`Event listener attached to button: ${button.id || 'unnamed button'}`);
            }
        });
    }
}); 