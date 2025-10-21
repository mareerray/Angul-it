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
    // Clear ALL per-challenge and meta session values when entering home
    Object.keys(sessionStorage).forEach((key) => {
      if (
        key.startsWith('captchaChallenge_') ||
        key === 'currentChallenge' ||
        key === 'captchaStarted' ||
        key === 'captchaStartTime' ||
        key === 'captchaEndTime' ||
        key === 'captchaCompleted'
      ) {
        sessionStorage.removeItem(key);
      }
    });
  }
    startCaptcha() {
    // Initialize new session state
    const now = Date.now();
    const readableStartTime = new Date(now).toLocaleString();

    sessionStorage.setItem('captchaStarted', 'true');
    sessionStorage.setItem('captchaStartTime', now.toString()); // store numeric only
    sessionStorage.setItem('captchaStartReadable', readableStartTime); // optional, for results display
    // sessionStorage.setItem('captchaStartTime', `${now} (${readableStartTime})`); // ← record the absolute start time
    this.router.navigate(['/captcha']);
  }
}
