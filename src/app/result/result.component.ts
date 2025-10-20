import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgIf],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  totalChallenges = 0;
  timeTaken = 0;
  formattedTime = '';
  performanceMessage = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const keys = Object.keys(sessionStorage).filter((key) =>
      key.startsWith('captchaChallenge_')
    );

      const completed = sessionStorage.getItem('captchaCompleted');
    if (!completed) {
      this.router.navigate(['/captcha']);
      return;
    }
    // Prevent access if challenges not completed
    if (keys.length === 0) {
      this.router.navigate(['/captcha']);
      return;
    }

    this.totalChallenges = keys.length;

    // Retrieve start and end times
    const startTimeRaw = sessionStorage.getItem('captchaStartTime');
    const endTimeRaw = sessionStorage.getItem('captchaEndTime');

    const start = Number(startTimeRaw?.split(' ')[0]);
    const end = Number(endTimeRaw?.split(' ')[0]);

    // Redirect if invalid (user hasn't finished)
    if (!startTimeRaw || !endTimeRaw || endTimeRaw < startTimeRaw) {
      this.router.navigate(['/captcha']);
      return;
    }

    // Compute total time in seconds
    const durationSeconds = Math.floor((end - start) / 1000);
    this.timeTaken = durationSeconds;

    // Convert to minutes:seconds
    const minutes = Math.floor(durationSeconds / 60);
    const remainder = durationSeconds % 60;
    this.formattedTime = `${minutes}m ${remainder}s`;

    // Generate performance feedback
    this.performanceMessage = this.getPerformanceMessage(durationSeconds);
  }

  getPerformanceMessage(seconds: number): string {
    if (seconds < 20)
      return 'Lightning fast! Your focus is unmatched ⚡';
    if (seconds < 30)
      return 'Excellent focus! Quick and accurate 🧠';
    if (seconds < 40)
      return 'Well done! Balanced speed and precision 💪';
    if (seconds < 50)
      return 'Great job! You stayed consistent throughout 👏';
    return 'Persistence pays off — you saw it through! 🕒';
  }

  startOver() {
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }
}
