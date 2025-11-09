// ========================================
// Navigation Functionality
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ========================================
    // Scroll Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // ========================================
    // BMI Calculator
    // ========================================
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');
    const resetBtn = document.getElementById('resetBtn');
    
    if (bmiForm) {
        bmiForm.addEventListener('submit', function(e) {
            e.preventDefault();
            calculateBMI();
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            bmiForm.style.display = 'block';
            bmiResult.style.display = 'none';
            bmiForm.reset();
        });
    }
    
    function calculateBMI() {
        const heightInput = parseFloat(document.getElementById('height').value);
        const heightUnit = document.getElementById('heightUnit').value;
        const weight = parseFloat(document.getElementById('weight').value);
        
        // Validate inputs
        if (!heightInput || !weight || heightInput <= 0 || weight <= 0) {
            alert('Please enter valid height and weight values.');
            return;
        }
        
        // Convert height to meters
        let heightInMeters;
        if (heightUnit === 'cm') {
            heightInMeters = heightInput / 100;
        } else {
            heightInMeters = heightInput;
        }
        
        // Calculate BMI
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        // Determine category and color
        let category, message, color;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            message = 'Your BMI indicates you are underweight. Consider consulting with a healthcare professional for personalized advice.';
            color = '#2196f3';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal Weight';
            message = 'Congratulations! Your BMI is in the healthy range. Maintain your healthy lifestyle.';
            color = '#4caf50';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
            message = 'Your BMI indicates you are overweight. Consider healthy diet and exercise changes.';
            color = '#ff9800';
        } else {
            category = 'Obese';
            message = 'Your BMI indicates obesity. We recommend consulting with our healthcare professionals for guidance.';
            color = '#f44336';
        }
        
        // Display results
        document.getElementById('bmiValue').textContent = bmi;
        document.getElementById('bmiCategory').textContent = category;
        document.getElementById('bmiMessage').textContent = message;
        document.getElementById('resultCircle').style.background = `linear-gradient(135deg, ${color}, ${color}dd)`;
        
        bmiForm.style.display = 'none';
        bmiResult.style.display = 'block';
    }
    
    // ========================================
    // Appointment Form
    // ========================================
    const appointmentForm = document.getElementById('appointmentForm');
    const appointmentSuccess = document.getElementById('appointmentSuccess');
    const newAppointmentBtn = document.getElementById('newAppointment');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            if (!validateForm(appointmentForm)) {
                return;
            }
            
            // Simulate form submission
            appointmentForm.style.display = 'none';
            appointmentSuccess.style.display = 'block';
            
            // In production, you would send data to server here
            console.log('Appointment form submitted');
        });
    }
    
    if (newAppointmentBtn) {
        newAppointmentBtn.addEventListener('click', function() {
            appointmentForm.reset();
            appointmentForm.style.display = 'block';
            appointmentSuccess.style.display = 'none';
        });
    }
    
    // ========================================
    // Contact Form
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const contactSuccess = document.getElementById('contactSuccess');
    const newMessageBtn = document.getElementById('newMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            if (!validateForm(contactForm)) {
                return;
            }
            
            // Simulate form submission
            contactForm.style.display = 'none';
            contactSuccess.style.display = 'block';
            
            // In production, you would send data to server here
            console.log('Contact form submitted');
        });
    }
    
    if (newMessageBtn) {
        newMessageBtn.addEventListener('click', function() {
            contactForm.reset();
            contactForm.style.display = 'block';
            contactSuccess.style.display = 'none';
        });
    }
    
    // ========================================
    // Form Validation
    // ========================================
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#f44336';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        // Email validation
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            if (input.value && !isValidEmail(input.value)) {
                isValid = false;
                input.style.borderColor = '#f44336';
                alert('Please enter a valid email address.');
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        // Phone validation
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            if (input.value && !isValidPhone(input.value)) {
                isValid = false;
                input.style.borderColor = '#f44336';
                alert('Please enter a valid phone number.');
                
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        // Date validation (appointment date should be in the future)
        const dateInput = form.querySelector('input[type="date"]');
        if (dateInput && dateInput.value) {
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                dateInput.style.borderColor = '#f44336';
                alert('Please select a future date for your appointment.');
                
                setTimeout(() => {
                    dateInput.style.borderColor = '';
                }, 2000);
            }
        }
        
        if (!isValid) {
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    // ========================================
    // Set minimum date for appointment booking
    // ========================================
    const appointmentDate = document.getElementById('appointmentDate');
    if (appointmentDate) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        appointmentDate.setAttribute('min', minDate);
    }
    
    // ========================================
    // Smooth Scroll for anchor links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
