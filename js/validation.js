document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    initRegistrationValidation();
  }

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    initLoginValidation();
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    initContactValidation();
  }
});

function initRegistrationValidation() {
  const registerForm = document.getElementById('registerForm');

  const nameField = document.getElementById('name');
  const emailField = document.getElementById('registerEmail');
  const passwordField = document.getElementById('registerPassword');
  const confirmPasswordField = document.getElementById('confirmPassword');
  const techLanguageField = document.getElementById('techLanguage');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');
  const confirmPasswordError = document.getElementById('confirmPasswordError');
  const techLanguageError = document.getElementById('techLanguageError');

  function validateName(name) {
    if (!name || name.trim() === '') {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (name.trim().length > 50) {
      return 'Name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
      return 'Name can only contain letters, spaces, hyphens, and apostrophes';
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
    // More strict email validation
    if (email.length > 255) {
      return 'Email address is too long';
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim())
    ) {
      return 'Please enter a valid email address format';
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
    if (password.length > 128) {
      return 'Password must be less than 128 characters';
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
    if (!/(?=.*[@$!%*?&#])/.test(password)) {
      return 'Password must contain at least one special character (@$!%*?&#)';
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

  function validateTechLanguage(language) {
    if (!language || language === '') {
      return 'Please select a tech language';
    }
    return '';
  }

  function clearError(field, errorElement) {
    errorElement.textContent = '';
    field.classList.remove('error');
    field.classList.add('success');
  }

  function showError(field, errorElement, message) {
    errorElement.textContent = message;
    field.classList.remove('success');
    field.classList.add('error');
  }

  function clearSuccess(field) {
    field.classList.remove('success');
  }

  nameField.addEventListener('blur', function () {
    const error = validateName(nameField.value);
    if (error) {
      showError(nameField, nameError, error);
    } else {
      clearError(nameField, nameError);
    }
  });

  emailField.addEventListener('blur', function () {
    const error = validateEmail(emailField.value);
    if (error) {
      showError(emailField, emailError, error);
    } else {
      clearError(emailField, emailError);
    }
  });

  passwordField.addEventListener('blur', function () {
    const error = validatePassword(passwordField.value);
    if (error) {
      showError(passwordField, passwordError, error);
    } else {
      clearError(passwordField, passwordError);
    }

    if (confirmPasswordField.value) {
      const confirmError = validateConfirmPassword(
        passwordField.value,
        confirmPasswordField.value
      );
      if (confirmError) {
        showError(confirmPasswordField, confirmPasswordError, confirmError);
      } else {
        clearError(confirmPasswordField, confirmPasswordError);
      }
    }
  });

  confirmPasswordField.addEventListener('blur', function () {
    const error = validateConfirmPassword(
      passwordField.value,
      confirmPasswordField.value
    );
    if (error) {
      showError(confirmPasswordField, confirmPasswordError, error);
    } else {
      clearError(confirmPasswordField, confirmPasswordError);
    }
  });

  techLanguageField.addEventListener('change', function () {
    const error = validateTechLanguage(techLanguageField.value);
    if (error) {
      showError(techLanguageField, techLanguageError, error);
    } else {
      clearError(techLanguageField, techLanguageError);
    }
  });

  techLanguageField.addEventListener('blur', function () {
    const error = validateTechLanguage(techLanguageField.value);
    if (error) {
      showError(techLanguageField, techLanguageError, error);
    } else {
      clearError(techLanguageField, techLanguageError);
    }
  });

  nameField.addEventListener('input', function () {
    if (nameField.classList.contains('error')) {
      const error = validateName(nameField.value);
      if (!error) {
        clearError(nameField, nameError);
      } else {
        showError(nameField, nameError, error);
      }
    }
    if (nameField.value === '') {
      clearSuccess(nameField);
    }
  });

  emailField.addEventListener('input', function () {
    if (emailField.classList.contains('error')) {
      const error = validateEmail(emailField.value);
      if (!error) {
        clearError(emailField, emailError);
      } else {
        showError(emailField, emailError, error);
      }
    }
    if (emailField.value === '') {
      clearSuccess(emailField);
    }
  });

  passwordField.addEventListener('input', function () {
    if (passwordField.classList.contains('error')) {
      const error = validatePassword(passwordField.value);
      if (!error) {
        clearError(passwordField, passwordError);
      } else {
        showError(passwordField, passwordError, error);
      }
    }
    if (passwordField.value === '') {
      clearSuccess(passwordField);
    }

    if (confirmPasswordField.value) {
      const confirmError = validateConfirmPassword(
        passwordField.value,
        confirmPasswordField.value
      );
      if (confirmError) {
        showError(confirmPasswordField, confirmPasswordError, confirmError);
      } else {
        clearError(confirmPasswordField, confirmPasswordError);
      }
    }
  });

  confirmPasswordField.addEventListener('input', function () {
    if (confirmPasswordField.classList.contains('error')) {
      const error = validateConfirmPassword(
        passwordField.value,
        confirmPasswordField.value
      );
      if (!error) {
        clearError(confirmPasswordField, confirmPasswordError);
      } else {
        showError(confirmPasswordField, confirmPasswordError, error);
      }
    }
    if (confirmPasswordField.value === '') {
      clearSuccess(confirmPasswordField);
    }
  });

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameValidation = validateName(nameField.value);
    const emailValidation = validateEmail(emailField.value);
    const passwordValidation = validatePassword(passwordField.value);
    const confirmPasswordValidation = validateConfirmPassword(
      passwordField.value,
      confirmPasswordField.value
    );
    const techLanguageValidation = validateTechLanguage(
      techLanguageField.value
    );

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
      showError(
        confirmPasswordField,
        confirmPasswordError,
        confirmPasswordValidation
      );
      hasErrors = true;
    } else {
      clearError(confirmPasswordField, confirmPasswordError);
    }

    if (techLanguageValidation) {
      showError(techLanguageField, techLanguageError, techLanguageValidation);
      hasErrors = true;
    } else {
      clearError(techLanguageField, techLanguageError);
    }

    if (!hasErrors) {
      const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        techLanguage: techLanguageField.value,
      };

      alert(
        `Registration successful!\n\nName: ${formData.name}\nEmail: ${
          formData.email
        }\nTech Language: ${
          techLanguageField.options[techLanguageField.selectedIndex].text
        }`
      );
    } else {
      const firstErrorField = registerForm.querySelector('.error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  });
}

function initLoginValidation() {
  const loginForm = document.getElementById('loginForm');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');

  let emailError = document.getElementById('emailError');
  let passwordError = document.getElementById('passwordError');

  if (!emailError) {
    emailError = document.createElement('span');
    emailError.className = 'error-message';
    emailError.id = 'emailError';
    emailField.parentElement.appendChild(emailError);
  }

  if (!passwordError) {
    passwordError = document.createElement('span');
    passwordError.className = 'error-message';
    passwordError.id = 'passwordError';
    passwordField.parentElement.appendChild(passwordError);
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
    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  function clearError(field, errorElement) {
    errorElement.textContent = '';
    field.classList.remove('error');
    field.classList.add('success');
  }

  function showError(field, errorElement, message) {
    errorElement.textContent = message;
    field.classList.remove('success');
    field.classList.add('error');
  }

  function clearSuccess(field) {
    field.classList.remove('success');
  }

  emailField.addEventListener('blur', function () {
    const error = validateEmail(emailField.value);
    if (error) {
      showError(emailField, emailError, error);
    } else {
      clearError(emailField, emailError);
    }
  });

  passwordField.addEventListener('blur', function () {
    const error = validatePassword(passwordField.value);
    if (error) {
      showError(passwordField, passwordError, error);
    } else {
      clearError(passwordField, passwordError);
    }
  });

  emailField.addEventListener('input', function () {
    if (emailField.classList.contains('error')) {
      const error = validateEmail(emailField.value);
      if (!error) {
        clearError(emailField, emailError);
      } else {
        showError(emailField, emailError, error);
      }
    }
    if (emailField.value === '') {
      clearSuccess(emailField);
    }
  });

  passwordField.addEventListener('input', function () {
    if (passwordField.classList.contains('error')) {
      const error = validatePassword(passwordField.value);
      if (!error) {
        clearError(passwordField, passwordError);
      } else {
        showError(passwordField, passwordError, error);
      }
    }
    if (passwordField.value === '') {
      clearSuccess(passwordField);
    }
  });

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailValidation = validateEmail(emailField.value);
    const passwordValidation = validatePassword(passwordField.value);

    let hasErrors = false;

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

    if (!hasErrors) {
      alert(
        'Login successful!'
      );
    } else {
      const firstErrorField = loginForm.querySelector('.error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  });
}

function initContactValidation() {
  const contactForm = document.getElementById('contactForm');
  const nameField = document.getElementById('contactName');
  const emailField = document.getElementById('contactEmail');
  const messageField = document.getElementById('message');

  let nameError = document.getElementById('contactNameError');
  let emailError = document.getElementById('contactEmailError');
  let messageError = document.getElementById('messageError');

  if (!nameError) {
    nameError = document.createElement('span');
    nameError.className = 'error-message';
    nameError.id = 'contactNameError';
    nameField.parentElement.appendChild(nameError);
  }

  if (!emailError) {
    emailError = document.createElement('span');
    emailError.className = 'error-message';
    emailError.id = 'contactEmailError';
    emailField.parentElement.appendChild(emailError);
  }

  if (!messageError) {
    messageError = document.createElement('span');
    messageError.className = 'error-message';
    messageError.id = 'messageError';
    messageField.parentElement.appendChild(messageError);
  }

  function validateName(name) {
    if (!name || name.trim() === '') {
      return 'Name is required';
    }
    if (name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    if (name.trim().length > 100) {
      return 'Name must be less than 100 characters';
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

  function validateMessage(message) {
    if (!message || message.trim() === '') {
      return 'Message is required';
    }
    if (message.trim().length < 10) {
      return 'Message must be at least 10 characters long';
    }
    if (message.trim().length > 1000) {
      return 'Message must be less than 1000 characters';
    }
    return '';
  }

  function clearError(field, errorElement) {
    errorElement.textContent = '';
    field.classList.remove('error');
    field.classList.add('success');
  }

  function showError(field, errorElement, message) {
    errorElement.textContent = message;
    field.classList.remove('success');
    field.classList.add('error');
  }

  function clearSuccess(field) {
    field.classList.remove('success');
  }

  nameField.addEventListener('blur', function () {
    const error = validateName(nameField.value);
    if (error) {
      showError(nameField, nameError, error);
    } else {
      clearError(nameField, nameError);
    }
  });

  emailField.addEventListener('blur', function () {
    const error = validateEmail(emailField.value);
    if (error) {
      showError(emailField, emailError, error);
    } else {
      clearError(emailField, emailError);
    }
  });

  messageField.addEventListener('blur', function () {
    const error = validateMessage(messageField.value);
    if (error) {
      showError(messageField, messageError, error);
    } else {
      clearError(messageField, messageError);
    }
  });

  nameField.addEventListener('input', function () {
    if (nameField.classList.contains('error')) {
      const error = validateName(nameField.value);
      if (!error) {
        clearError(nameField, nameError);
      } else {
        showError(nameField, nameError, error);
      }
    }
    if (nameField.value === '') {
      clearSuccess(nameField);
    }
  });

  emailField.addEventListener('input', function () {
    if (emailField.classList.contains('error')) {
      const error = validateEmail(emailField.value);
      if (!error) {
        clearError(emailField, emailError);
      } else {
        showError(emailField, emailError, error);
      }
    }
    if (emailField.value === '') {
      clearSuccess(emailField);
    }
  });

  messageField.addEventListener('input', function () {
    if (messageField.classList.contains('error')) {
      const error = validateMessage(messageField.value);
      if (!error) {
        clearError(messageField, messageError, error);
      } else {
        showError(messageField, messageError, error);
      }
    }
    if (messageField.value === '') {
      clearSuccess(messageField);
    }
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameValidation = validateName(nameField.value);
    const emailValidation = validateEmail(emailField.value);
    const messageValidation = validateMessage(messageField.value);

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

    if (messageValidation) {
      showError(messageField, messageError, messageValidation);
      hasErrors = true;
    } else {
      clearError(messageField, messageError);
    }

    if (!hasErrors) {
      alert(
        'Thank you for your message! We will get back to you soon.'
      );
      contactForm.reset();
      nameField.classList.remove('success');
      emailField.classList.remove('success');
      messageField.classList.remove('success');
    } else {
      const firstErrorField = contactForm.querySelector('.error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
    }
  });
}
