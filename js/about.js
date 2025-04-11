/**
 * About Page JavaScript
 * Handles functionality specific to the About page, including executive bio popups
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('About Page Initialized');
    setupBioPopups();
    setupScrollEffects();
});

/**
 * Sets up the executive bio popups
 * When a user clicks on an executive card, show their bio in a popup
 */
function setupBioPopups() {
    // Elements
    const executiveCards = document.querySelectorAll('.executive-card');
    const bioPopupOverlay = document.getElementById('bioPopupOverlay');
    const bioPopupClose = document.getElementById('bioPopupClose');
    const bioPopups = document.querySelectorAll('.bio-popup');
    
    if (!executiveCards.length || !bioPopupOverlay || !bioPopupClose) return;
    
    // Open popup when clicking on an executive card
    executiveCards.forEach(card => {
        card.addEventListener('click', function() {
            const executiveId = this.getAttribute('data-executive');
            
            // Hide all popups first
            bioPopups.forEach(popup => {
                popup.classList.remove('active');
            });
            
            // Show the selected executive's popup
            const targetPopup = document.getElementById(executiveId);
            if (targetPopup) {
                targetPopup.classList.add('active');
                bioPopupOverlay.classList.add('active');
                
                // Prevent scrolling on the body
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close popup when clicking the close button
    bioPopupClose.addEventListener('click', function() {
        bioPopupOverlay.classList.remove('active');
        
        // Re-enable scrolling on the body
        document.body.style.overflow = '';
        
        // Hide all popups
        bioPopups.forEach(popup => {
            popup.classList.remove('active');
        });
    });
    
    // Close popup when clicking outside the popup content
    bioPopupOverlay.addEventListener('click', function(e) {
        // Check if the click was directly on the overlay (not its children)
        if (e.target === bioPopupOverlay) {
            bioPopupOverlay.classList.remove('active');
            
            // Re-enable scrolling on the body
            document.body.style.overflow = '';
            
            // Hide all popups
            bioPopups.forEach(popup => {
                popup.classList.remove('active');
            });
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && bioPopupOverlay.classList.contains('active')) {
            bioPopupOverlay.classList.remove('active');
            
            // Re-enable scrolling on the body
            document.body.style.overflow = '';
            
            // Hide all popups
            bioPopups.forEach(popup => {
                popup.classList.remove('active');
            });
        }
    });
}

/**
 * Sets up scroll effects for the about page
 * Adds animations when scrolling to different sections
 */
function setupScrollEffects() {
    // Animate value cards on scroll
    const valueCards = document.querySelectorAll('.value-card');
    if (valueCards.length) {
        // Add initial classes
        valueCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        });
        
        // Check if elements are in viewport
        function checkViewport() {
            const valuesSection = document.querySelector('.mission-values-section');
            if (!valuesSection) return;
            
            const sectionTop = valuesSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                valueCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkViewport);
        
        // Check initially
        checkViewport();
    }
    
    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems.length) {
        // Add initial classes
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        });
        
        // Check if elements are in viewport
        function checkTimelineViewport() {
            const historySection = document.querySelector('.history-section');
            if (!historySection) return;
            
            const sectionTop = historySection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                timelineItems.forEach(item => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                });
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkTimelineViewport);
        
        // Check initially
        checkTimelineViewport();
    }
    
    // Add animation to executive cards
    const executiveCards = document.querySelectorAll('.executive-card');
    if (executiveCards.length) {
        // Add initial classes
        executiveCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s ease, transform 0.6s ease ${index * 0.1}s`;
        });
        
        // Check if elements are in viewport
        function checkExecViewport() {
            const leaderSection = document.querySelector('.leadership-section');
            if (!leaderSection) return;
            
            const sectionTop = leaderSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                executiveCards.forEach(card => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            }
        }
        
        // Check on scroll
        window.addEventListener('scroll', checkExecViewport);
        
        // Check initially
        checkExecViewport();
    }
} 