// Header Scroll JavaScript
// This file is separate from header.js to allow more flexibility in loading scripts

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50; // Amount of scroll before header changes
    
    // Check scroll position on page load
    checkScrollPosition();
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        checkScrollPosition();
    });
    
    // Function to check scroll position and update header accordingly
    function checkScrollPosition() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}); 