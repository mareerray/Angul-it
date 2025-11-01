import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { clearCaptchaSession } from './utils/session';

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
      clearCaptchaSession();
      localStorage.setItem('captchaVersion', this.CURRENT_VERSION);
    }
  }
}
