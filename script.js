document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. HARDCODED USER CREDENTIALS (Simulation)
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

    // --- Notice Popup Logic ---
    const noticeBtn = document.querySelector('#noticeBtn');
    const noticePopup = document.querySelector('#noticePopup');

    if (noticeBtn && noticePopup) {
        noticeBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            noticePopup.classList.toggle('show');
            
            if (noticePopup.classList.contains('show')) {
                noticeBtn.classList.remove('hidden');
            } else {
                noticeBtn.classList.add('hidden');
            }
        });

        document.addEventListener('click', (e) => {
            if (!noticePopup.contains(e.target) && e.target !== noticeBtn && !noticeBtn.contains(e.target)) {
                noticePopup.classList.remove('show');
                noticeBtn.classList.add('hidden'); 
            }
        });
    }

    // ==========================================
    // 2. LOGIN AUTHENTICATION LOGIC
    // ==========================================
    const loginForm = document.querySelector('#loginForm');
    const loginBtn = document.querySelector('#loginBtn');
    const toast = document.querySelector('#toast');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const enteredID = document.querySelector('#username').value.trim();
            const enteredPassword = document.querySelector('#password').value;

            // Simulate loading state
            loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Signing In...';
            loginBtn.style.opacity = '0.8';

            setTimeout(() => {
                // Check credentials
                if (enteredID === VALID_USER_ID && enteredPassword === VALID_PASSWORD) {
                    window.location.href = 'home.html'; 
                } else {
                    // FAIL: Reset button
                    loginBtn.innerHTML = '<span>Sign In</span>';
                    loginBtn.style.opacity = '1';
                    
                    // Show Toast Notification
                    showToast();
                }
            }, 800); 
        });
    }

    // --- Toast Notification Function ---
    function showToast() {
        toast.classList.add('show');
        
        // Auto hide after 3.5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});

// Global close function for the inline onclick
function closeToast() {
    const toast = document.querySelector('#toast');
    toast.classList.remove('show');
}