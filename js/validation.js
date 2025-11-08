// Form validation for register.html

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (!registerForm) {
        return; // Exit if register form doesn't exist on this page
    }

    // Get form fields
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('registerEmail');
    const passwordField = document.getElementById('registerPassword');
    const confirmPasswordField = document.getElementById('confirmPassword');
    
    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Validation functions
    function validateName(name) {
        if (!name || name.trim() === '') {
            return 'Name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters long';
        }
        if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
            return 'Name can only contain letters and spaces';
        }
        return '';
    }

    function validateEmail(email) {
        if (!email || email.trim() === '') {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validatePassword(password) {
        if (!password || password === '') {
            return 'Password is required';
        }
        if (password.length < 8) {
            return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return 'Password must contain at least one lowercase letter';
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!/(?=.*\d)/.test(password)) {
            return 'Password must contain at least one number';
        }
        return '';
    }

    function validateConfirmPassword(password, confirmPassword) {
        if (!confirmPassword || confirmPassword === '') {
            return 'Please confirm your password';
        }
        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
        return '';
    }

    // Clear error message and remove error class
    function clearError(field, errorElement) {
        errorElement.textContent = '';
        field.classList.remove('error');
    }

    // Show error message and add error class
    function showError(field, errorElement, message) {
        errorElement.textContent = message;
        field.classList.add('error');
    }

    // Real-time validation on blur
    nameField.addEventListener('blur', function() {
        const error = validateName(nameField.value);
        if (error) {
            showError(nameField, nameError, error);
        } else {
            clearError(nameField, nameError);
        }
    });

    emailField.addEventListener('blur', function() {
        const error = validateEmail(emailField.value);
        if (error) {
            showError(emailField, emailError, error);
        } else {
            clearError(emailField, emailError);
        }
    });

    passwordField.addEventListener('blur', function() {
        const error = validatePassword(passwordField.value);
        if (error) {
            showError(passwordField, passwordError, error);
        } else {
            clearError(passwordField, passwordError);
        }
        
        // Also validate confirm password if it has a value
        if (confirmPasswordField.value) {
            const confirmError = validateConfirmPassword(passwordField.value, confirmPasswordField.value);
            if (confirmError) {
                showError(confirmPasswordField, confirmPasswordError, confirmError);
            } else {
                clearError(confirmPasswordField, confirmPasswordError);
            }
        }
    });

    confirmPasswordField.addEventListener('blur', function() {
        const error = validateConfirmPassword(passwordField.value, confirmPasswordField.value);
        if (error) {
            showError(confirmPasswordField, confirmPasswordError, error);
        } else {
            clearError(confirmPasswordField, confirmPasswordError);
        }
    });

    // Clear errors on input
    nameField.addEventListener('input', function() {
        if (nameField.classList.contains('error')) {
            const error = validateName(nameField.value);
            if (!error) {
                clearError(nameField, nameError);
            }
        }
    });

    emailField.addEventListener('input', function() {
        if (emailField.classList.contains('error')) {
            const error = validateEmail(emailField.value);
            if (!error) {
                clearError(emailField, emailError);
            }
        }
    });

    passwordField.addEventListener('input', function() {
        if (passwordField.classList.contains('error')) {
            const error = validatePassword(passwordField.value);
            if (!error) {
                clearError(passwordField, passwordError);
            }
        }
    });

    confirmPasswordField.addEventListener('input', function() {
        if (confirmPasswordField.classList.contains('error')) {
            const error = validateConfirmPassword(passwordField.value, confirmPasswordField.value);
            if (!error) {
                clearError(confirmPasswordField, confirmPasswordError);
            }
        }
    });

    // Form submission validation
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Validate all fields
        const nameValidation = validateName(nameField.value);
        const emailValidation = validateEmail(emailField.value);
        const passwordValidation = validatePassword(passwordField.value);
        const confirmPasswordValidation = validateConfirmPassword(passwordField.value, confirmPasswordField.value);

        // Show errors if any
        let hasErrors = false;

        if (nameValidation) {
            showError(nameField, nameError, nameValidation);
            hasErrors = true;
        } else {
            clearError(nameField, nameError);
        }

        if (emailValidation) {
            showError(emailField, emailError, emailValidation);
            hasErrors = true;
        } else {
            clearError(emailField, emailError);
        }

        if (passwordValidation) {
            showError(passwordField, passwordError, passwordValidation);
            hasErrors = true;
        } else {
            clearError(passwordField, passwordError);
        }

        if (confirmPasswordValidation) {
            showError(confirmPasswordField, confirmPasswordError, confirmPasswordValidation);
            hasErrors = true;
        } else {
            clearError(confirmPasswordField, confirmPasswordError);
        }

        // If no errors, form is valid (in a real app, you would submit the form here)
        if (!hasErrors) {
            // Scroll to top of form to show success message
            registerForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Show success message (optional)
            alert('Registration successful! Form validation passed.\n\nIn a real application, this data would be sent to the server.');
            
            // In a real application, you would uncomment this to submit:
            // registerForm.submit();
        } else {
            // Scroll to first error
            const firstErrorField = registerForm.querySelector('.error');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstErrorField.focus();
            }
        }
    });
});

