/**
 * Industry Modals - CentralGuards
 * Handles the display and population of industry detail modals
 */

document.addEventListener('DOMContentLoaded', function() {
    // Industry data - this would ideally come from a CMS or API in production
    const industryData = {
        'retail': {
            title: 'Retail Security Solutions',
            icon: 'fas fa-shopping-bag',
            description: 'Comprehensive security solutions tailored for retail environments to prevent theft, protect merchandise, ensure customer safety, and create a positive shopping experience.',
            challenges: [
                'Shoplifting and organized retail crime',
                'Employee theft and internal fraud',
                'Customer and staff safety concerns',
                'After-hours break-ins and vandalism',
                'High-traffic environment management'
            ],
            solutions: [
                'Uniformed security presence for deterrence',
                'Loss prevention specialists (plainclothes)',
                'CCTV monitoring and analytics',
                'Access control for restricted areas',
                'Emergency response procedures',
                'Staff security awareness training'
            ],
            benefits: [
                'Reduced shrinkage and inventory loss',
                'Safer shopping environment for customers',
                'Decreased incidents of theft and fraud',
                'Enhanced brand reputation and shopper confidence',
                'Quick response to security incidents'
            ]
        },
        'healthcare': {
            title: 'Healthcare Security Services',
            icon: 'fas fa-hospital',
            description: 'Specialized security services for healthcare facilities that balance safety measures with a compassionate approach, ensuring protection for patients, staff, and visitors.',
            challenges: [
                'Patient and visitor safety',
                'Protection of pharmaceuticals and equipment',
                'Emergency department security',
                'Workplace violence prevention',
                'Regulatory compliance (HIPAA, etc.)',
                ' 24/7 facility accessibility'
            ],
            solutions: [
                'Healthcare-trained security officers',
                'Access control and visitor management',
                'Emergency room security protocols',
                'De-escalation training for security personnel',
                'Infant protection systems',
                'Integration with hospital emergency procedures'
            ],
            benefits: [
                'Enhanced patient and staff safety',
                'Reduced workplace violence incidents',
                'Improved emergency response capabilities',
                'Protection of sensitive medical assets',
                'Compliance with healthcare regulations'
            ]
        },
        'education': {
            title: 'Education Security Programs',
            icon: 'fas fa-school',
            description: 'Tailored security solutions for educational institutions that create safe learning environments while maintaining an open, welcoming atmosphere for students and staff.',
            challenges: [
                'Campus access control',
                'Student and staff safety',
                'Prevention of unauthorized entry',
                'Emergency preparedness',
                'After-hours facility protection',
                'Special event security'
            ],
            solutions: [
                'Campus security officers and patrols',
                'Access control systems',
                'Emergency response planning',
                'Security technology integration',
                'Visitor management systems',
                'Security awareness programs'
            ],
            benefits: [
                'Safer learning environment',
                'Rapid response to incidents',
                'Reduced property damage and theft',
                'Peace of mind for parents and staff',
                'Compliance with educational security standards'
            ]
        },
        'corporate': {
            title: 'Corporate Security Solutions',
            icon: 'fas fa-building',
            description: 'Comprehensive security programs for corporate environments that protect assets, employees, and information while maintaining a professional workplace atmosphere.',
            challenges: [
                'Office and facility access control',
                'Protection of intellectual property',
                'Employee and visitor safety',
                'Emergency evacuation procedures',
                'Executive protection needs',
                'Business continuity threats'
            ],
            solutions: [
                'Professional lobby security personnel',
                'Access control and visitor management',
                'CCTV and security technology integration',
                'Emergency preparedness planning',
                'Executive protection services',
                'Security risk assessments'
            ],
            benefits: [
                'Enhanced workplace safety and security',
                'Protection of sensitive corporate assets',
                'Professional first impression for visitors',
                'Improved emergency response capabilities',
                'Reduced security incidents and business disruption'
            ]
        },
        'financial': {
            title: 'Financial Institution Security',
            icon: 'fas fa-university',
            description: 'Specialized security services for banks, credit unions, and financial institutions that protect assets, employees, and customers while deterring criminal activity.',
            challenges: [
                'Robbery and theft prevention',
                'Protection of cash and valuables',
                'ATM security',
                'Customer and employee safety',
                'Compliance with regulatory requirements',
                'Fraud prevention'
            ],
            solutions: [
                'Armed or unarmed security officers',
                'Cash handling procedures',
                'Branch opening/closing protocols',
                'Electronic security systems',
                'Emergency response protocols',
                'Security risk assessments'
            ],
            benefits: [
                'Decreased risk of robbery and theft',
                'Enhanced customer confidence',
                'Protection of financial assets',
                'Improved regulatory compliance',
                'Quick response to security incidents'
            ]
        },
        'residential': {
            title: 'Residential Security Services',
            icon: 'fas fa-home',
            description: 'Comprehensive security solutions for residential communities that create safe, secure living environments while maintaining resident privacy and quality of life.',
            challenges: [
                'Access control for residents and visitors',
                'Package and delivery management',
                'Common area monitoring',
                'After-hours security',
                'Resident privacy concerns',
                'Property protection'
            ],
            solutions: [
                'Concierge security personnel',
                'Access control systems',
                'CCTV monitoring of common areas',
                'Visitor management protocols',
                'Parking facility security',
                'Patrol services'
            ],
            benefits: [
                'Enhanced resident safety and peace of mind',
                'Increased property values',
                'Reduced unauthorized access',
                'Professional handling of security concerns',
                'Improved resident satisfaction'
            ]
        },
        'manufacturing': {
            title: 'Manufacturing & Industrial Security',
            icon: 'fas fa-industry',
            description: 'Specialized security solutions for manufacturing and industrial facilities that protect personnel, valuable equipment, and intellectual property while maintaining operational efficiency.',
            challenges: [
                'Facility and perimeter security',
                'Protection of equipment and inventory',
                'Employee safety',
                'Intellectual property protection',
                'Hazardous materials security',
                'Regulatory compliance'
            ],
            solutions: [
                'Gated entry and access control',
                'Security officers and patrols',
                'CCTV and monitoring systems',
                'Employee verification systems',
                'Cargo security protocols',
                'Emergency response planning'
            ],
            benefits: [
                'Reduced theft and property damage',
                'Enhanced worker safety',
                'Protection of proprietary processes',
                'Improved regulatory compliance',
                'Minimized operational disruptions'
            ]
        },
        'logistics': {
            title: 'Logistics & Transportation Security',
            icon: 'fas fa-truck',
            description: 'Comprehensive security solutions for logistics operations, warehousing, and transportation networks that protect goods in transit and at rest.',
            challenges: [
                'Cargo theft prevention',
                'Warehouse and distribution center security',
                'Supply chain protection',
                'Driver and vehicle safety',
                'Cross-border security concerns',
                'Compliance with transportation regulations'
            ],
            solutions: [
                'Warehouse security personnel',
                'Cargo monitoring systems',
                'Access control for facilities',
                'Vehicle tracking technology',
                'Security escorts for high-value shipments',
                'Supply chain security assessments'
            ],
            benefits: [
                'Reduced cargo theft and losses',
                'Enhanced supply chain integrity',
                'Improved driver and staff safety',
                'Better regulatory compliance',
                'Protection of customer merchandise'
            ]
        }
    };

    // Create the modal HTML structure if it doesn't exist
    if (!document.getElementById('industryModal')) {
        const modalHTML = `
            <div id="industryModal" class="service-modal-overlay">
                <div class="service-modal">
                    <div class="service-modal-header">
                        <div class="service-modal-icon" id="industryModalIcon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="service-modal-title">
                            <h3 id="industryModalTitle">Industry Security Solutions</h3>
                        </div>
                        <button class="service-modal-close" id="industryModalClose" aria-label="Close modal">&times;</button>
                    </div>
                    <div class="service-modal-body">
                        <div class="service-modal-description" id="industryModalDescription"></div>
                        
                        <div class="service-modal-section">
                            <h4>Common Security Challenges</h4>
                            <ul class="service-modal-list" id="industryModalChallenges"></ul>
                        </div>
                        
                        <div class="service-modal-section">
                            <h4>Our Security Solutions</h4>
                            <ul class="service-modal-list" id="industryModalSolutions"></ul>
                        </div>
                        
                        <div class="service-modal-section">
                            <h4>Key Benefits</h4>
                            <ul class="service-modal-list" id="industryModalBenefits"></ul>
                        </div>
                    </div>
                    <div class="service-modal-footer">
                        <button class="btn btn-primary" id="industryModalContactBtn">Request a Consultation</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // DOM elements
    const industryModal = document.getElementById('industryModal');
    const industryModalClose = document.getElementById('industryModalClose');
    const industryModalTitle = document.getElementById('industryModalTitle');
    const industryModalIcon = document.getElementById('industryModalIcon');
    const industryModalDescription = document.getElementById('industryModalDescription');
    const industryModalChallenges = document.getElementById('industryModalChallenges');
    const industryModalSolutions = document.getElementById('industryModalSolutions');
    const industryModalBenefits = document.getElementById('industryModalBenefits');
    const industryModalContactBtn = document.getElementById('industryModalContactBtn');

    // Make industry cards clickable
    document.querySelectorAll('.industry-card').forEach(card => {
        card.style.cursor = 'pointer';
        
        // Extract industry type from card content
        const title = card.querySelector('h3').textContent.toLowerCase();
        let industryId;
        
        // Map the title to our industry IDs
        if (title.includes('retail')) industryId = 'retail';
        else if (title.includes('healthcare')) industryId = 'healthcare';
        else if (title.includes('education')) industryId = 'education';
        else if (title.includes('corporate') || title.includes('commercial')) industryId = 'corporate';
        else if (title.includes('financial') || title.includes('banking')) industryId = 'financial';
        else if (title.includes('hospitality')) industryId = 'residential';
        else if (title.includes('manufacturing')) industryId = 'manufacturing';
        else if (title.includes('government')) industryId = 'logistics';
        
        if (industryId) {
            card.setAttribute('data-industry', industryId);
            card.addEventListener('click', function() {
                openIndustryModal(industryId);
            });
        }
    });

    // Close modal when clicking the close button
    industryModalClose.addEventListener('click', function() {
        industryModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    // Close modal when clicking outside the modal content
    industryModal.addEventListener('click', function(e) {
        if (e.target === industryModal) {
            industryModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // Close modal on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && industryModal.classList.contains('active')) {
            industryModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // Handle contact button click
    industryModalContactBtn.addEventListener('click', function() {
        const industryTitle = industryModalTitle.textContent;
        window.location.href = `contact.html?service=${encodeURIComponent(industryTitle)}`;
    });

    // Function to open the modal with specific industry data
    function openIndustryModal(industryId) {
        const industry = industryData[industryId];
        
        if (!industry) {
            console.error(`No industry data found for ID: ${industryId}`);
            return;
        }
        
        console.log(`Opening modal for industry: ${industryId}`);
        
        // Populate modal with industry data
        industryModalTitle.textContent = industry.title;
        industryModalIcon.innerHTML = `<i class="${industry.icon}"></i>`;
        industryModalDescription.textContent = industry.description;
        
        // Populate challenges
        industryModalChallenges.innerHTML = '';
        industry.challenges.forEach(challenge => {
            const li = document.createElement('li');
            li.textContent = challenge;
            industryModalChallenges.appendChild(li);
        });
        
        // Populate solutions
        industryModalSolutions.innerHTML = '';
        industry.solutions.forEach(solution => {
            const li = document.createElement('li');
            li.textContent = solution;
            industryModalSolutions.appendChild(li);
        });
        
        // Populate benefits
        industryModalBenefits.innerHTML = '';
        industry.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            industryModalBenefits.appendChild(li);
        });
        
        // Open the modal
        industryModal.classList.add('active');
        document.body.classList.add('modal-open');
        console.log('Modal classes applied:', industryModal.className);
    }
    
    // Add a brief flash notification on first page load to indicate cards are clickable
    setTimeout(() => {
        const industryCardsSection = document.querySelector('.industries-section');
        if (industryCardsSection) {
            const notification = document.createElement('div');
            notification.className = 'industry-cards-notification';
            notification.textContent = 'Click on any industry card to see detailed information';
            industryCardsSection.appendChild(notification);
            
            // Fade in
            setTimeout(() => {
                notification.classList.add('show');
            }, 500);
            
            // Fade out after 5 seconds
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 1000);
            }, 5000);
        }
    }, 2000);
}); 