import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private router: Router) {}

  ngOnInit() {
       // Clear all previous CAPTCHA session data
    Object.keys(sessionStorage).forEach((key) => {
      if (
        key.startsWith('captchaChallenge_') ||
        key === 'currentChallenge' ||
        key === 'captchaStarted'
      ) {
        sessionStorage.removeItem(key);
      }
    });
  }
  startCaptcha() {
      // Mark that a new CAPTCHA session has begun
      sessionStorage.setItem('captchaStarted', 'true');
      // Redirect to the first challenge
      this.router.navigate(['/captcha']);
  }
}
