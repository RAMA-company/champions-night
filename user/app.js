// This file handles both login and registration functionality for the index.html page.
// این فایل منطق ورود و ثبت‌نام را برای صفحه index.html مدیریت می‌کند.

document.addEventListener('DOMContentLoaded', () => {
    // عناصر DOM
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleFormBtn = document.getElementById('toggle-form-btn');
    const messageBox = document.getElementById('message-box');
    const errorMessageText = document.getElementById('error-message-text');

    // -------------------------------------------------------------
    // تنظیم URL Apps Script
    // -------------------------------------------------------------
    const API_URL = 'https://script.google.com/macros/s/AKfycbwipBlLlTyo1BUYwCZ6mmuHCUu9ZAW-_gCGrVQT0vVX3hKW8fVbwlqJ9WaVw_qpkHXd3Q/exec';

    // یک تابع کمکی برای نمایش پیام‌های تأیید و خطا
    function showMessage(message, type = 'error') {
        errorMessageText.textContent = message;
        messageBox.classList.remove('hidden', 'bg-red-100', 'bg-green-100');
        if (type === 'success') {
            messageBox.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        } else {
            messageBox.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }
        messageBox.classList.remove('hidden');
    }

    // منطق اصلی برای جابجایی بین فرم‌های ورود و ثبت‌نام
    // این بخش به دقت بازبینی شده است تا مطمئن شویم که کار می‌کند.
    if (toggleFormBtn) {
        toggleFormBtn.addEventListener('click', () => {
            // بررسی می‌کنیم که کدام فرم در حال نمایش است
            if (loginForm.classList.contains('hidden')) {
                // اگر فرم ورود پنهان است، آن را نمایش می‌دهیم
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                toggleFormBtn.textContent = 'ثبت‌نام نکرده‌اید؟ اینجا کلیک کنید';
            } else {
                // اگر فرم ورود نمایش داده شده، آن را پنهان می‌کنیم و فرم ثبت‌نام را نمایش می‌دهیم
                loginForm.classList.add('hidden');
                registerForm.classList.remove('hidden');
                toggleFormBtn.textContent = 'قبلاً ثبت‌نام کرده‌اید؟ ورود به سیستم';
            }
            // هرگونه پیام قبلی را پنهان می‌کنیم
            messageBox.classList.add('hidden');
        });
    }

    // مدیریت ارسال فرم ورود
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            messageBox.classList.add('hidden');

            const memberId = document.getElementById('member-id-login').value;
            const pin = document.getElementById('pin-login').value;

            const payload = { member_id: memberId, pin: pin };
            try {
                const response = await fetch(`${API_URL}?pathInfo=auth/login-code`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                if (result.ok) {
                    localStorage.setItem('gym_token', result.data.token);
                    localStorage.setItem('memberId', result.data.member_id);
                    showMessage('ورود با موفقیت انجام شد.', 'success');
                    setTimeout(() => window.location.href = 'user/index.html', 1500);
                } else {
                    showMessage(result.error || 'خطا در ورود به سیستم.');
                }
            } catch (error) {
                console.error('Login Error:', error);
                showMessage('خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.');
            }
        });
    }

    // مدیریت ارسال فرم ثبت‌نام
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            messageBox.classList.add('hidden');

            const name = document.getElementById('name-register').value;
            const email = document.getElementById('email-register').value;
            const phone = document.getElementById('phone-register').value;

            if (!name || !email || !phone) {
                showMessage('لطفاً تمام فیلدها را پر کنید.');
                return;
            }

            const payload = { name, email, phone };
            try {
                const response = await fetch(`${API_URL}?pathInfo=auth/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                if (result.ok) {
                    showMessage(`ثبت‌نام شما با موفقیت انجام شد! کد عضویت شما: ${result.data.member_id} و PIN شما: ${result.data.pin}`, 'success');
                    // پس از ثبت‌نام، به صورت خودکار به فرم ورود برمی‌گردیم
                    setTimeout(() => {
                        if (toggleFormBtn) {
                            toggleFormBtn.click();
                            document.getElementById('member-id-login').value = result.data.member_id;
                        }
                    }, 3000);
                } else {
                    showMessage(result.error || 'خطا در ثبت‌نام.');
                }
            } catch (error) {
                console.error('Registration Error:', error);
                showMessage('خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.');
            }
        });
    }
});
