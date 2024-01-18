import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AnimationService} from "../../animation.service";

@Component({
  selector: 'app-canvas',
  standalone: true,
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.sass'
})
export class CanvasComponent implements AfterViewInit{
  private ctx!: CanvasRenderingContext2D;

  constructor(private animation: AnimationService) {
  }

  @ViewChild("canvas", { static: false }) canvas!: ElementRef;

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d")
    this.animation.init(this.ctx)
  }
}
