// Login Page JavaScript
class LoginPage {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.loginBtn = document.getElementById('loginBtn');
        this.rememberMeCheckbox = document.getElementById('rememberMe');
        this.modal = document.getElementById('modalOverlay');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadRememberedEmail();
        this.setupFormValidation();
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Password toggle
        this.passwordToggle.addEventListener('click', () => this.togglePassword());
        
        // Real-time validation
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        
        // Social login buttons
        document.querySelector('.google-btn').addEventListener('click', () => this.handleSocialLogin('google'));
        document.querySelector('.microsoft-btn').addEventListener('click', () => this.handleSocialLogin('microsoft'));
        
        // Modal events
        document.getElementById('modalClose').addEventListener('click', () => this.closeModal());
        document.getElementById('modalBtn').addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display !== 'none') {
                this.closeModal();
            }
        });
        
        // Forgot password link
        document.querySelector('.forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });
    }

    setupFormValidation() {
        // Add input event listeners for better UX
        [this.emailInput, this.passwordInput].forEach(input => {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    if (input === this.emailInput) {
                        this.passwordInput.focus();
                    } else {
                        this.form.dispatchEvent(new Event('submit'));
                    }
                }
            });
        });
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('email', 'Email address is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('password', 'Password is required');
            return false;
        }
        
        if (password.length < 8) {
            this.showError('password', 'Password must be at least 8 characters long');
            return false;
        }
        
        this.clearError('password');
        return true;
    }

    showError(field, message) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);
        
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    clearError(field) {
        const input = document.getElementById(field);
        const errorElement = document.getElementById(`${field}-error`);
        
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    togglePassword() {
        const type = this.passwordInput.type === 'password' ? 'text' : 'password';
        this.passwordInput.type = type;
        
        const icon = this.passwordToggle.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Clear previous errors
        this.clearError('email');
        this.clearError('password');
        
        // Validate form
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        
        if (!isEmailValid || !isPasswordValid) {
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        try {
            // Simulate API call
            const result = await this.performLogin();
            
            if (result.success) {
                this.handleLoginSuccess();
            } else {
                this.handleLoginError(result.message);
            }
        } catch (error) {
            this.handleLoginError('An unexpected error occurred. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    async performLogin() {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;
        
        // Demo credentials for testing
        const demoCredentials = [
            { email: 'admin@availity.com', password: 'password123' },
            { email: 'user@availity.com', password: 'userpass123' },
            { email: 'demo@availity.com', password: 'demo123456' }
        ];
        
        const isValidCredentials = demoCredentials.some(
            cred => cred.email === email && cred.password === password
        );
        
        if (isValidCredentials) {
            return { success: true, user: { email } };
        } else {
            return { 
                success: false, 
                message: 'Invalid email or password. Please try again.' 
            };
        }
    }

    handleLoginSuccess() {
        // Save email if remember me is checked
        if (this.rememberMeCheckbox.checked) {
            localStorage.setItem('rememberedEmail', this.emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
        
        // Show success modal
        this.showModal(
            'Login Successful!',
            'Welcome back! You have been successfully logged in.',
            'success'
        );
        
        // Simulate redirect after delay
        setTimeout(() => {
            this.closeModal();
            // In a real app, you would redirect to dashboard
            console.log('Redirecting to dashboard...');
        }, 2000);
    }

    handleLoginError(message) {
        this.showModal('Login Failed', message, 'error');
    }

    setLoadingState(isLoading) {
        const btnText = this.loginBtn.querySelector('.btn-text');
        const btnLoader = this.loginBtn.querySelector('.btn-loader');
        
        if (isLoading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            this.loginBtn.disabled = true;
        } else {
            btnText.style.display = 'block';
            btnLoader.style.display = 'none';
            this.loginBtn.disabled = false;
        }
    }

    showModal(title, message, type = 'info') {
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalBtn = document.getElementById('modalBtn');
        
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        
        // Style modal based on type
        if (type === 'success') {
            modalBtn.style.background = '#10b981';
            modalTitle.style.color = '#10b981';
        } else if (type === 'error') {
            modalBtn.style.background = '#ef4444';
            modalTitle.style.color = '#ef4444';
        } else {
            modalBtn.style.background = '#667eea';
            modalTitle.style.color = '#1a1a1a';
        }
        
        this.modal.style.display = 'flex';
        
        // Focus management for accessibility
        setTimeout(() => {
            modalBtn.focus();
        }, 100);
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    loadRememberedEmail() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            this.emailInput.value = rememberedEmail;
            this.rememberMeCheckbox.checked = true;
            this.passwordInput.focus();
        }
    }

    handleSocialLogin(provider) {
        // Show loading state
        this.showModal(
            'Redirecting...',
            `Redirecting to ${provider.charAt(0).toUpperCase() + provider.slice(1)} login...`,
            'info'
        );
        
        // In a real app, you would redirect to OAuth provider
        setTimeout(() => {
            this.closeModal();
            console.log(`Redirecting to ${provider} OAuth...`);
        }, 1500);
    }

    handleForgotPassword() {
        const email = this.emailInput.value.trim();
        let message = 'Please enter your email address and we\'ll send you a link to reset your password.';
        
        if (email && this.validateEmail()) {
            message = `If an account with ${email} exists, you will receive a password reset email shortly.`;
        }
        
        this.showModal('Password Reset', message, 'info');
    }
}

// Utility functions
const Utils = {
    // Debounce function for search/validation
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Format error messages
    formatError(error) {
        if (typeof error === 'string') return error;
        return error.message || 'An unexpected error occurred';
    },
    
    // Validate form data
    validateFormData(data) {
        const errors = {};
        
        if (!data.email || !data.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.email = 'Invalid email format';
        }
        
        if (!data.password) {
            errors.password = 'Password is required';
        } else if (data.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};

// Initialize the login page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LoginPage, Utils };
}