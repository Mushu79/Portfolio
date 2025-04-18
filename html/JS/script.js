// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Navbar color change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('div');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Add animation classes to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('animate-on-scroll');
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('animate-on-scroll');
    });

    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Add active class to current nav item based on URL
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Form validation
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Basic form validation
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            
            let isValid = true;
            
            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            } else {
                removeError(email);
            }
            
            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Show success message
                    const formAlert = document.createElement('div');
                    formAlert.className = 'alert alert-success mt-3';
                    formAlert.innerHTML = 'Your message has been sent successfully!';
                    contactForm.appendChild(formAlert);
                    
                    // Reset form
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        formAlert.remove();
                    }, 5000);
                }, 2000);
            }
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        errorElement.className = 'error-message text-danger mt-1';
        errorElement.textContent = message;
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorElement);
        }
        
        input.classList.add('is-invalid');
    }

    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('is-invalid');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar-scrolled {
            background-color: #212529 !important;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
});

// Animate progress bars when they come into view
const progressBars = document.querySelectorAll('.progress-bar');
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            bar.style.width = bar.parentElement.getAttribute('aria-valuenow') + '%';
        }
    });
};

// Initial check for progress bars in view
animateProgressBars();

// Check progress bars on scroll
window.addEventListener('scroll', animateProgressBars);

// Add loading animation to project images
document.querySelectorAll('.card-img-top').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease-in-out';
});

// Add hover effect to project cards
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}); 