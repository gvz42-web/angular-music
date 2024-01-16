import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import {SoundService} from "./sound.service";
import {CardModule} from "primeng/card";
import {CanvasComponent} from "./components/canvas/canvas.component";
import {AnimationService} from "./animation.service";
import {ControlPanelComponent} from "./components/control-panel/control-panel.component";
import {NotesPanelComponent} from "./components/notes-panel/notes-panel.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ButtonModule, CardModule, CanvasComponent, ControlPanelComponent, NotesPanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'angular-music';
  started: boolean = false;

  constructor(private sound: SoundService, private animationService: AnimationService) {
  }

  start() {
    this.sound.start()
    this.started = true
  }

  playNote(note: string) {
    this.sound.triggerNote(note)
  }
}
