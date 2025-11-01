export function resetCaptchaSession() {
    Object.keys(localStorage).forEach(key => {
        if (
        key.startsWith('captchaChallenge') ||
        key.startsWith('captchaRetries') ||
        key === 'captchaStarted' ||
        key === 'captchaStartTime' ||
        key === 'captchaEndTime' ||
        key === 'captchaCompleted' ||
        key === 'captchaStartReadable' ||
        key === 'captchaEndReadable' ||
        key.startsWith('challengeCompleted') ||
        key.startsWith('captchaError') ||
        key === 'currentChallenge'
        ) {
        localStorage.removeItem(key);
        }
    });
    const now = Date.now();
    localStorage.setItem('captchaStarted', 'true');
    localStorage.setItem('captchaStartTime', now.toString());
    localStorage.setItem('captchaStartReadable', new Date(now).toLocaleString());
}

export function clearCaptchaSession() {
    Object.keys(localStorage).forEach(key => {
    // Remove all keys related to captcha/challenge session
    if ( key.startsWith('captcha') || key.startsWith('challenge')) {
        localStorage.removeItem(key);
        }
    });
}