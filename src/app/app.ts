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

  ngOnInit() {
    if (!localStorage.getItem('freshBoot')) {
      localStorage.clear();
      localStorage.setItem('freshBoot', 'true');
    }
  }
}
