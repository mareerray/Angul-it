import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

interface ImageItem {
  src: string;
  alt: string;  
  canFly: boolean;
  selected: boolean;
}

@Component({
  selector: 'app-captcha',
  imports: [NgFor],
  standalone: true,
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})

export class CaptchaComponent implements OnInit {
  allImages: ImageItem[] = [
    { src: 'assets/images/hot-air-balloon.png', alt: 'hot air balloon', canFly: true, selected: false },
    { src: 'assets/images/dove.png', alt: 'dove', canFly: true, selected: false },
    { src: 'assets/images/dragonfly.png', alt: 'dragonfly', canFly: true, selected: false },
    { src: 'assets/images/airplane.png', alt: 'airplane', canFly: true, selected: false },
    { src: 'assets/images/paperplane.png', alt: 'paper plane', canFly: true, selected: false },
    { src: 'assets/images/butterfly.png', alt: 'butterfly', canFly: true, selected: false },
    { src: 'assets/images/helicopter.png', alt: 'helicopter', canFly: true, selected: false },
    { src: 'assets/images/bee.png', alt: 'bee', canFly: true, selected: false },
    { src: 'assets/images/sailing-boat.png', alt: 'sailing boat', canFly: false, selected: false },
    { src: 'assets/images/sportbike.png', alt: 'sportbike', canFly: false, selected: false },
    { src: 'assets/images/cat.png', alt: 'cat', canFly: false, selected: false }, // Add more as needed
    { src: 'assets/images/dog.png', alt: 'dog', canFly: false, selected: false }
  ];

  gridImages: ImageItem[] = [];

  ngOnInit() {
    this.gridImages = this.getRandomImages(9);
  }

  getRandomImages(count: number): ImageItem[] {
    // Create a copy to shuffle
    const imagesCopy = [...this.allImages];
    // Shuffle array
    for (let i = imagesCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [imagesCopy[i], imagesCopy[j]] = [imagesCopy[j], imagesCopy[i]];
    }
    return imagesCopy.slice(0, count);
  }

  selectImage(index: number) {
    this.gridImages[index].selected = !this.gridImages[index].selected;
  }

  checkAnswers() {
    return this.gridImages.every(img => 
      img.selected === img.canFly
    );
  }
}
