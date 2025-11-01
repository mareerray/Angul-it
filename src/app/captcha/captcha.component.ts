import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ImageItem, CHALLENGES, GridChallenge } from './captcha.model';
import { resetCaptchaSession, clearCaptchaSession } from '../utils/session';

@Component({
  selector: 'app-captcha',
  imports: [NgFor, NgIf],
  standalone: true,
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})

export class CaptchaComponent implements OnInit {
  constructor(private router: Router) {}
  challenges: GridChallenge[] = CHALLENGES;
  currentChallenge = 0;
  gridImages: ImageItem[] = [];
  timerInterval: any;
  formattedTime = '';
  errorMessages : string[] = [];
  isCompleted = false;

  ngOnInit() {
    const startTime = Number(localStorage.getItem('captchaStartTime'));
    const savedIndex = localStorage.getItem('currentChallenge');
    if (savedIndex !== null) {
      this.currentChallenge = parseInt(savedIndex, 10) - 1;
    }
    this.startTimer(startTime);
    this.loadCurrentChallenge();
  }

  startTimer(startTime: number) {
    if (!startTime) return;
    // Display live progress total time since click start
    this.timerInterval = setInterval(() => {
      const seconds = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(seconds / 60);
      const remainder = seconds % 60;
      this.formattedTime = `${minutes}m ${remainder}s`;
    }, 1000);
  }

  loadCurrentChallenge() {
    const currentIndex = this.currentChallenge;
    const key = `captchaChallenge_${currentIndex + 1}`;
    const savedState = localStorage.getItem(key);
    const challengeImages = [...this.challenges[currentIndex].images];

    // Restore error message 
    const errorKey = `captchaError_${currentIndex + 1}`;
    const savedError = localStorage.getItem(errorKey);
    this.errorMessages[currentIndex] = savedError ? savedError : '';
    this.isCompleted = false;

    if (savedState) {
      // Recover exact same grid (no re-shuffling)
      const { gridImages} = JSON.parse(savedState);
      // Restore exactly the same 9 images (grid subset from previous session)
      this.gridImages = gridImages.map((saved: ImageItem) => {
        const base = challengeImages.find((img: ImageItem) => img.src === saved.src);
        return base ? { ...base, selected: saved.selected } : saved;
      });

      const completedKey = `challengeCompleted_${currentIndex + 1}`;
      const savedCompleted = localStorage.getItem(completedKey);

      this.isCompleted = savedCompleted === "true"; // Only lock if user really completed
      if (!this.errorMessages[this.currentChallenge]) {
        this.errorMessages[this.currentChallenge] = '';
        localStorage.removeItem(`captchaError_${this.currentChallenge + 1}`); // Clear error

      }
    } else {
      // Generate fresh grid and save for the first time
      const shuffled = [...challengeImages];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        this.isCompleted = false;
      }
      // Save a fixed 9-image grid per challenge
      this.gridImages = shuffled.slice(0, 9).map(img => ({ ...img }));
      this.saveProgress();
    }
  }

  saveProgress() {
  // Save the current challenge grid and progress separately
    const key = `captchaChallenge_${this.currentChallenge + 1}`;
    // Store only what’s needed for reconstruction
    const state = {
      gridImages: this.gridImages.map((img: ImageItem) => ({
        src: img.src,
        alt: img.alt,
        selected: img.selected 
      })), // Lightweight grid: no answer properties like canFly, oddOne, or mathCorrect
    };
    localStorage.setItem(key, JSON.stringify(state));
    localStorage.setItem('currentChallenge', (this.currentChallenge + 1).toString());
  }

  selectImage(index: number) {
    this.gridImages[index].selected = !this.gridImages[index].selected;
    this.saveProgress();
  }

  hasSelection(): boolean {
    return this.gridImages.some(img => img.selected);
  }

  checkAnswers() {
    return this.challenges[this.currentChallenge].answerCheck(this.gridImages);
  }

  // This is the click handler for the user, runs the logic
  onSubmit() {
    if (this.checkAnswers()) {
      this.isCompleted = true;
      localStorage.setItem(`challengeCompleted_${this.currentChallenge + 1}`, "true");
      this.errorMessages[this.currentChallenge] = ''; 
      localStorage.removeItem(`captchaError_${this.currentChallenge + 1}`); // Clear error when correct
      // enable Next button
    } else {
      this.isCompleted = false;
      this.errorMessages[this.currentChallenge] = `Incorrect selection. Please try again.`;
      // RETRIES: Correctly increment the retry counter every wrong answer
      const retryKey = `captchaRetries_${this.currentChallenge + 1}`;
      const currentRetry = parseInt(localStorage.getItem(retryKey) || '0', 10);
      localStorage.setItem(retryKey, (currentRetry + 1).toString());

      localStorage.setItem(`captchaError_${this.currentChallenge + 1}`, this.errorMessages[this.currentChallenge]);
    
      // Cleae error after 3 seconds
      setTimeout(() => {
        this.errorMessages[this.currentChallenge] = '';
        localStorage.removeItem(`captchaError_${this.currentChallenge + 1}`);
      }, 3000);
    }
    this.saveProgress(); // Always update session state
  }

  exitCaptcha() {
    localStorage.setItem('captchaAborted', 'true');
    clearCaptchaSession();
    this.router.navigate(['/home']);
  }


  backChallenge() {
    this.saveProgress();
    if (this.currentChallenge > 0) {
      this.currentChallenge--;
      setTimeout(() => {
        this.loadCurrentChallenge();
        this.saveProgress();
      }, 0); // Delay actual loading to the end of the event loop reducing flicker and loading delays.
    }
  }

  nextChallenge() {
    this.saveProgress();
    if (this.currentChallenge < this.challenges.length - 1) {
      this.currentChallenge++;
      setTimeout(() => {
        this.loadCurrentChallenge();
        this.saveProgress();
      }, 0); // Delay actual loading to the end of the event loop
    } else {
    // For the final challenge, mark completion and redirect
    this.completeCaptchaRecord();
    }
  }

  finishChallenge() {
    this.completeCaptchaRecord();
  }
  // Helper function to complete captcha and redirect
  private completeCaptchaRecord(endTime: number = Date.now()) {
    const readableEndTime = new Date(endTime).toLocaleString();
    localStorage.setItem('captchaEndTime', `${endTime} (${readableEndTime})`);
    localStorage.setItem('captchaCompleted', 'true');
    this.saveProgress();
    this.router.navigate(['/result']);
  }
}

