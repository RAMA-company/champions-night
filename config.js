// This file is used to store global configuration variables for the application.
// This is included in the HTML files and provides a central place for settings.

window.APP_CONFIG = {
    // SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwipBlLlTyo1BUYwCZ6mmuHCUu9ZAW-_gCGrVQT0vVX3hKW8fVbwlqJ9WaVw_qpkHXh3Q/exec",
    // Replace the URL above with your own Apps Script Web App URL after deployment.
    SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwipBlLlTyo1BUYwCZ6mmuHCUu9ZAW-_gCGrVQT0vVX3hKW8fVbwlqJ9WaVw_qpkHXh3Q/exec",
    GYM_NAME: "یاشگاه شب قهرمانان",
    TIMEZONE: "Asia/Tehran",
    USE_GOOGLE_SIGNIN: true,
    FALLBACK_LOGIN: true,
    reminder_days_before_due: 7, // Number of days before subscription ends to show a warning
};

console.log("APP_CONFIG loaded:", window.APP_CONFIG);
