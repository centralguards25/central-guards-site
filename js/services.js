// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Services Category Tabs
    initCategoryTabs();
    
    // Initialize the stories slider
    initStoriesSlider();
    
    // Check if hash exists and activate the appropriate tab
    handleUrlHash();
    
    // Ensure quote buttons work properly
    ensureQuoteButtonsWork();
});

// Function to initialize the category tabs
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const tabContents = document.querySelectorAll('.category-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const category = tab.getAttribute('data-category');
            
            // Find the tab content with the matching ID
            if (category === 'physical') {
                document.getElementById('physical-security').classList.add('active');
            } else if (category === 'electronic') {
                document.getElementById('electronic-security').classList.add('active');
            } else if (category === 'specialized') {
                document.getElementById('specialized-services').classList.add('active');
            } else if (category === 'consulting') {
                document.getElementById('security-consulting').classList.add('active');
            }
        });
    });
    
    // Activate the first tab by default if not already activated by URL hash
    if (tabs.length > 0) {
        // Check if URL has a hash that corresponds to a tab
        const hash = window.location.hash;
        if (hash) {
            // Try to find tab that should be activated based on the hash
            const targetTab = document.querySelector(`.category-tab[data-category="${hash.replace('#', '').replace('-security', '')}"]`);
            if (targetTab) {
                targetTab.click();
                // Scroll to the tab section with a slight delay to ensure content is visible
                setTimeout(() => {
                    document.getElementById('service-categories').scrollIntoView({ behavior: 'smooth' });
                }, 100);
                return;
            }
        }
        // If no hash or corresponding tab found, activate first tab
        tabs[0].click();
    }
}

// Function to initialize the slider for success stories
function initStoriesSlider() {
    const stories = document.querySelectorAll('.story-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.story-prev');
    const nextBtn = document.querySelector('.story-next');
    let currentIndex = 0;
    
    // Function to show a specific story
    function showStory(index) {
        // Hide all stories
        stories.forEach(story => {
            story.style.display = 'none';
        });
        
        // Remove active class from all indicators
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // Show the current story and activate its indicator
        stories[index].style.display = 'block';
        indicators[index].classList.add('active');
        
        // Update current index
        currentIndex = index;
    }
    
    // Event listener for the previous button
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let index = currentIndex - 1;
            if (index < 0) {
                index = stories.length - 1;
            }
            showStory(index);
        });
    }
    
    // Event listener for the next button
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let index = currentIndex + 1;
            if (index >= stories.length) {
                index = 0;
            }
            showStory(index);
        });
    }
    
    // Event listeners for the indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showStory(index);
        });
    });
    
    // Show the first story by default
    if (stories.length > 0) {
        showStory(0);
    }
}

// Smooth scrolling for "Learn More" buttons
document.querySelectorAll('.learn-more-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the target section ID from the button's href attribute
        const targetId = this.getAttribute('href');
        
        // Scroll to the target section smoothly
        document.querySelector(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation for service items (on scroll)
window.addEventListener('scroll', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const triggerBottom = window.innerHeight * 0.8;
    
    serviceItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        
        if (itemTop < triggerBottom) {
            item.classList.add('animate');
        }
    });
});

// Function to handle URL hash for direct links to tabs
function handleUrlHash() {
    const hash = window.location.hash;
    if (hash) {
        let categoryName = '';
        let specificService = null;
        
        // Check for specific service ID
        if (hash === '#maritime-security') {
            categoryName = 'specialized';
            specificService = 'maritime-security';
        } 
        // Map hash values to category names
        else if (hash === '#physical-security') {
            categoryName = 'physical';
        } else if (hash === '#electronic-security') {
            categoryName = 'electronic';
        } else if (hash === '#specialized-services') {
            categoryName = 'specialized';
        } else if (hash === '#security-consulting') {
            categoryName = 'consulting';
        }
        
        if (categoryName) {
            const targetTab = document.querySelector(`.category-tab[data-category="${categoryName}"]`);
            if (targetTab) {
                // Click the tab to activate it
                targetTab.click();
                
                // Scroll to the specific service if needed
                if (specificService) {
                    setTimeout(() => {
                        const serviceElement = document.getElementById(specificService);
                        if (serviceElement) {
                            serviceElement.scrollIntoView({ behavior: 'smooth' });
                            
                            // Add a highlight effect to make it stand out
                            serviceElement.classList.add('highlight-service');
                            setTimeout(() => {
                                serviceElement.classList.remove('highlight-service');
                            }, 2000);
                        }
                    }, 300);
                } else {
                    // Scroll to the tab section
                    setTimeout(() => {
                        document.getElementById('service-categories').scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        }
    }
}

// Function to ensure quote buttons work properly
function ensureQuoteButtonsWork() {
    // Find all quote buttons on the services page
    const quoteButtons = document.querySelectorAll('#getQuoteBtn, #footerQuoteBtn, #ctaQuoteBtn');
    
    console.log('Services page quote buttons check - found:', quoteButtons.length);
    
    // If the quote-modal.js hasn't bound these buttons yet, add our own listeners
    quoteButtons.forEach(button => {
        if (!button.getAttribute('data-quote-listener-added')) {
            button.setAttribute('data-quote-listener-added', 'true');
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Quote button clicked from services.js fallback handler');
                
                // Get the quote modal
                const quoteModal = document.getElementById('quoteModal');
                if (!quoteModal) {
                    console.error('Quote modal not found!');
                    return;
                }
                
                // Get current service category if available
                let serviceType = '';
                const activeTab = document.querySelector('.category-tab.active');
                if (activeTab) {
                    serviceType = activeTab.getAttribute('data-category');
                }
                
                // Pre-select service in dropdown if available
                const serviceSelect = document.getElementById('serviceInterest');
                if (serviceSelect && serviceType) {
                    for (let i = 0; i < serviceSelect.options.length; i++) {
                        if (serviceSelect.options[i].value === serviceType + '-security' || 
                            serviceSelect.options[i].value === serviceType + '-services') {
                            serviceSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
                
                // Show the form, hide confirmation
                const quoteForm = document.getElementById('quoteRequestForm');
                const quoteConfirmation = document.querySelector('.quote-confirmation');
                
                if (quoteForm) quoteForm.style.display = 'flex';
                if (quoteConfirmation) quoteConfirmation.style.display = 'none';
                
                // Show the modal
                quoteModal.classList.add('active');
                document.body.classList.add('modal-open');
                
                // Focus first field
                const fullNameField = document.getElementById('fullName');
                if (fullNameField) {
                    setTimeout(() => {
                        fullNameField.focus();
                    }, 100);
                }
                
                // If the openQuoteModal function exists in global scope, use that instead
                if (window.openQuoteModal && typeof window.openQuoteModal === 'function') {
                    window.openQuoteModal(serviceType);
                    return;
                }
            });
        }
    });
    
    // Also add event listeners to close buttons
    const quoteModalClose = document.getElementById('quoteModalClose');
    if (quoteModalClose && !quoteModalClose.getAttribute('data-close-listener-added')) {
        quoteModalClose.setAttribute('data-close-listener-added', 'true');
        
        quoteModalClose.addEventListener('click', function() {
            const quoteModal = document.getElementById('quoteModal');
            if (quoteModal) {
                quoteModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    // Close when clicking outside the modal
    const quoteModal = document.getElementById('quoteModal');
    if (quoteModal && !quoteModal.getAttribute('data-click-outside-added')) {
        quoteModal.setAttribute('data-click-outside-added', 'true');
        
        quoteModal.addEventListener('click', function(e) {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }
} 