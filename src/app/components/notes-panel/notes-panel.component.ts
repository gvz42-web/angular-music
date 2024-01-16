import { Component } from '@angular/core';
import {ToolbarModule} from "primeng/toolbar";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {ConfigService} from "../../config.service";
import {NgForOf} from "@angular/common";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-notes-panel',
  standalone: true,
  imports: [
    ToolbarModule,
    FormsModule,
    DropdownModule,
    NgForOf
  ],
  templateUrl: './notes-panel.component.html',
  styleUrl: './notes-panel.component.sass'
})
export class NotesPanelComponent {
  public notes
  public selected!: string;
  public notesAll: string[] = []

  constructor(private configService: ConfigService) {
    this.notes = this.configService.notes
    for (let i = 2; i<= 5; i++) {
      for (let note of ['C', 'C#', 'D', 'D#','E','F', 'F#', 'G', 'G#', 'A', 'A#', 'B']) {
        this.notesAll.push(`${note}${i}`)
      }
    }
  }

  updateNote(i: number, note: string) {
    this.configService.setNote(i, note)
  }
}
