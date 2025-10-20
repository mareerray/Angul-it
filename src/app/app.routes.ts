import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CaptchaComponent } from './captcha/captcha.component';
import { CaptchaGuard } from './captcha/captcha.guard';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'captcha', component: CaptchaComponent, canActivate: [CaptchaGuard] },
    { path: 'result', component: ResultComponent, canActivate: [CaptchaGuard] },
    { path: '**', redirectTo: 'home' } // fallback route
];
