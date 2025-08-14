// This file is used to store global configuration variables for the application.
// This is included in the HTML files and provides a central place for settings.
// این فایل برای ذخیره متغیرهای پیکربندی سراسری برنامه استفاده می‌شود.

window.APP_CONFIG = {
    // SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwipBlLlTyo1BUYwCZ6mmuHCUu9ZAW-_gCGrVQT0vVX3hKW8fVbwlqJ9WaVw_qpkHXh3Q/exec",
    // Replace the URL above with your own Apps Script Web App URL after deployment.
    // لینک زیر با URL جدید Apps Script شما به‌روزرسانی شده است.
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwPv5KdE8w6Zg1K2Ltm8JnpXbtzdlQOuPSpt9zOeAHlGkFatfSL1gr2OsmZrlE8z0b8Jg/exec",
    GYM_NAME: "یاشگاه شب قهرمانان",
    TIMEZONE: "Asia/Tehran",
    USE_GOOGLE_SIGNIN: true,
    FALLBACK_LOGIN: true,
    reminder_days_before_due: 7, // Number of days before subscription ends to show a warning
};

console.log("APP_CONFIG loaded:", window.APP_CONFIG);
