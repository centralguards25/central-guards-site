/**
 * Service Modals - CentralGuards
 * Handles the display and population of service detail modals
 */

document.addEventListener('DOMContentLoaded', function() {
    // Service data - this would ideally come from a CMS or API in production
    const serviceData = {
        'armed-security': {
            title: 'Armed Security Services',
            icon: 'fas fa-user-shield',
            description: 'Our armed security personnel are highly trained professionals with extensive backgrounds in law enforcement or military service. They undergo rigorous screening, certification, and continuous training to ensure top-tier protection for high-risk environments.',
            features: [
                'Licensed and certified armed security officers',
                'Tactical response capabilities',
                'Threat assessment and prevention',
                'Discreet or visible security presence options',
                'Advanced weapons training and certifications',
                'Emergency response protocols'
            ],
            industries: ['Banking & Financial', 'Government', 'High-Value Retail', 'Events', 'Executive Protection'],
            benefits: [
                'Maximum deterrence against violent threats',
                'Rapid response to security incidents',
                'Peace of mind in high-risk environments',
                'Reduced liability through professional management',
                'Customized security protocols for specific threat profiles'
            ]
        },
        'unarmed-security': {
            title: 'Unarmed Security Services',
            icon: 'fas fa-shield-alt',
            description: 'Our unarmed security officers provide vigilant monitoring, access control, and professional security presence without the use of firearms. Ideal for environments where visible security is needed without the escalated presence of armed personnel.',
            features: [
                'Professionally trained security officers',
                'Access control management',
                'Visitor screening and processing',
                'Regular patrol services',
                'Incident reporting and documentation',
                'Customer service-oriented approach'
            ],
            industries: ['Commercial Real Estate', 'Retail', 'Healthcare', 'Education', 'Hospitality', 'Corporate Offices'],
            benefits: [
                'Cost-effective security solution',
                'Approachable security presence',
                'Reduced liability concerns',
                'Enhanced customer/visitor experience',
                'Scalable coverage for various facility sizes'
            ]
        },
        'mobile-patrol': {
            title: 'Mobile Patrol Services',
            icon: 'fas fa-car',
            description: 'Our mobile patrol services provide intermittent security coverage with marked vehicles and uniformed officers. This service offers flexible, cost-effective security through regular property checks without the expense of stationary officers.',
            features: [
                'Randomized patrol schedules',
                'Marked security vehicles',
                'Property inspections and documentation',
                'Lock/unlock services',
                'Alarm response',
                'Incident investigation and reporting'
            ],
            industries: ['Industrial Properties', 'Construction Sites', 'Shopping Centers', 'Multi-tenant Facilities', 'Warehousing', 'Vacant Properties'],
            benefits: [
                'More coverage area than stationary guards',
                'Cost-effective alternative to 24/7 security',
                'Visible deterrence with unpredictable timing',
                'Quick response to multiple properties',
                'Comprehensive documentation of property condition'
            ]
        },
        'event-security': {
            title: 'Event Security Services',
            icon: 'fas fa-calendar-check',
            description: 'Our specialized event security teams manage crowd control, access points, and potential security concerns for gatherings of all sizes. We provide comprehensive planning and execution for one-time events or recurring occasions.',
            features: [
                'Pre-event security assessment and planning',
                'Credential verification and access control',
                'Crowd management and control',
                'VIP protection services',
                'Coordination with local authorities',
                'Emergency response planning',
                'Scalable team sizes'
            ],
            industries: ['Corporate Events', 'Concerts & Festivals', 'Sporting Events', 'Conventions', 'Private Parties', 'Public Gatherings'],
            benefits: [
                'Enhanced attendee safety and experience',
                'Reduced event liability',
                'Professional handling of security incidents',
                'Seamless integration with event operations',
                'Customized security plans for specific event needs'
            ]
        },
        'executive-protection': {
            title: 'Executive Protection',
            icon: 'fas fa-user-tie',
            description: 'Our executive protection services provide discreet, personalized security for high-profile individuals, executives, and their families. Our specialists are trained in threat assessment, protective tactics, and low-profile security operations.',
            features: [
                'Threat assessment and risk analysis',
                'Advance location scouting',
                'Secure transportation coordination',
                'Close protection officers',
                'Travel security planning',
                'Residential security assessment',
                'Digital privacy consultation'
            ],
            industries: ['Corporate Executives', 'Celebrities', 'High Net Worth Individuals', 'Public Figures', 'Diplomatic Personnel'],
            benefits: [
                'Personalized security tailored to individual needs',
                'Discreet protection that doesn\'t disrupt daily life',
                'Comprehensive security covering physical and digital threats',
                'Peace of mind for principals and their families',
                'Expert handling of potential threat situations'
            ]
        },
        'loss-prevention': {
            title: 'Loss Prevention Services',
            icon: 'fas fa-store',
            description: 'Our loss prevention specialists help businesses reduce theft, fraud, and inventory shrinkage through a combination of visible security, covert operations, and procedural improvements designed to protect your assets.',
            features: [
                'Uniformed and plainclothes security personnel',
                'Shoplifting deterrence and apprehension',
                'Employee theft prevention',
                'Security system assessment',
                'Inventory control consultation',
                'Staff training programs',
                'Investigation services'
            ],
            industries: ['Retail', 'Department Stores', 'Supermarkets', 'Pharmacies', 'Warehousing', 'Distribution Centers'],
            benefits: [
                'Reduced inventory shrinkage',
                'Decreased operational losses',
                'Improved profit margins',
                'Enhanced safety for customers and staff',
                'Comprehensive documentation for potential prosecution'
            ]
        },
        'remote-monitoring': {
            title: 'Remote Monitoring Services',
            icon: 'fas fa-video',
            description: 'Our remote monitoring service provides real-time surveillance of your property through advanced camera systems and trained monitoring personnel, offering comprehensive security coverage without on-site staff.',
            features: [
                'Video analytics and AI-enhanced monitoring',
                'Live video verification of alarms',
                'Two-way communication capabilities',
                'Regular virtual patrols',
                'Automated alerts and notifications',
                'Video evidence capture and storage',
                'Integration with existing security systems'
            ],
            industries: ['Commercial Properties', 'Construction Sites', 'Solar Farms', 'Industrial Complexes', 'Remote Facilities', 'Parking Facilities'],
            benefits: [
                'Cost-effective alternative to physical guards',
                '24/7 monitoring capabilities',
                'Immediate response to suspicious activity',
                'Reduced false alarm rates',
                'Comprehensive security coverage for large areas'
            ]
        },
        'concierge-security': {
            title: 'Concierge Security Services',
            icon: 'fas fa-concierge-bell',
            description: 'Our concierge security officers combine front-desk hospitality with security expertise, creating a welcoming first impression while maintaining vigilant protection of your property, residents, or guests.',
            features: [
                'Visitor management and verification',
                'Package handling and notification',
                'Resident/tenant assistance',
                'Building access control',
                'Emergency response coordination',
                'Amenity management',
                'Professional appearance and demeanor'
            ],
            industries: ['Luxury Residential', 'Corporate Lobbies', 'Medical Facilities', 'Mixed-Use Developments', 'Commercial Real Estate', 'Hotels'],
            benefits: [
                'Enhanced property prestige and value',
                'Improved resident/tenant satisfaction',
                'Streamlined visitor processing',
                'Combined security and customer service',
                'Positive first impression for visitors and clients'
            ]
        },
        'maritime-security': {
            title: 'Maritime Security Services',
            icon: 'fas fa-ship',
            description: 'Our specialized maritime security teams provide comprehensive protection for vessels, ports, and maritime facilities against piracy, theft, and unauthorized access. We employ industry-leading protocols and highly trained personnel with maritime expertise.',
            features: [
                'Vessel protection teams',
                'Port facility security assessments',
                'Anti-piracy measures and training',
                'Maritime access control systems',
                'Cargo security planning',
                'ISPS Code compliance assistance',
                'Maritime security training programs'
            ],
            industries: ['Shipping Companies', 'Port Authorities', 'Cruise Lines', 'Oil & Gas Maritime', 'Yacht Owners', 'International Trade'],
            benefits: [
                'Compliance with international maritime security regulations',
                'Protection against piracy and maritime threats',
                'Reduced risk of cargo theft and tampering',
                'Improved operational continuity',
                'Enhanced crew and passenger safety',
                'Specialized expertise in maritime environment'
            ]
        }
    };

    // DOM elements
    const serviceModal = document.getElementById('serviceModal');
    const serviceModalClose = document.getElementById('serviceModalClose');
    const serviceModalTitle = document.getElementById('serviceModalTitle');
    const serviceModalIcon = document.getElementById('serviceModalIcon');
    const serviceModalDescription = document.getElementById('serviceModalDescription');
    const serviceModalFeatures = document.getElementById('serviceModalFeatures');
    const serviceModalIndustries = document.getElementById('serviceModalIndustries');
    const serviceModalBenefits = document.getElementById('serviceModalBenefits');
    const serviceModalContactBtn = document.getElementById('serviceModalContactBtn');

    // Close modal when clicking the close button
    serviceModalClose.addEventListener('click', function() {
        serviceModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    // Close modal when clicking outside the modal content
    serviceModal.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // Close modal on escape key press
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
            serviceModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    // Attach click handlers to all service elements
    document.querySelectorAll('[data-service]').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            openServiceModal(serviceId);
        });
    });

    // Function to open the modal with specific service data
    function openServiceModal(serviceId) {
        const service = serviceData[serviceId];
        
        if (!service) {
            console.error('Service data not found for ID:', serviceId);
            return;
        }

        // Set modal content
        serviceModalTitle.textContent = service.title;
        serviceModalIcon.className = service.icon;
        serviceModalDescription.textContent = service.description;

        // Clear and populate features list
        serviceModalFeatures.innerHTML = '';
        service.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            serviceModalFeatures.appendChild(li);
        });

        // Clear and populate industries badges
        serviceModalIndustries.innerHTML = '';
        service.industries.forEach(industry => {
            const badge = document.createElement('span');
            badge.className = 'industry-badge';
            badge.textContent = industry;
            serviceModalIndustries.appendChild(badge);
        });

        // Clear and populate benefits list
        serviceModalBenefits.innerHTML = '';
        service.benefits.forEach(benefit => {
            const li = document.createElement('li');
            li.textContent = benefit;
            serviceModalBenefits.appendChild(li);
        });

        // Contact button handler
        serviceModalContactBtn.onclick = function() {
            window.location.href = `contact.html?service=${encodeURIComponent(service.title)}`;
        };

        // Show the modal
        serviceModal.classList.add('active');
        document.body.classList.add('modal-open');
    }
}); 