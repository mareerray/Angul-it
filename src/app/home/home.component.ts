import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resetCaptchaSession } from '../utils/session';

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
      Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('challengeCompleted_')) {
        localStorage.removeItem(key);
      }
    });
  }
  startCaptcha() {
      resetCaptchaSession();
      this.router.navigate(['/captcha']);
  }
}
