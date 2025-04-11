document.addEventListener('DOMContentLoaded', function() {
    initJobSearch();
    initJobFilters();
    initFaqAccordion();
});

/**
 * Initialize the job search functionality
 */
function initJobSearch() {
    const searchForm = document.getElementById('job-search-form');
    const resultsContainer = document.getElementById('search-results');
    const loadingState = document.getElementById('loading-state');
    const jobCards = document.getElementById('job-cards');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        if (loadingState) loadingState.style.display = 'block';
        if (jobCards) jobCards.style.display = 'none';
        if (noResults) noResults.style.display = 'none';
        
        // Get form values
        const keyword = document.getElementById('search-keyword').value;
        const location = document.getElementById('search-location').value;
        const department = document.getElementById('search-department').value;
        const jobType = document.getElementById('search-job-type').value;
        
        // Simulate API call with setTimeout
        setTimeout(function() {
            // Hide loading state
            if (loadingState) loadingState.style.display = 'none';
            
            // Check if there are matching jobs based on filters
            const hasResults = simulateJobSearch(keyword, location, department, jobType);
            
            if (hasResults) {
                if (jobCards) jobCards.style.display = 'grid';
                if (noResults) noResults.style.display = 'none';
                if (resultsCount) resultsCount.textContent = 'Showing 6 matching positions';
            } else {
                if (jobCards) jobCards.style.display = 'none';
                if (noResults) noResults.style.display = 'block';
                if (resultsCount) resultsCount.textContent = '0 matching positions';
            }
        }, 1000);
    });
    
    // Initialize suggested searches
    initSuggestedSearches();
}

/**
 * Simulate job search results based on filters
 * This would be replaced with actual API calls in production
 */
function simulateJobSearch(keyword, location, department, jobType) {
    // This is just a simple simulation
    // In a real application, this would call an API endpoint
    
    // Default to showing results unless specific filters are applied
    if (keyword.toLowerCase().includes('unicorn') || 
        location.toLowerCase() === 'mars' ||
        (department === 'engineering' && jobType === 'remote' && location.toLowerCase() === 'alaska')) {
        return false;
    }
    
    return true;
}

/**
 * Initialize suggested searches functionality
 */
function initSuggestedSearches() {
    const suggestedItems = document.querySelectorAll('.suggested-search-item');
    const keywordInput = document.getElementById('search-keyword');
    const locationInput = document.getElementById('search-location');
    const departmentSelect = document.getElementById('search-department');
    const jobTypeSelect = document.getElementById('search-job-type');
    const searchForm = document.getElementById('job-search-form');
    
    suggestedItems.forEach(item => {
        item.addEventListener('click', function() {
            const searchType = this.getAttribute('data-type');
            const searchValue = this.getAttribute('data-value');
            
            // Set the appropriate form field
            switch(searchType) {
                case 'keyword':
                    if (keywordInput) keywordInput.value = searchValue;
                    break;
                case 'location':
                    if (locationInput) locationInput.value = searchValue;
                    break;
                case 'department':
                    if (departmentSelect) {
                        const options = departmentSelect.options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].value === searchValue) {
                                departmentSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                    break;
                case 'job-type':
                    if (jobTypeSelect) {
                        const options = jobTypeSelect.options;
                        for (let i = 0; i < options.length; i++) {
                            if (options[i].value === searchValue) {
                                jobTypeSelect.selectedIndex = i;
                                break;
                            }
                        }
                    }
                    break;
            }
            
            // Submit the form
            if (searchForm) searchForm.dispatchEvent(new Event('submit'));
        });
    });
}

/**
 * Initialize the job filter functionality
 */
function initJobFilters() {
    const clearBtn = document.getElementById('clear-filters');
    const searchKeyword = document.getElementById('search-keyword');
    const searchLocation = document.getElementById('search-location');
    const searchDepartment = document.getElementById('search-department');
    const searchJobType = document.getElementById('search-job-type');
    const searchForm = document.getElementById('job-search-form');
    
    if (!clearBtn) return;
    
    clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear all form fields
        if (searchKeyword) searchKeyword.value = '';
        if (searchLocation) searchLocation.value = '';
        if (searchDepartment) searchDepartment.selectedIndex = 0;
        if (searchJobType) searchJobType.selectedIndex = 0;
        
        // Submit the form to refresh results
        if (searchForm) searchForm.dispatchEvent(new Event('submit'));
    });
}

/**
 * Initialize the FAQ accordion functionality
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other open items (optional)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
}

/**
 * Handle the job application form submission
 */
function handleJobApplication(jobId, jobTitle) {
    // This function would be called when clicking "Apply" on a job card
    // In a real application, this might redirect to an application form
    // or open a modal with the application form
    
    // For now, we'll just console log and alert
    console.log(`Applying for job: ${jobTitle} (ID: ${jobId})`);
    alert(`Thank you for your interest in the ${jobTitle} position. The application form will open now.`);
    
    // Here you would normally redirect or open a modal
    // window.location.href = `/apply.html?job=${jobId}&title=${encodeURIComponent(jobTitle)}`;
}

/**
 * Initialize job detail view when clicking on a job
 */
function viewJobDetails(jobId) {
    // Navigate to the job details page
    window.location.href = `job-detail.html?id=${jobId}`;
}

/**
 * Handle social sharing of job postings
 */
function shareJob(jobId, jobTitle, platform) {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`Check out this job opportunity: ${jobTitle} at CentralGuards Security Services`);
    let shareLink = '';
    
    switch(platform) {
        case 'facebook':
            shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
            break;
        case 'twitter':
            shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
            break;
        case 'linkedin':
            shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareTitle}`;
            break;
        case 'email':
            shareLink = `mailto:?subject=${shareTitle}&body=I thought you might be interested in this job: ${shareUrl}`;
            break;
    }
    
    if (shareLink) {
        window.open(shareLink, '_blank');
    }
} 