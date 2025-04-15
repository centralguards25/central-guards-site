// Services Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Services Category Tabs
    initCategoryTabs();
    
    // Initialize the stories slider
    initStoriesSlider();
    
    // Check if hash exists and activate the appropriate tab
    handleUrlHash();
    
    // Ensure quote buttons work properly
    // Delay slightly to ensure quote-modal.js has loaded
    setTimeout(ensureQuoteButtonsWork, 100);
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
    console.log('Setting up service page quote buttons...');
    
    // Select all quote buttons
    const quoteButtons = document.querySelectorAll('.request-quote-btn, #getQuoteBtn, #mobilQuoteBtn');
    const quoteModal = document.getElementById('quoteModal');
    
    if (quoteButtons.length > 0 && quoteModal) {
        console.log('Quote buttons found on services page:', quoteButtons.length);
        
        quoteButtons.forEach(button => {
            // Only add listener if not already added
            if (!button.hasAttribute('data-service-listener')) {
                button.setAttribute('data-service-listener', 'true');
                
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Quote button clicked from services.js');
                    
                    // Get service type from button if available
                    const serviceType = this.getAttribute('data-service-type');
                    
                    // Set selected service in dropdown if available
                    if (serviceType) {
                        const serviceSelect = document.getElementById('serviceInterest');
                        if (serviceSelect) {
                            // Find matching option
                            const options = Array.from(serviceSelect.options);
                            const matchingOption = options.find(option => 
                                option.value === serviceType || 
                                option.textContent.toLowerCase().includes(serviceType.toLowerCase())
                            );
                            
                            if (matchingOption) {
                                serviceSelect.value = matchingOption.value;
                            }
                        }
                    }
                    
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
    }
    
    // Close button
    const closeBtn = document.getElementById('quoteModalClose');
    if (closeBtn && quoteModal) {
        closeBtn.addEventListener('click', function() {
            quoteModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }
    
    // Close on overlay click
    if (quoteModal) {
        quoteModal.addEventListener('click', function(e) {
            if (e.target === quoteModal) {
                quoteModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }
} 