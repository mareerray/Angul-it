import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  protected readonly title = signal('angul-it');

  private readonly CURRENT_VERSION = '2.1.0';

  ngOnInit() {
    const STORED_VERSION = localStorage.getItem('captchaVersion');
    if (STORED_VERSION !== this.CURRENT_VERSION) {
      // Remove only captcha-related keys
      Object.keys(localStorage)
        .filter(key => key.startsWith('captcha') || key.startsWith('challengeCompleted_'))
        .forEach(key => localStorage.removeItem(key));
      localStorage.setItem('captchaVersion', this.CURRENT_VERSION);
    }
  }
}
