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
    // لینک Apps Script شما به‌روزرسانی شده است.
    // -------------------------------------------------------------
    const API_URL = 'https://script.google.com/macros/s/AKfycbwPv5KdE8w6Zg1K2Ltm8JnpXbtzdlQOuPSpt9zOeAHlGkFatfSL1gr2OsmZrlE8z0b8Jg/exec';

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

    // بستن پیام
    const closeMessageBtn = document.getElementById('close-message-btn');
    if (closeMessageBtn) {
        closeMessageBtn.addEventListener('click', () => {
            messageBox.classList.add('hidden');
        });
    }

    // مدیریت تغییر فرم ورود/ثبت‌نام
    if (toggleFormBtn) {
        toggleFormBtn.addEventListener('click', () => {
            loginForm.classList.toggle('hidden');
            registerForm.classList.toggle('hidden');
            const isLoginVisible = !loginForm.classList.contains('hidden');
            toggleFormBtn.textContent = isLoginVisible ? 'ثبت‌نام نکرده‌اید؟ اینجا کلیک کنید' : 'حساب کاربری دارید؟ اینجا کلیک کنید';
        });
    }

    // -------------------------------------------------------------
    // منطق ورود
    // -------------------------------------------------------------
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const memberId = document.getElementById('member-id-login').value;
            const pin = document.getElementById('pin-login').value;

            if (!memberId || !pin) {
                showMessage('لطفاً کد عضویت و پین را وارد کنید.');
                return;
            }

            const payload = { memberId, pin };
            try {
                const response = await fetch(`${API_URL}?pathInfo=auth/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const result = await response.json();

                if (result.ok) {
                    // ذخیره توکن و مسیر هدایت
                    localStorage.setItem('userToken', result.data.token);
                    showMessage('ورود موفقیت‌آمیز! در حال انتقال به پنل کاربری...', 'success');
                    window.location.href = result.data.redirect_url;
                } else {
                    showMessage(result.error || 'خطا در ورود.');
                }
            } catch (error) {
                console.error('Login Error:', error);
                showMessage('خطا در برقراری ارتباط با سرور. لطفاً مجدداً تلاش کنید.');
            }
        });
    }

    // -------------------------------------------------------------
    // منطق ثبت‌نام
    // -------------------------------------------------------------
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

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
