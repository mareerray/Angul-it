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
    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith('captchaChallenge_') ||
        key === 'currentChallenge' ||
        key === 'captchaStarted' ||
        key === 'captchaStartTime' ||
        key === 'captchaEndTime' ||
        key === 'captchaCompleted' ||
        key === 'captchaStartReadable' ||
        key === 'captchaEndReadable'
      ) {
        localStorage.removeItem(key);
        localStorage.clear();
      }
    });
  }
    startCaptcha() {
    // Initialize new session state
    const now = Date.now();
    const readableStartTime = new Date(now).toLocaleString();

    localStorage.setItem('captchaStarted', 'true');
    localStorage.setItem('captchaStartTime', now.toString()); // store numeric only
    localStorage.setItem('captchaStartReadable', readableStartTime); // optional, for results display
    this.router.navigate(['/captcha']);
  }
}
