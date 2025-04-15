// Mobile Navigation JavaScript - Simplified Version

// Wait for the DOM to be fully loaded
window.addEventListener('load', function() {
    console.log('Mobile nav script loaded - SIMPLIFIED VERSION');
    
    // Get elements
    var menuButton = document.querySelector('.mobile-menu-toggle');
    var navigation = document.querySelector('.main-navigation');
    var body = document.body;
    
    // Check if elements exist
    if (!menuButton || !navigation) {
        console.error('Mobile menu elements not found!');
        return;
    }
    
    console.log('Mobile menu elements found successfully');
    
    // Skip initialization if another script already handled it
    if (menuButton.getAttribute('data-initialized') === 'true') {
        console.log('Mobile menu already initialized by another script');
        return;
    }
    
    // Mark as initialized
    menuButton.setAttribute('data-initialized', 'true');
    
    // Add direct click handler to button
    menuButton.onclick = function(e) {
        console.log('Menu button clicked!');
        
        // Toggle mobile menu open state using the class that's in the CSS
        body.classList.toggle('mobile-menu-open');
        
        // Update aria-expanded attribute
        const isExpanded = body.classList.contains('mobile-menu-open');
        menuButton.setAttribute('aria-expanded', isExpanded);
        
        // Update icon
        menuButton.innerHTML = isExpanded ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
        
        // Toggle body scroll
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Prevent default action
        e.preventDefault();
        return false;
    };
    
    // Add click handlers to all nav links
    var links = document.querySelectorAll('.nav-link, .mobile-utils a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            // Close menu when link is clicked
            body.classList.remove('mobile-menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        };
    }
    
    // Close menu when ESC key is pressed
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && body.classList.contains('mobile-menu-open')) {
            body.classList.remove('mobile-menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    console.log('Mobile menu handlers attached');
}); 