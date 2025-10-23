import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ImageItem, GridChallenge } from './captcha.model';

@Component({
  selector: 'app-captcha',
  imports: [NgFor, NgIf],
  standalone: true,
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})

export class CaptchaComponent implements OnInit {
  constructor(private router: Router) {}
  challenges: GridChallenge[] = [
    // 1. Can Fly x 15
    {
      type: 'image-select',
      prompt: 'Select all images that can fly',
      images: [
        { src: 'assets/images/hot-air-balloon.png', alt: 'hot air balloon', selected: false, canFly: true },
        { src: 'assets/images/dove.png', alt: 'dove', selected: false, canFly: true },
        { src: 'assets/images/dragonfly.png', alt: 'dragonfly', selected: false, canFly: true },
        { src: 'assets/images/airplane.png', alt: 'airplane', selected: false, canFly: true },
        { src: 'assets/images/paperplane.png', alt: 'paper plane', selected: false, canFly: true },
        { src: 'assets/images/butterfly.png', alt: 'butterfly', selected: false, canFly: true },
        { src: 'assets/images/helicopter.png', alt: 'helicopter', selected: false, canFly: true },
        { src: 'assets/images/bee.png', alt: 'bee', selected: false, canFly: true },
        { src: 'assets/images/sailing-boat.png', alt: 'sailing boat', selected: false, canFly: false },
        { src: 'assets/images/lion.png', alt: 'lion', selected: false, canFly: false },
        { src: 'assets/images/elephant.png', alt: 'elephant', selected: false, canFly: false },
        { src: 'assets/images/gorilla.png', alt: 'gorilla', selected: false, canFly: false },
        { src: 'assets/images/spaceship.png', alt: 'spaceship', selected: false, canFly: true },
        { src: 'assets/images/bat.png', alt: 'bat', selected: false, canFly: true },
        { src: 'assets/images/eagle.png', alt: 'eagle', selected: false, canFly: true },
      ],
      answerCheck: (imgs: ImageItem[]) => imgs.every(img => img.selected === !!img.canFly)
    },
    // 2. Odd-One-Out x 12
    {
      type: 'odd-one-out',
      prompt: 'Select the image that does not belong to the group',
      images: [
        { src: 'assets/images/cat.png', alt: 'cat', selected: false, oddOne: false },
        { src: 'assets/images/dog.png', alt: 'dog', selected: false, oddOne: false },
        { src: 'assets/images/lion.png', alt: 'lion', selected: false, oddOne: false },
        { src: 'assets/images/elephant.png', alt: 'elephant', selected: false, oddOne: false },
        { src: 'assets/images/gorilla.png', alt: 'gorilla', selected: false, oddOne: false },
        { src: 'assets/images/horse.png', alt: 'horse', selected: false, oddOne: false },
        { src: 'assets/images/pig.png', alt: 'pig', selected: false, oddOne: false },
        { src: 'assets/images/cow.png', alt: 'cow', selected: false, oddOne: false },
        { src: 'assets/images/sportbike.png', alt: 'sportbike', selected: false, oddOne: true },
        { src: 'assets/images/helicopter.png', alt: 'helicopter', selected: false, oddOne: true },
        { src: 'assets/images/hot-air-balloon.png', alt: 'hot air balloon', selected: false, oddOne: true },
        { src: 'assets/images/sailing-boat.png', alt: 'sailing boat', selected: false, oddOne: true }
      ],
      answerCheck: (imgs: ImageItem[]) => imgs.every(img => img.selected === !!img.oddOne)
    },
    // 3. Math x 17
    {
      type: 'math-select',
      prompt: 'Select all images with mathCorrect math answers',
      images: [
        { src: 'assets/images/math-2plus2-4.png', alt: '2 + 2 = 4', selected: false, mathCorrect: true },
        { src: 'assets/images/math-3times3-9.png', alt: '3 × 3 = 9', selected: false, mathCorrect: true },
        { src: 'assets/images/math-6minus5-2.png', alt: '6 - 5 = 2', selected: false, mathCorrect: false },
        { src: 'assets/images/math-4plus4-8.png', alt: '4 + 4 = 8', selected: false, mathCorrect: true },
        { src: 'assets/images/math-7minus1-6.png', alt: '7 - 1 = 5', selected: false, mathCorrect: true },
        { src: 'assets/images/math-8div2-4.png', alt: '8 / 2 = 4', selected: false, mathCorrect: true },
        { src: 'assets/images/math-5plus1-6.png', alt: '5 + 1 = 6', selected: false, mathCorrect: true },
        { src: 'assets/images/math-1plus1-2.png', alt: '1 + 1 = 2', selected: false, mathCorrect: true },
        { src: 'assets/images/math-4mod6-4.png', alt: '4 % 6 = 4', selected: false, mathCorrect: true },
        { src: 'assets/images/math-6mod4-2.png', alt: '6 % 4 = 2', selected: false, mathCorrect: true }, // Modulus
        { src: 'assets/images/math-5mod3-3.png', alt: '5 % 3 = 3', selected: false, mathCorrect: false },
        { src: 'assets/images/math-2pow3-8.png', alt: '2³ = 8', selected: false, mathCorrect: true }, // Exponent (power)
        { src: 'assets/images/math-3pow2-6.png', alt: '3² = 6', selected: false, mathCorrect: false },
        { src: 'assets/images/math-3pow0-3.png', alt: '3⁰ = 3', selected: false, mathCorrect: false },
        { src: 'assets/images/math-0pow3-0.png', alt: '0³ = 0', selected: false, mathCorrect: true },
        { src: 'assets/images/math-5pow0-1.png', alt: '5⁰ = 1', selected: false, mathCorrect: true },
        { src: 'assets/images/math-5pow2-25.png', alt: '5² = 25', selected: false, mathCorrect: true },
      ],
      answerCheck: (imgs: ImageItem[]) => imgs.every(img => img.selected === !!img.mathCorrect)
    },
    
  ];

  currentChallenge = 0;
  gridImages: ImageItem[] = [];
  userSelections: ImageItem[][] = [];
  timerInterval: any;
  formattedTime = '';
  //   timerInterval!: ReturnType<typeof setInterval>;
  // formattedTime = '0m 0s';

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

    if (savedState) {
      // Recover exact same grid (no re-shuffling)
      const { gridImages } = JSON.parse(savedState);
      // Restore exactly the same 9 images (grid subset from previous session)
      this.gridImages = gridImages.map((saved: ImageItem) => {
        const base = challengeImages.find((img: ImageItem) => img.src === saved.src);
        return base ? { ...base, selected: saved.selected } : saved;
      });
    } else {
      // Generate fresh grid and save for the first time
      const shuffled = [...challengeImages];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
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
      })) // Lightweight grid: no answer properties like canFly, oddOne, or mathCorrect
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

  backChallenge() {
    this.saveProgress();
    if (this.currentChallenge > 0) {
      this.currentChallenge--;
      this.loadCurrentChallenge();
      this.saveProgress();
    }
  }

  nextChallenge() {
    this.saveProgress();
    if (this.currentChallenge < this.challenges.length - 1) {
      this.currentChallenge++;
      this.loadCurrentChallenge();
      this.saveProgress();
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

