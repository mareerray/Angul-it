import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { resetCaptchaSession } from '../utils/session';

@Component({
  selector: 'app-result',
  standalone: true,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})

export class ResultComponent implements OnInit {
  totalChallenges = 0;
  timeTaken = 0;
  formattedTime = '';
  totalRetries = 0;
  averageTime = 0;
  performanceMessage = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith('captchaChallenge_')
    );

    const completed = localStorage.getItem('captchaCompleted');

    // Prevent access if challenges not completed
    if (!completed || keys.length === 0) {
      this.router.navigate(['/captcha']);
      return;
    }
    this.totalChallenges = keys.length;

    // Retrieve start and end times
    const startTimeRaw = localStorage.getItem('captchaStartTime');
    const endTimeRaw = localStorage.getItem('captchaEndTime');

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
    this.averageTime = (this.totalChallenges > 0)
      ? Math.round(this.timeTaken / this.totalChallenges)
      : 0;

    // Convert to minutes:seconds
    const minutes = Math.floor(durationSeconds / 60);
    const remainder = durationSeconds % 60;
    this.formattedTime = `${minutes}m ${remainder}s`;

    this.totalRetries = 0;
    for (let i = 1; i <= this.totalChallenges; i++) {
      this.totalRetries += parseInt(localStorage.getItem(`captchaRetries_${i}`) || '0', 10);
    }

    // Generate performance feedback
    this.performanceMessage = this.getPerformanceMessage(durationSeconds);
  }

  getPerformanceMessage(seconds: number): string {
    if (seconds < 20)
      return 'Lightning fast! Your focus is unmatched ⚡';
    if (seconds < 40)
      return 'Excellent focus! Quick and accurate 🧠';
    if (seconds < 60)
      return 'Well done! Balanced speed and precision 💪';
    if (seconds < 80)
      return 'Great job! You stayed consistent throughout 👏';
    if (seconds < 100)
    return 'Persistence pays off! 🕒';
    if (seconds < 120)
    return 'Keep practicing! Improvement comes with time ⏳';
    if (seconds < 180)
    return 'Don\'t give up! Every attempt sharpens your skills 🌟';
    return 'You are taking way too long! Try to be quicker next time ⏰';
  }

  goHome() {
    // Just navigate to the homepage, keep results in localStorage
    this.router.navigate(['/home']);
  }

  startCaptcha() {
    resetCaptchaSession();
    this.router.navigate(['/captcha']);
  }
}
