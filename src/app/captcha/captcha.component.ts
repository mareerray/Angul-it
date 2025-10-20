import { Component, OnInit } from '@angular/core';
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
  challenges: GridChallenge[] = [
    // 1. Can Fly
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
      ],
      answerCheck: (imgs: ImageItem[]) => imgs.every(img => img.selected === !!img.canFly)
    },
    // 2. Odd-One-Out
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
      // answerCheck: (imgs: ImageItem[]) =>
      //   imgs.filter(img => img.selected).length === 1 &&
      //   !!imgs.find(img => img.selected)?.oddOne
    },
    // 3. Math
    {
      type: 'math-select',
      prompt: 'Select all images with correct math answers',
      images: [
        { src: 'assets/images/math-2plus2-4.png', alt: '2 + 2 = 4', selected: false, correct: true },
        { src: 'assets/images/math-3times3-9.png', alt: '3 × 3 = 9', selected: false, correct: true },
        { src: 'assets/images/math-6minus5-2.png', alt: '6 - 5 = 2', selected: false, correct: false },
        { src: 'assets/images/math-4plus4-8.png', alt: '4 + 4 = 8', selected: false, correct: true },
        { src: 'assets/images/math-7minus1-6.png', alt: '7 - 1 = 5', selected: false, correct: true },
        { src: 'assets/images/math-8div2-4.png', alt: '8 / 2 = 4', selected: false, correct: true },
        { src: 'assets/images/math-5plus1-6.png', alt: '5 + 1 = 6', selected: false, correct: true },
        { src: 'assets/images/math-3plus3-5.png', alt: '3 + 3 = 5', selected: false, correct: false },
        { src: 'assets/images/math-1plus1-2.png', alt: '1 + 1 = 2', selected: false, correct: true },
        { src: 'assets/images/math-6mod4-2.png', alt: '6 % 4 = 2', selected: false, correct: true }, // Modulus
        { src: 'assets/images/math-5mod3-3.png', alt: '5 % 3 = 3', selected: false, correct: false },
        { src: 'assets/images/math-2pow3-8.png', alt: '2 ^ 3 = 8', selected: false, correct: true }, // Exponent (power)
        { src: 'assets/images/math-3pow2-6.png', alt: '3 ^ 2 = 6', selected: false, correct: false }
      ],
      answerCheck: (imgs: ImageItem[]) => imgs.every(img => img.selected === !!img.correct)
    },
    
  ];

  currentChallengeIndex = 0;
  gridImages: ImageItem[] = [];
  userSelections: ImageItem[][] = [];

  ngOnInit() {
    const savedIndex = sessionStorage.getItem('currentChallenge');
    if (savedIndex !== null) {
      this.currentChallengeIndex = parseInt(savedIndex, 10) - 1;
    }
    this.loadCurrentChallenge();
  }

  saveProgress() {
  // Save the current challenge grid and progress separately
    const key = `captchaChallenge_${this.currentChallengeIndex + 1}`;
    // Store only what’s needed for reconstruction
    const state = {
      gridImages: this.gridImages.map((img: ImageItem) => ({
        src: img.src,
        alt: img.alt,
        selected: img.selected 
      })) // Lightweight grid: no answer properties like canFly, oddOne, or correct
    };
    sessionStorage.setItem(key, JSON.stringify(state));
    sessionStorage.setItem('currentChallenge', (this.currentChallengeIndex + 1).toString());
  }


  selectImage(index: number) {
    this.gridImages[index].selected = !this.gridImages[index].selected;
    this.saveProgress();
  }

  hasSelection(): boolean {
    return this.gridImages.some(img => img.selected);
  }

  loadCurrentChallenge() {
    const currentIndex = this.currentChallengeIndex;
    const key = `captchaChallenge_${currentIndex + 1}`;
    const savedState = sessionStorage.getItem(key);
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

  checkAnswers() {
    return this.challenges[this.currentChallengeIndex].answerCheck(this.gridImages);
  }

  nextChallenge() {
    this.saveProgress();
    if (this.currentChallengeIndex < this.challenges.length - 1) {
      this.currentChallengeIndex++;
      this.loadCurrentChallenge();
      this.saveProgress();
    } else {
      console.log('All challenges completed');
    }
  }

  backChallenge() {
    this.saveProgress();
    if (this.currentChallengeIndex > 0) {
      this.currentChallengeIndex--;
      this.loadCurrentChallenge();
      this.saveProgress();
    }
  }
}

