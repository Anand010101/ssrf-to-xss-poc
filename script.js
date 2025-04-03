// Check for URL parameters on page load
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');
    
    if (url) {
        window.location.href = url;
    }
});

// SSRF to XSS Converter functionality
const redirectBtn = document.getElementById('redirect-btn');

redirectBtn.addEventListener('click', () => {
    const url = document.getElementById('ssrf-url').value.trim();
    if (url) {
        window.location.href = url;
    }
});

// Payload Encoder functionality
const payloadInput = document.getElementById('payload-input');
const encodedOutput = document.getElementById('encoded-output');
const copyBtn = document.getElementById('copy-btn');

// Base64 encoding
document.getElementById('encode-base64').addEventListener('click', () => {
    const input = payloadInput.value;
    const encoded = btoa(input);
    encodedOutput.value = encoded;
});

// URL encoding
document.getElementById('encode-url').addEventListener('click', () => {
    const input = payloadInput.value;
    const encoded = encodeURIComponent(input);
    encodedOutput.value = encoded;
});

// HTML encoding
document.getElementById('encode-html').addEventListener('click', () => {
    const input = payloadInput.value;
    const encoded = input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    encodedOutput.value = encoded;
});

// Copy to clipboard functionality
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(encodedOutput.value);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}); 