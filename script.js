// Global State Management
class PortfolioState {
    constructor() {
        this.currentLanguage = localStorage.getItem('portfolio-language') || 'ar';
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.activeSection = null;
        
        this.init();
    }
    
    init() {
        this.setLanguage(this.currentLanguage);
        this.setTheme(this.currentTheme);
        this.bindEvents();
        this.updateButtonStates();
    }
    
    // Language Management
    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('portfolio-language', language);
        
        const html = document.documentElement;
        html.setAttribute('lang', language);
        html.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        
        this.updateAllTexts();
        this.updateLanguageButton();
    }
    
    updateAllTexts() {
        const elements = document.querySelectorAll('[data-en][data-ar]');
        elements.forEach(element => {
            const text = element.getAttribute(`data-${this.currentLanguage}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
    
    updateLanguageButton() {
        const langButton = document.getElementById('langToggle');
        const buttonText = langButton.querySelector('.btn-text');
        
        if (this.currentLanguage === 'ar') {
            buttonText.textContent = 'English';
        } else {
            buttonText.textContent = 'عربي';
        }
    }
    
    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        this.setLanguage(newLanguage);
    }
    
    // Theme Management
    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('portfolio-theme', theme);
        
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeButton();
    }
    
    updateThemeButton() {
        const themeButton = document.getElementById('themeToggle');
        const buttonText = themeButton.querySelector('.btn-text');
        const buttonIcon = themeButton.querySelector('.btn-icon');
        
        if (this.currentTheme === 'dark') {
            buttonIcon.textContent = '☀️';
            if (this.currentLanguage === 'ar') {
                buttonText.textContent = 'الوضع الفاتح';
            } else {
                buttonText.textContent = 'Light Mode';
            }
        } else {
            buttonIcon.textContent = '🌓';
            if (this.currentLanguage === 'ar') {
                buttonText.textContent = 'الوضع المظلم';
            } else {
                buttonText.textContent = 'Dark Mode';
            }
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
    
    // Section Management
    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all buttons
        const buttons = document.querySelectorAll('.action-btn');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        const targetButton = document.querySelector(`[data-section="${sectionId}"]`);
        const contentContainer = document.getElementById('contentContainer');
        
        if (targetSection && targetButton) {
            this.activeSection = sectionId;
            
            // Add active classes with animation
            setTimeout(() => {
                contentContainer.classList.add('active');
                targetSection.classList.add('active');
                targetButton.classList.add('active');
            }, 50);
            
            // Smooth scroll to content
            contentContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    hideContent() {
        const contentContainer = document.getElementById('contentContainer');
        const buttons = document.querySelectorAll('.action-btn');
        
        contentContainer.classList.remove('active');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        
        this.activeSection = null;
    }
    
    // Event Binding
    bindEvents() {
        // Language toggle
        const langToggle = document.getElementById('langToggle');
        langToggle.addEventListener('click', () => {
            this.toggleLanguage();
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const sectionId = button.getAttribute('data-section');
                
                if (this.activeSection === sectionId) {
                    // If clicking the same section, hide it
                    this.hideContent();
                } else {
                    // Show the new section
                    this.showSection(sectionId);
                }
            });
        });
        
        // Click outside to close content
        document.addEventListener('click', (e) => {
            const contentContainer = document.getElementById('contentContainer');
            const businessCard = document.querySelector('.business-card');
            
            if (this.activeSection && 
                !contentContainer.contains(e.target) && 
                !businessCard.contains(e.target)) {
                this.hideContent();
            }
        });
        
        // Escape key to close content
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeSection) {
                this.hideContent();
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
    
    // Update button states on language/theme change
    updateButtonStates() {
        this.updateLanguageButton();
        this.updateThemeButton();
    }
    
    // Handle responsive behavior
    handleResize() {
        if (window.innerWidth <= 768 && this.activeSection) {
            // On mobile, ensure content is visible
            const contentContainer = document.getElementById('contentContainer');
            contentContainer.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Animation and Visual Effects
class PortfolioAnimations {
    constructor() {
        this.initAnimations();
    }
    
    initAnimations() {
        this.addHoverEffects();
        this.addParallaxEffect();
        this.addTypingEffect();
    }
    
    addHoverEffects() {
        // Add subtle animations to interactive elements
        const interactiveElements = document.querySelectorAll('.action-btn, .skill-item, .competency-item, .contact-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'translateY(-3px) scale(1.02)';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        });
    }
    
    addParallaxEffect() {
        // Add subtle parallax effect to background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.body;
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }
    
    addTypingEffect() {
        // Add typing effect to the main title (optional enhancement)
        const nameElement = document.querySelector('.name');
        if (nameElement && !nameElement.hasAttribute('data-typed')) {
            nameElement.setAttribute('data-typed', 'true');
            
            const originalText = nameElement.textContent;
            let currentText = '';
            let index = 0;
            
            nameElement.textContent = '';
            
            const typeWriter = () => {
                if (index < originalText.length) {
                    currentText += originalText.charAt(index);
                    nameElement.textContent = currentText + '|';
                    index++;
                    setTimeout(typeWriter, 100);
                } else {
                    nameElement.textContent = originalText;
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }
}

// Performance and Accessibility
class PortfolioAccessibility {
    constructor() {
        this.initAccessibility();
    }
    
    initAccessibility() {
        this.addKeyboardNavigation();
        this.addAriaLabels();
        this.addFocusManagement();
    }
    
    addKeyboardNavigation() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }
    
    handleTabNavigation(e) {
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const focusableArray = Array.from(focusableElements);
        const currentIndex = focusableArray.indexOf(document.activeElement);
        
        if (e.shiftKey) {
            // Shift + Tab (backward)
            if (currentIndex <= 0) {
                e.preventDefault();
                focusableArray[focusableArray.length - 1].focus();
            }
        } else {
            // Tab (forward)
            if (currentIndex >= focusableArray.length - 1) {
                e.preventDefault();
                focusableArray[0].focus();
            }
        }
    }
    
    addAriaLabels() {
        // Add ARIA labels for better accessibility
        const langToggle = document.getElementById('langToggle');
        const themeToggle = document.getElementById('themeToggle');
        
        if (langToggle) {
            langToggle.setAttribute('aria-label', 'Toggle Language');
            langToggle.setAttribute('role', 'switch');
        }
        
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Toggle Theme');
            themeToggle.setAttribute('role', 'switch');
        }
        
        // Add aria-labels to action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach(button => {
            const text = button.querySelector('.btn-text').textContent;
            button.setAttribute('aria-label', `Show ${text} section`);
        });
    }
    
    addFocusManagement() {
        // Manage focus for better keyboard navigation
        const actionButtons = document.querySelectorAll('.action-btn');
        
        actionButtons.forEach(button => {
            button.addEventListener('focus', () => {
                button.style.outline = '2px solid var(--primary-blue)';
                button.style.outlineOffset = '2px';
            });
            
            button.addEventListener('blur', () => {
                button.style.outline = '';
                button.style.outlineOffset = '';
            });
        });
    }
}

// Performance Optimization
class PortfolioPerformance {
    constructor() {
        this.initPerformance();
    }
    
    initPerformance() {
        this.optimizeImages();
        this.preloadContent();
        this.debounceEvents();
    }
    
    optimizeImages() {
        // Add lazy loading to images if any
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
        });
    }
    
    preloadContent() {
        // Preload critical resources
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = 'css/style.css';
        link.as = 'style';
        document.head.appendChild(link);
    }
    
    debounceEvents() {
        // Debounce resize events for better performance
        let resizeTimeout;
        const originalResize = window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Trigger optimized resize handler
                window.dispatchEvent(new CustomEvent('optimizedResize'));
            }, 250);
        });
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    window.portfolioState = new PortfolioState();
    window.portfolioAnimations = new PortfolioAnimations();
    window.portfolioAccessibility = new PortfolioAccessibility();
    window.portfolioPerformance = new PortfolioPerformance();
    
    // Add loading state management
    document.body.classList.add('loaded');
    
    // Console welcome message
    console.log('🚀 Nouran\'s Portfolio loaded successfully!');
    console.log('💼 Built with pure HTML, CSS, and JavaScript');
    console.log('🎨 Features: Glass morphism, responsive design, accessibility');
    
    // Performance monitoring (development only)
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PortfolioState,
        PortfolioAnimations,
        PortfolioAccessibility,
        PortfolioPerformance
    };
}