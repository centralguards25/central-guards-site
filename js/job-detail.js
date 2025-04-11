document.addEventListener('DOMContentLoaded', function() {
    initJobDetail();
    initShareButtons();
    initApplyButtons();
    loadSimilarJobs();
});

/**
 * Initialize job detail page by loading data based on URL params
 */
function initJobDetail() {
    // Get the job ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    
    if (!jobId) {
        showError("Job ID not found in URL");
        return;
    }
    
    // Load job data
    loadJobData(jobId);
}

/**
 * Load job data from simulated database/API
 * In a real application, this would make an API call to get job details
 */
function loadJobData(jobId) {
    // Simulate API call with timeout
    setTimeout(() => {
        // Get mock data for the job
        const jobData = getMockJobData(jobId);
        
        if (!jobData) {
            showError("Job not found");
            return;
        }
        
        // Populate the page with job details
        populateJobDetails(jobData);
    }, 800);
}

/**
 * Show error message if job can't be loaded
 */
function showError(message) {
    document.getElementById('job-title').textContent = "Error";
    document.getElementById('job-overview').innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
    
    // Hide sections that would be empty
    document.querySelectorAll('.job-section:not(:first-child)').forEach(section => {
        section.style.display = 'none';
    });
    
    // Update sidebar
    document.getElementById('apply-now-btn').textContent = "Return to Jobs";
    document.getElementById('apply-now-btn').href = "careers.html";
    document.getElementById('apply-btn-bottom').textContent = "Browse All Open Positions";
    document.getElementById('apply-btn-bottom').href = "careers.html";
}

/**
 * Populate the page with job details
 */
function populateJobDetails(job) {
    // Update page title
    document.title = `${job.title} - CentralGuards Security Services`;
    
    // Update hero section
    document.getElementById('job-title').textContent = job.title;
    document.getElementById('job-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${job.location}`;
    document.getElementById('job-type').innerHTML = `<i class="fas fa-briefcase"></i> ${job.type}`;
    document.getElementById('job-department').innerHTML = `<i class="fas fa-users"></i> ${job.department}`;
    document.getElementById('job-date').innerHTML = `<i class="fas fa-calendar-alt"></i> Posted ${job.postedDate}`;
    
    // Update main content
    document.getElementById('job-overview').textContent = job.overview;
    
    // Update responsibilities
    const responsibilitiesList = document.getElementById('job-responsibilities');
    responsibilitiesList.innerHTML = '';
    job.responsibilities.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        responsibilitiesList.appendChild(li);
    });
    
    // Update requirements
    const requirementsList = document.getElementById('job-requirements');
    requirementsList.innerHTML = '';
    job.requirements.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        requirementsList.appendChild(li);
    });
    
    // Update benefits
    const benefitsList = document.getElementById('job-benefits');
    benefitsList.innerHTML = '';
    job.benefits.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        benefitsList.appendChild(li);
    });
    
    // Update apply buttons with job ID
    document.getElementById('apply-now-btn').href = `contact.html?service=job-application&job=${encodeURIComponent(job.title)}`;
    document.getElementById('apply-btn-bottom').href = `contact.html?service=job-application&job=${encodeURIComponent(job.title)}`;
}

/**
 * Initialize social sharing buttons
 */
function initShareButtons() {
    const jobTitle = document.getElementById('job-title').textContent;
    const pageUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(`Job Opportunity: ${jobTitle} at CentralGuards Security Services`);
    
    // LinkedIn
    document.getElementById('share-linkedin').addEventListener('click', function(e) {
        e.preventDefault();
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`, '_blank');
    });
    
    // Facebook
    document.getElementById('share-facebook').addEventListener('click', function(e) {
        e.preventDefault();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`, '_blank');
    });
    
    // Twitter
    document.getElementById('share-twitter').addEventListener('click', function(e) {
        e.preventDefault();
        window.open(`https://twitter.com/intent/tweet?url=${pageUrl}&text=${shareTitle}`, '_blank');
    });
    
    // Email
    document.getElementById('share-email').addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = `mailto:?subject=${shareTitle}&body=I thought you might be interested in this job: ${pageUrl}`;
    });
}

/**
 * Initialize apply buttons
 */
