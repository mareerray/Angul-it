import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.removeItem('currentChallenge');
  }
    startCaptcha() {
    // Clear ALL per-challenge and meta session values when starting a new captcha session
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith('captchaChallenge_') ||
        key === 'currentChallenge' ||
        key === 'captchaStarted' ||
        key === 'captchaStartTime' ||
        key === 'captchaEndTime' ||
        key === 'captchaCompleted' ||
        key === 'captchaStartReadable' ||
        key === 'captchaEndReadable' ||
        key.startsWith('captchaRetries_') 
      ) {
        localStorage.removeItem(key);
      }
    });
    // Initialize new session state
    const now = Date.now();
    const readableStartTime = new Date(now).toLocaleString();

    localStorage.setItem('captchaStarted', 'true');
    localStorage.setItem('captchaStartTime', now.toString()); // store numeric only
    localStorage.setItem('captchaStartReadable', readableStartTime); // optional, for results display
    this.router.navigate(['/captcha']);
  }
}
