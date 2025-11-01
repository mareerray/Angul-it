import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class CaptchaGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const started = localStorage.getItem('captchaStarted') === 'true';
    const completed = localStorage.getItem('captchaCompleted') === 'true';
    const aborted = localStorage.getItem('captchaAborted') === 'true';
    const attemptingUrl = state.url;

    // Allow access to '/home' if captcha was aborted
    if (aborted && attemptingUrl === '/home') {
        localStorage.removeItem('captchaAborted');
        return true;
}

    // If captcha is completed, allow access except blocking '/captcha'
    if (completed) {
        if (attemptingUrl === '/captcha') {
            this.router.navigate(['/result']);
            return false;
        }
        return true;
    }

    // If captcha started but not completed, allowed access only to '/captcha'
    if (started && !completed) {
        // Only allow access to '/captcha' route, block '/home', '/result' or '/other'
        if (attemptingUrl !== '/captcha') {
            this.router.navigate(['/captcha']);
            return false;
        }
        return true;
    }

      // If captcha is not started and not completed, allow only '/home'
    if (!started && !completed) {
        if (attemptingUrl !== '/home') {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }
  
    // Default:, block everything else
        this.router.navigate(['/home']);
        return false;
    }
}
