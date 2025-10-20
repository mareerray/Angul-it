import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CaptchaGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
    const started = sessionStorage.getItem('captchaStarted');
        if (started) {
            return true;
        } else {
            // redirect to start or home if CAPTCHA not initiated
            this.router.navigate(['/home']);
            return false;
        }
    }
}
