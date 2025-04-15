// Header JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize header functionality
    setupHeaderScroll();
    setupMobileMenu();
    setActiveNavItem();
});

// Handle header scroll behavior
function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    const scrollThreshold = 50;
    
    // Add scrolled class on page load if already scrolled
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    }
    
    // Add or remove scrolled class based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Handle mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;
    const menu = document.querySelector('.main-navigation');
    
    if (!menuToggle) return;
    
    // If already initialized by mobile-nav.js, skip setup
    if (menuToggle.getAttribute('data-initialized') === 'true') {
        console.log('Mobile menu already initialized by mobile-nav.js');
        return;
    }
    
    // Mark as initialized
    menuToggle.setAttribute('data-initialized', 'true');
    
    menuToggle.addEventListener('click', function() {
        // Toggle mobile menu open state
        body.classList.toggle('mobile-menu-open');
        
        // Update aria-expanded attribute
        const isExpanded = body.classList.contains('mobile-menu-open');
        menuToggle.setAttribute('aria-expanded', isExpanded);
        
        // Update icon
        menuToggle.innerHTML = isExpanded ? 
            '<i class="fas fa-times"></i>' : 
            '<i class="fas fa-bars"></i>';
            
        // Toggle body scroll
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        // Log for debugging
        console.log('Mobile menu toggled:', isExpanded ? 'open' : 'closed');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (body.classList.contains('mobile-menu-open') && 
            !menu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            body.classList.remove('mobile-menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when escape key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && body.classList.contains('mobile-menu-open')) {
            body.classList.remove('mobile-menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });
}

// Set active nav item based on current page
function setActiveNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Check if this is the current page
        if (
            (currentPath === '/' || currentPath === '/index.html') && linkPath === 'index.html' ||
            (currentPath.includes('services') && linkPath === 'services.html') ||
            (currentPath.includes('about') && linkPath === 'about.html') ||
            (currentPath.includes('contact') && linkPath === 'contact.html') ||
            (currentPath.includes('careers') && linkPath === 'careers.html')
        ) {
            link.classList.add('active');
        }
    });
} 