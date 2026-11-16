document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. DETERMINISTIC GLOBAL AVATAR COLORS
    // ==========================================
    const avatarColors = [
        '#1e3a8a', // Deep Blue (Primary)
        '#3b82f6', // Bright Blue
        '#0f766e', // Teal
        '#475569', // Slate Gray
        '#b45309', // Bronze/Deep Gold
        '#10b981'  // Clinic Green
    ];

    document.querySelectorAll('.avatar-fallback').forEach(avatar => {
        // Get the user's name from the title attribute (e.g., title="Justin")
        const name = avatar.getAttribute('title') || avatar.textContent || 'User';
        
        // Hash the name into a number
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        // Use the hash to pick a color index, ensuring it's positive
        const colorIndex = Math.abs(hash) % avatarColors.length;
        
        // Apply the color
        avatar.style.backgroundColor = avatarColors[colorIndex];
    });

    // ==========================================
    // 2. LOGIN PAGE LOGIC (From your script.js)
    // ==========================================
    const VALID_USER_ID = "2026-001"; 
    const VALID_PASSWORD = "ustp123";

    // --- Password Toggle Logic ---
    const togglePassword = document.querySelector('#toggleIcon');
    const passwordInput = document.querySelector('#password');

    if(togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function (e) {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            if (type === 'text') {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    }

    // --- Login Authentication ---
    const loginForm = document.querySelector('#loginForm');
    const loginBtn = document.querySelector('#loginBtn');
    const toast = document.querySelector('#toast');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const enteredID = document.querySelector('#username').value.trim();
            const enteredPassword = document.querySelector('#password').value;

            loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
            loginBtn.style.opacity = '0.8';

            setTimeout(() => {
                if (enteredID === VALID_USER_ID && enteredPassword === VALID_PASSWORD) {
                    window.location.href = 'home.html'; 
                } else {
                    loginBtn.innerHTML = '<span>Sign In</span>';
                    loginBtn.style.opacity = '1';
                    
                    if (toast) {
                        toast.classList.add('show');
                        setTimeout(() => {
                            toast.classList.remove('show');
                        }, 3500);
                    } else {
                        alert("Login Failed: Invalid Credentials"); 
                    }
                }
            }, 800); 
        });
    }
});

// Global close function for the inline onclick
function closeToast() {
    const toast = document.querySelector('#toast');
    if (toast) {
        toast.classList.remove('show');
    }
}
