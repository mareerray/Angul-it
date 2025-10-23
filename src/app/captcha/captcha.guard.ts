import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CaptchaGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
    const started = localStorage.getItem('captchaStarted');
    const completed = localStorage.getItem('captchaCompleted');

    // Block access to /captcha if completed
    if (completed) {
        this.router.navigate(['/result']);
        return false;
    }

    // Allow access if started but not completed
    if (started && !completed) return true;

    // Otherwise, send to home
    this.router.navigate(['/home']);
    return false;
    }
}
