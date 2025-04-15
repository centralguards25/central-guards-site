// Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize case studies slider
    initCaseStudiesSlider();
    
    // Other home page initializations...
});

// Case Studies Slider - Product Style
function initCaseStudiesSlider() {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider-nav.next');
    const prevButton = document.querySelector('.slider-nav.prev');
    
    let position = 0;
    let slidesToShow = 3;
    let slideWidth = 0;
    
    // Function to check how many slides should be visible based on screen width
    function checkSlidesToShow() {
        if (window.innerWidth < 768) {
            slidesToShow = 1;
        } else if (window.innerWidth < 992) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
        return slidesToShow;
    }
    
    // Calculate slide width based on container width and slides to show
    function calculateSlideWidth() {
        const containerWidth = track.parentElement.clientWidth;
        slidesToShow = checkSlidesToShow();
        const gap = 20; // gap between slides in px
        
        // Calculate width accounting for gap
        slideWidth = (containerWidth - (gap * (slidesToShow - 1))) / slidesToShow;
        
        // Set width and margin on slides
        slides.forEach(slide => {
            slide.style.minWidth = `${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });
        
        return slideWidth;
    }
    
    // Move to a specific position in the slider
    function moveToPosition(pos) {
        // Calculate max position (rightmost boundary)
        const maxPosition = Math.max(0, slides.length - slidesToShow);
        
        // Ensure position stays within bounds
        if (pos < 0) pos = 0;
        if (pos > maxPosition) pos = maxPosition;
        
        position = pos;
        
        // Calculate pixel offset
        const offset = position * (slideWidth + 20); // 20px is the gap
        track.style.transform = `translateX(-${offset}px)`;
        
        // Update button states
        updateButtonStates();
    }
    
    // Update button enabled/disabled states
    function updateButtonStates() {
        const maxPosition = Math.max(0, slides.length - slidesToShow);
        
        // Enable/disable prev button
        if (position <= 0) {
            prevButton.classList.add('disabled');
            prevButton.setAttribute('disabled', 'disabled');
        } else {
            prevButton.classList.remove('disabled');
            prevButton.removeAttribute('disabled');
        }
        
        // Enable/disable next button
        if (position >= maxPosition) {
            nextButton.classList.add('disabled');
            nextButton.setAttribute('disabled', 'disabled');
        } else {
            nextButton.classList.remove('disabled');
            nextButton.removeAttribute('disabled');
        }
    }
    
    // Initialize slider
    function initSlider() {
        calculateSlideWidth();
        moveToPosition(0);
        
        // Add event listeners
        nextButton.addEventListener('click', () => {
            moveToPosition(position + 1);
        });
        
        prevButton.addEventListener('click', () => {
            moveToPosition(position - 1);
        });
    }
    
    // Initialize slider
    initSlider();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            calculateSlideWidth();
            moveToPosition(position);
        }, 250);
    });
} 