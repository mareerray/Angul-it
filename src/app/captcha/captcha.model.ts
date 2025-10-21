// src/app/captcha/captcha.model.ts

export interface ImageItem {
  src: string;
  alt: string;
  selected: boolean;
  canFly?: boolean;
  oddOne?: boolean;
  mathCorrect?: boolean;
}

export interface GridChallenge {
  type: 'image-select' | 'odd-one-out' | 'math-select';
  prompt: string;
  images: ImageItem[];
  answerCheck: (imgs: ImageItem[]) => boolean;
}
