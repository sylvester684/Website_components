/**
 * WEB DEVELOPMENT LEARNING TEMPLATE - ENHANCED SCRIPT
 * Now includes all requested features with zero breaking changes
 */

// ========================
// CONSTANTS & CONFIG
// ========================
const MAX_HISTORY_STEPS = 20; // Undo/redo history limit
const TOUCH_DELAY = 300; // Mobile touch handling delay

// ========================
// GLOBAL STATE
// ========================
let colorHistory = [];
let currentColorStep = -1;
let isMobileMenuOpen = false;

// ========================
// THEME MANAGEMENT
// ========================

function showColorPickers() {
    document.getElementById('colorPicker').style.display = 'block';
    saveThemeState();
    addHistoryStep();
}

function hideColorPickers() {
    document.getElementById('colorPicker').style.display = 'none';
}

function resetColors() {
    // Store current state before reset
    const previousState = getCurrentTheme();
    
    // Apply defaults
    document.documentElement.style.setProperty('--primary-color', '#2c3e50');
    document.documentElement.style.setProperty('--secondary-color', '#3498db');
    document.documentElement.style.setProperty('--background-color', '#ffffff');
    document.documentElement.style.setProperty('--text-color', '#333333');
    
    // Update history
    addHistoryStep(previousState);
    saveThemeState();
}

// ========================
// HISTORY MANAGEMENT (UNDO/REDO)
// ========================

function addHistoryStep(previousState) {
    const currentState = previousState || getCurrentTheme();
    
    // Trim history if needed
    if (colorHistory.length >= MAX_HISTORY_STEPS) {
        colorHistory.shift();
    }
    
    colorHistory.push(currentState);
    currentColorStep = colorHistory.length - 1;
}

function undoColorChange() {
    if (currentColorStep > 0) {
        currentColorStep--;
        applyThemeState(colorHistory[currentColorStep]);
    }
}

function redoColorChange() {
    if (currentColorStep < colorHistory.length - 1) {
        currentColorStep++;
        applyThemeState(colorHistory[currentColorStep]);
    }
}

// ========================
// THEME PERSISTENCE
// ========================

function getCurrentTheme() {
    return {
        primary: getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color'),
        secondary: getComputedStyle(document.documentElement)
            .getPropertyValue('--secondary-color'),
        background: getComputedStyle(document.documentElement)
            .getPropertyValue('--background-color'),
        text: getComputedStyle(document.documentElement)
            .getPropertyValue('--text-color'),
        font: document.body.style.fontFamily
    };
}

function saveThemeState() {
    try {
        const theme = getCurrentTheme();
        localStorage.setItem('theme', JSON.stringify(theme));
    } catch (error) {
        console.error('Error saving theme:', error);
    }
}

// ========================
// THEME IMPORT/EXPORT
// ========================

function exportTheme() {
    const theme = getCurrentTheme();
    const jsonString = JSON.stringify(theme, null, 2);
    
    // Create downloadable file
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function importTheme(event) {
    const file = event.target.files[0];
    
    if (file && file.type === 'application/json') {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const theme = JSON.parse(e.target.result);
                applyThemeState(theme);
                saveThemeState();
            } catch (error) {
                showMessage('Invalid theme file format', 'error');
            }
        };
        
        reader.readAsText(file);
    }
}

// ========================
// FORM HANDLING
// ========================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    form.classList.add('loading');
    
    try {
        // Validate inputs
        if (!data.name || !data.email || !data.message) {
            throw new Error('Please fill in all required fields');
        }
        
        if (!validateEmail(data.email)) {
            throw new Error('Please enter a valid email address');
        }
        
        // Simulated API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success state
        showMessage('Form submitted successfully!', 'success');
        form.reset();
    } catch (error) {
        showMessage(error.message, 'error');
    } finally {
        form.classList.remove('loading');
    }
}

// ========================
// UI UTILITIES
// ========================

function showMessage(text, type = 'info') {
    const messageBox = document.createElement('div');
    messageBox.className = `message-box ${type}`;
    messageBox.textContent = text;
    
    document.body.appendChild(messageBox);
    
    // Auto-remove after delay
    setTimeout(() => {
        messageBox.classList.add('fade-out');
        setTimeout(() => messageBox.remove(), 300);
    }, 3000);
}

// ========================
// EVENT LISTENERS
// ========================

document.getElementById('bgColor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--background-color', e.target.value);
    saveThemeState();
    addHistoryStep();
});

document.getElementById('textColor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--text-color', e.target.value);
    saveThemeState();
    addHistoryStep();
});

document.getElementById('primaryColor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
    saveThemeState();
    addHistoryStep();
});

document.getElementById('secondaryColor').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--secondary-color', e.target.value);
    saveThemeState();
    addHistoryStep();
});

document.getElementById('fontSelector').addEventListener('change', (e) => {
    document.body.style.fontFamily = e.target.value;
    localStorage.setItem('selectedFont', e.target.value);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

document.querySelector('.menu-toggle').addEventListener('click', toggleMobileMenu);
document.querySelector('.menu-toggle').addEventListener('touchstart', toggleMobileMenu);

document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);

// ========================
// INITIALIZATION
// ========================

function initializeApp() {
    // Load saved theme
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            const theme = JSON.parse(savedTheme);
            applyThemeState(theme);
        }
    } catch (error) {
        console.error('Error loading theme:', error);
    }

    // Load font preference
    const savedFont = localStorage.getItem('selectedFont');
    if (savedFont) {
        document.body.style.fontFamily = savedFont;
        document.getElementById('fontSelector').value = savedFont;
    }

    // Initialize mobile menu
    document.querySelector('.menu-toggle')
            .setAttribute('aria-expanded', 'false');
            
    // Add undo/redo controls
    addUndoRedoControls();
}

function applyThemeState(theme) {
    document.documentElement.style.setProperty('--primary-color', theme.primary);
    document.documentElement.style.setProperty('--secondary-color', theme.secondary);
    document.documentElement.style.setProperty('--background-color', theme.background);
    document.documentElement.style.setProperty('--text-color', theme.text);
    if (theme.font) document.body.style.fontFamily = theme.font;
}

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    document.querySelector('nav').classList.toggle('mobile-menu-active');
    document.querySelector('.menu-toggle')
            .setAttribute('aria-expanded', isMobileMenuOpen);
}

function addUndoRedoControls() {
    const controls = document.createElement('div');
    controls.className = 'history-controls';
    controls.innerHTML = `
        <button class="button undo-btn" aria-label="Undo">
            <i class="fas fa-undo"></i>
        </button>
        <button class="button redo-btn" aria-label="Redo">
            <i class="fas fa-redo"></i>
        </button>
    `;
    
    controls.querySelector('.undo-btn').addEventListener('click', undoColorChange);
    controls.querySelector('.redo-btn').addEventListener('click', redoColorChange);
    
    document.body.appendChild(controls);
}

// Start application
window.addEventListener('load', initializeApp);