function initApplyButtons() {
    const applyButton = document.getElementById('apply-now-btn');
    const applyButtonBottom = document.getElementById('apply-btn-bottom');
    
    // These will be properly set with href in the populateJobDetails function
    // But we still add click handlers for tracking or custom behavior
    
    applyButton.addEventListener('click', function(e) {
        // Add any tracking or custom behavior here
        console.log('Apply button clicked (sidebar)');
    });
    
    applyButtonBottom.addEventListener('click', function(e) {
        // Add any tracking or custom behavior here
        console.log('Apply button clicked (bottom)');
    });
}

/**
 * Load similar jobs in the sidebar
 */
function loadSimilarJobs() {
    const similarJobsContainer = document.getElementById('similar-jobs-list');
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');
    
    // Get current job data to find similar positions
    const currentJob = getMockJobData(jobId);
    if (!currentJob) return;
    
    // Simulate API call with timeout
    setTimeout(() => {
        // Get mock data for similar jobs
        const similarJobs = getSimilarJobs(currentJob);
        similarJobsContainer.innerHTML = '';
        
        if (similarJobs.length === 0) {
            similarJobsContainer.innerHTML = '<p>No similar positions available at this time.</p>';
            return;
        }
        
        // Display similar jobs
        similarJobs.forEach(job => {
            const jobCard = document.createElement('a');
            jobCard.href = `job-detail.html?id=${job.id}`;
            jobCard.className = 'similar-job-card';
            
            jobCard.innerHTML = `
                <div class="similar-job-title">${job.title}</div>
                <div class="similar-job-meta">
                    <span>${job.location}</span>
                    <span>${job.type}</span>
                </div>
            `;
            
            similarJobsContainer.appendChild(jobCard);
        });
    }, 1200);
}

/**
 * Get similar jobs based on department and job type
 */
function getSimilarJobs(currentJob) {
    // This would normally be an API call
    const allJobs = getAllMockJobs();
    
    return allJobs
        .filter(job => 
            job.id !== currentJob.id && 
            (job.department === currentJob.department || job.type === currentJob.type)
        )
        .slice(0, 3); // Limit to 3 similar jobs
}

/**
 * Get mock data for a specific job
 */
function getMockJobData(jobId) {
    const allJobs = getAllMockJobs();
    return allJobs.find(job => job.id === jobId);
}

/**
 * Get all mock job data
 * In a real application, this would be fetched from an API
 */
