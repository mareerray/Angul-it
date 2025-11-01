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

export const CHALLENGES: GridChallenge[] = [
    // 1. Can Fly x 15
    {
      type: 'image-select',
      prompt: 'Click all the images that show something that can fly.',
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
      prompt: 'Which picture does not show an animal?',
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
      prompt: 'Pick all images where the math answer is correct',
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
