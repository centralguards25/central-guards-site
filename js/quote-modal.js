/**
 * Quote Request Modal - CentralGuards
 * Handles the display and functionality of the quote request popup
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const quoteModal = document.getElementById('quoteModal');
    const quoteForm = document.getElementById('quoteRequestForm');
    const quoteConfirmation = document.querySelector('.quote-confirmation');
    const quoteButtons = document.querySelectorAll('#getQuoteBtn, #footerQuoteBtn, #ctaQuoteBtn');
    const quoteModalClose = document.getElementById('quoteModalClose');
    const closeConfirmationBtn = document.querySelector('.close-confirmation-btn');
    const quoteSubmitBtn = document.querySelector('#quoteRequestForm .submit-btn');
    const quoteResetBtn = document.querySelector('#quoteRequestForm .reset-btn');
    
    // Log important elements for debugging
    console.log('Quote modal found:', quoteModal ? 'Yes' : 'No');
    console.log('Quote form found:', quoteForm ? 'Yes' : 'No');
    
    // Handle preferred contact method changes
    const contactMethodRadios = document.querySelectorAll('input[name="preferredContact"]');
    
    // Only setup if the elements exist on this page
    if (contactMethodRadios.length > 0) {
        // Initial call to set up fields based on default selection
        handleContactMethodChange();
        
        // Add event listeners to radios
        contactMethodRadios.forEach(radio => {
            radio.addEventListener('change', handleContactMethodChange);
        });
    }
    
    // Function to handle contact method change
    function handleContactMethodChange() {
        const selectedMethod = document.querySelector('input[name="preferredContact"]:checked');
        
        if (!selectedMethod) return;
        
        const conditionalFieldContainer = document.getElementById('conditionalField');
        
        // If container doesn't exist yet, create it
        if (!conditionalFieldContainer) {
            const container = document.createElement('div');
            container.id = 'conditionalField';
            container.className = 'conditional-field';
            
            // Find where to insert the conditional field
            const radioGroup = document.querySelector('.radio-group');
            if (radioGroup) {
                radioGroup.parentNode.appendChild(container);
            }
        }
        
        // Get reference again (it might have just been created)
        const container = document.getElementById('conditionalField');
        
        // Update the conditional field based on selection
        if (selectedMethod.value === 'phone') {
            // Show preferred time for phone calls
            container.innerHTML = `
                <div class="form-group">
                    <label for="preferredTime">Preferred Call Time</label>
                    <select id="preferredTime" name="preferredTime">
                        <option value="morning">Morning (8AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                        <option value="evening">Evening (5PM - 8PM)</option>
                    </select>
                </div>
            `;
            container.style.display = 'block';
        } else if (selectedMethod.value === 'email') {
            // Hide the container
            container.style.display = 'none';
        } else {
            // For "either", show preference option with simpler structure
            container.innerHTML = `
                <div class="form-group">
                    <label for="contactPreference">Primary Preference</label>
                    <select id="contactPreference" name="contactPreference">
                        <option value="email-preferred">Email Preferred</option>
                        <option value="phone-preferred">Phone Preferred</option>
                    </select>
                </div>
            `;
            // Apply a left border to the container
            container.style.display = 'block';
            container.style.borderLeft = '3px solid #0056b3';
            container.style.padding = '10px 15px';
            container.style.backgroundColor = '#f8f9fa';
            container.style.marginTop = '10px';
            container.style.borderRadius = '4px';
        }
    }
    
    // Function to open the quote modal
    function openQuoteModal(serviceType = '') {
        console.log('Opening quote modal with service type:', serviceType);
        
        // Check if modal exists
        if (!quoteModal) {
            console.error('Quote modal element not found!');
            return;
        }
        
        // If a service type is specified, select it in the dropdown
        if (serviceType) {
            const serviceSelect = document.getElementById('serviceInterest');
            if (serviceSelect) {
                for (let i = 0; i < serviceSelect.options.length; i++) {
                    if (serviceSelect.options[i].value === serviceType) {
                        serviceSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        }
        
        // Show the form, hide the confirmation
        if (quoteForm) quoteForm.style.display = 'flex';
        if (quoteConfirmation) quoteConfirmation.style.display = 'none';
        
        // Show the modal
        quoteModal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Focus on the first input field
        const fullNameField = document.getElementById('fullName');
        if (fullNameField) fullNameField.focus();
        
        // Trigger the contact method handler to show the appropriate field
        handleContactMethodChange();
    }
    
    // Function to close the quote modal
    function closeQuoteModal() {
        if (!quoteModal) return;
        quoteModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Debug information
    console.log('Quote buttons found:', quoteButtons.length);
    quoteButtons.forEach((btn, index) => {
        console.log(`Button ${index + 1} id:`, btn.id);
    });
    
    // Attach click event to all "Request a Quote" buttons
    quoteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Quote button clicked:', button.id);
            e.preventDefault();
            
            // If coming from a service page, pre-select the service
            let serviceType = '';
            if (window.location.pathname.includes('services')) {
                // Check which tab is active
                const activeTab = document.querySelector('.category-tab.active');
                if (activeTab) {
                    serviceType = activeTab.getAttribute('data-category');
                }
            }
            
            openQuoteModal(serviceType);
        });
    });
    
    // Close modal when clicking the close button
    if (quoteModalClose) {
        quoteModalClose.addEventListener('click', closeQuoteModal);
    }
    
    // Close modal when clicking outside the modal content
    if (quoteModal) {
        quoteModal.addEventListener('click', function(e) {
            if (e.target === quoteModal) {
                closeQuoteModal();
            }
        });
    }
    
    // Close modal on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && quoteModal && quoteModal.classList.contains('active')) {
            closeQuoteModal();
        }
    });

    // Form submission handling
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (!fullName || !email || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show loading state
            quoteSubmitBtn.disabled = true;
            quoteSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            // Simulate API request (would be a real API call in production)
            setTimeout(function() {
                // Hide form and show confirmation
                quoteForm.style.display = 'none';
                quoteConfirmation.style.display = 'block';
                
                // Reset form for next time
                quoteForm.reset();
                quoteSubmitBtn.disabled = false;
                quoteSubmitBtn.innerHTML = 'Submit Request';
            }, 1500);
        });
    }
    
    // Reset button handling
    if (quoteResetBtn) {
        quoteResetBtn.addEventListener('click', function() {
            quoteForm.reset();
            handleContactMethodChange();
        });
    }
    
    // Close confirmation button
    if (closeConfirmationBtn) {
        closeConfirmationBtn.addEventListener('click', closeQuoteModal);
    }
    
    // Export openQuoteModal to global scope for console testing
    window.openQuoteModal = openQuoteModal;
    
    // Function to remove standalone quote forms
    function removeStandaloneQuoteForms() {
        // Find and remove any standalone forms
        const forms = document.querySelectorAll('form#quoteRequestForm');
        forms.forEach(form => {
            // Check if this form is inside the modal
            let isInModal = false;
            let parent = form.parentElement;
            while (parent) {
                if (parent.id === 'quoteModal' || parent.classList.contains('quote-modal')) {
                    isInModal = true;
                    break;
                }
                parent = parent.parentElement;
            }
            
            // Remove all standalone forms except those in modals
            if (!isInModal && form !== quoteForm) {
                console.log('Removing standalone form:', form);
                
                // Also check if there's a heading before it
                const prevEl = form.previousElementSibling;
                if (prevEl && prevEl.tagName === 'H3' && 
                    prevEl.textContent.includes('Request a Free Security Consultation')) {
                    prevEl.remove();
                }
                
                form.remove();
            }
        });
        
        // Find and remove any section with "Request a Free Security Consultation"
        const sections = document.querySelectorAll('section, div.section');
        sections.forEach(section => {
            // Skip if this is the quote modal itself
            if (section.id === 'quoteModal' || 
                (typeof section.closest === 'function' && section.closest && section.closest('#quoteModal'))) {
                return;
            }
            
            // Check if this section contains the text
            if (section.textContent && section.textContent.includes('Request a Free Security Consultation')) {
                // Make sure it's not inside the modal
                let isInModal = false;
                let parent = section.parentElement;
                
                while (parent) {
                    if (parent.id === 'quoteModal' || parent.classList.contains('quote-modal-overlay')) {
                        isInModal = true;
                        break;
                    }
                    parent = parent.parentElement;
                }
                
                // If not in modal, remove it
                if (!isInModal) {
                    console.log('Removing section containing quote form:', section);
                    section.remove();
                }
            }
        });
        
        // Also find and remove any heading elements that might be part of the form section
        const headings = document.querySelectorAll('h2, h3, h4');
        headings.forEach(heading => {
            if (heading.textContent && 
                heading.textContent.includes('Request a Free Security Consultation') && 
                !heading.closest('#quoteModal')) {
                
                // Check if it's followed by a form or form-like container
                let nextEl = heading.nextElementSibling;
                let shouldRemove = false;
                
                // Check if next elements look like form-related content
                while (nextEl) {
                    if (nextEl.tagName === 'FORM' || 
                        nextEl.classList.contains('form-group') ||
                        nextEl.classList.contains('form-content') ||
                        nextEl.classList.contains('form-container')) {
                        shouldRemove = true;
                        nextEl.remove();
                    } else if (nextEl.tagName === 'DIV' && !nextEl.id) {
                        // Potentially a container for the form
                        const formInside = nextEl.querySelector('form, .form-group, .input-group');
                        if (formInside) {
                            shouldRemove = true;
                            nextEl.remove();
                        } else {
                            break;
                        }
                    } else {
                        break;
                    }
                    nextEl = heading.nextElementSibling;
                }
                
                if (shouldRemove) {
                    console.log('Removing consultation heading and related elements:', heading);
                    heading.remove();
                }
            }
        });
    }
    
    // Execute immediately
    removeStandaloneQuoteForms();
    
    // And again after a delay to catch dynamically added content
    setTimeout(removeStandaloneQuoteForms, 500);
    setTimeout(removeStandaloneQuoteForms, 1500);  // Add an additional check after more time
    
    // Also set a MutationObserver to clean up any dynamically added forms
    const observer = new MutationObserver(function(mutations) {
        removeStandaloneQuoteForms();
    });
    
    // Start observing the document body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });
}); 