function getAllMockJobs() {
    return [
        {
            id: "1",
            title: "Senior Security Officer",
            location: "Phoenix, AZ",
            type: "Full-time",
            department: "Physical Security",
            postedDate: "2 weeks ago",
            overview: "We are seeking an experienced Senior Security Officer to join our team in Phoenix, AZ. The ideal candidate will have extensive experience in security operations and a proven track record of leadership in security environments. This position involves overseeing security personnel and ensuring the implementation of security protocols across assigned sites.",
            responsibilities: [
                "Supervise and lead a team of security officers across multiple client sites",
                "Develop and implement security protocols and procedures to ensure maximum protection",
                "Conduct regular security assessments and identify potential vulnerabilities",
                "Respond to security incidents and emergencies in a timely and effective manner",
                "Prepare detailed reports on security operations, incidents, and recommended improvements",
                "Liaise with law enforcement agencies and emergency services when necessary",
                "Train and mentor junior security personnel",
                "Ensure compliance with all relevant security regulations and standards"
            ],
            requirements: [
                "5+ years of experience in security operations with at least 2 years in a supervisory role",
                "Valid security guard license for the state of Arizona",
                "CPR and First Aid certification",
                "Excellent communication and leadership skills",
                "Proficiency in security reporting software and MS Office suite",
                "Clean driving record and background check",
                "Ability to work different shifts including nights and weekends",
                "Associate's degree in Criminal Justice or related field (preferred)"
            ],
            benefits: [
                "Competitive salary with opportunities for performance-based bonuses",
                "Comprehensive health, dental, and vision insurance",
                "401(k) retirement plan with company match",
                "Paid time off and holidays",
                "Professional development and career advancement opportunities",
                "Uniform allowance",
                "Cell phone reimbursement",
                "Employee assistance program"
            ]
        },
        {
            id: "2",
            title: "Security Technician",
            location: "Scottsdale, AZ",
            type: "Full-time",
            department: "Electronic Security",
            postedDate: "3 days ago",
            overview: "Join our growing team as a Security Technician responsible for the installation, maintenance, and troubleshooting of electronic security systems for our clients. This role requires technical expertise, attention to detail, and excellent customer service skills to ensure our clients' security systems operate effectively and reliably.",
            responsibilities: [
                "Install, configure, and maintain various electronic security systems including CCTV, access control, alarms, and intrusion detection systems",
                "Troubleshoot and repair malfunctioning security equipment",
                "Perform routine maintenance and system updates to ensure optimal performance",
                "Conduct site surveys to determine client needs and recommend appropriate security solutions",
                "Train clients on the proper use of security systems",
                "Document all installation and maintenance activities",
                "Ensure compliance with industry standards and regulations",
                "Respond to service calls in a timely manner"
            ],
            requirements: [
                "2+ years of experience in electronic security systems installation and maintenance",
                "Technical certification in security systems or related field",
                "Knowledge of CCTV, access control, and alarm systems",
                "Understanding of IP networking and computer systems",
                "Valid driver's license and clean driving record",
                "Ability to lift up to 50 pounds and work at heights",
                "Strong problem-solving skills and attention to detail",
                "Excellent customer service and communication skills"
            ],
            benefits: [
                "Competitive hourly rate with overtime opportunities",
                "Company vehicle and tools provided",
                "Comprehensive health, dental, and vision insurance",
                "401(k) retirement plan with company match",
                "Paid time off and holidays",
                "Technical training and certification support",
                "Career advancement opportunities",
                "Employee recognition program"
            ]
        },
        {
            id: "3",
            title: "Security Consultant",
            location: "Phoenix, AZ",
            type: "Full-time",
            department: "Security Consulting",
            postedDate: "1 week ago",
            overview: "CentralGuards is seeking an experienced Security Consultant to provide expert advice and develop comprehensive security solutions for our clients. This role involves conducting risk assessments, developing security plans, and recommending appropriate security measures to protect our clients' assets, personnel, and information.",
            responsibilities: [
                "Conduct thorough security risk assessments for various client facilities and operations",
                "Develop comprehensive security plans tailored to client needs and risk profiles",
                "Recommend appropriate security measures including physical security, electronic systems, and procedural controls",
                "Create detailed reports and presentations for clients and management",
                "Stay current with industry trends, emerging threats, and best practices in security",
                "Collaborate with sales teams to develop proposals and win new business",
                "Provide expert guidance on security compliance and regulatory requirements",
                "Deliver security awareness training to client personnel"
            ],
            requirements: [
                "Bachelor's degree in Security Management, Criminal Justice, or related field",
                "7+ years of experience in security operations or consulting",
                "Professional security certification (CPP, PSP, or equivalent)",
                "Strong knowledge of physical security, electronic security systems, and security operations",
                "Excellent analytical, writing, and presentation skills",
                "Proficiency in risk assessment methodologies",
                "Experience with security system design and implementation",
                "Ability to travel up to 30% of the time"
            ],
            benefits: [
                "Competitive salary plus bonus potential",
                "Comprehensive health, dental, and vision insurance",
                "401(k) retirement plan with company match",
                "Generous paid time off and holidays",
                "Professional development and continuing education support",
                "Certification reimbursement program",
                "Flexible work arrangements",
                "Company laptop and cell phone"
            ]
        },
        {
            id: "4",
            title: "Event Security Specialist",
            location: "Tempe, AZ",
            type: "Part-time",
            department: "Specialized Services",
            postedDate: "5 days ago",
            overview: "CentralGuards is hiring Event Security Specialists to provide security services for various events including concerts, sports games, corporate functions, and private parties. This position requires excellent customer service skills, the ability to maintain a safe environment, and quick thinking in potentially challenging situations.",
            responsibilities: [
                "Provide security presence at various events and venues",
                "Control access to restricted areas and check credentials",
                "Screen attendees for prohibited items",
                "Monitor crowd behavior and respond to potential security issues",
                "Assist with crowd management and emergency evacuations if necessary",
                "Respond to medical emergencies and provide basic first aid when needed",
                "Collaborate with venue staff, event organizers, and law enforcement",
                "Complete detailed post-event security reports"
            ],
            requirements: [
                "High school diploma or equivalent",
                "Valid security guard license for the state of Arizona",
                "1+ years of experience in security or customer service",
                "CPR and First Aid certification",
                "Excellent communication and interpersonal skills",
                "Ability to stand for extended periods and work in various weather conditions",
                "Availability to work nights, weekends, and holidays",
                "Professional appearance and demeanor"
            ],
            benefits: [
                "Competitive hourly rate with potential for premium event pay",
                "Flexible scheduling options",
                "Paid training programs",
                "Employee referral bonuses",
                "Uniform provided",
                "Opportunities for advancement to full-time positions",
                "Access to health insurance for qualifying employees",
                "Team member recognition programs"
            ]
        },
        {
            id: "5",
            title: "Corporate Security Manager",
            location: "Phoenix, AZ",
            type: "Full-time",
            department: "Physical Security",
            postedDate: "2 days ago",
            overview: "We are looking for an experienced Corporate Security Manager to oversee security operations for our major corporate clients. This role involves developing and implementing comprehensive security programs, managing security personnel, and ensuring the safety of client facilities, assets, and personnel.",
            responsibilities: [
                "Develop, implement, and oversee comprehensive security programs for corporate clients",
                "Manage a team of security supervisors and officers across multiple client sites",
                "Establish security policies, procedures, and best practices",
                "Conduct security audits and risk assessments to identify vulnerabilities",
                "Investigate security incidents and implement corrective measures",
                "Maintain positive relationships with clients and address security concerns",
                "Prepare security budgets and manage resources effectively",
                "Stay informed about emerging security threats and countermeasures"
            ],
            requirements: [
                "Bachelor's degree in Security Management, Criminal Justice, or related field",
                "10+ years of security experience with at least 5 years in management",
                "Professional security certification (CPP, PSP, or equivalent)",
                "Strong leadership and team management skills",
                "Excellent communication and client relationship skills",
                "Experience with security technology and systems",
                "Knowledge of relevant security regulations and standards",
                "Proven track record of developing effective security programs"
            ],
            benefits: [
                "Competitive salary plus performance bonuses",
                "Comprehensive health, dental, and vision insurance",
                "401(k) retirement plan with generous company match",
                "Executive benefits package",
                "Company car or car allowance",
                "Generous paid time off and holidays",
                "Professional development opportunities",
                "Relocation assistance if applicable"
            ]
        },
        {
            id: "6",
            title: "Armed Security Officer",
            location: "Mesa, AZ",
            type: "Full-time",
            department: "Physical Security",
            postedDate: "1 week ago",
            overview: "CentralGuards is seeking qualified Armed Security Officers to protect high-value assets, sensitive locations, and personnel. This position requires a high level of professionalism, sound judgment, and the ability to respond effectively to security threats while maintaining a strong customer service orientation.",
            responsibilities: [
                "Provide armed security services at assigned client locations",
                "Conduct regular security patrols and monitor security systems",
                "Control access to facilities and restricted areas",
                "Respond to alarms, disturbances, and emergency situations",
                "Detain violators when necessary according to legal guidelines",
                "Maintain detailed logs of all activities and incidents",
                "Coordinate with law enforcement agencies when needed",
                "Ensure compliance with all firearm safety protocols and regulations"
            ],
            requirements: [
                "High school diploma or equivalent (Associate's degree preferred)",
                "Valid Arizona armed security guard license",
                "2+ years of experience in security or law enforcement",
                "Firearms qualification and training certification",
                "Clean criminal background check",
                "Valid driver's license with clean driving record",
                "Strong observation and reporting skills",
                "Excellent judgment and decision-making abilities"
            ],
            benefits: [
                "Premium hourly rate for armed security personnel",
                "Comprehensive health, dental, and vision insurance",
                "401(k) retirement plan with company match",
                "Paid time off and holidays",
                "Life insurance and disability coverage",
                "Ongoing firearms training and certification",
                "Career advancement opportunities",
                "Employee assistance program"
            ]
        }
    ];
} 