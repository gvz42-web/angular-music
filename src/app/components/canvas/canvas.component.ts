import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NgIf} from "@angular/common";
import {Block} from "./canvasElements/block";
import {AnimationService} from "../../animation.service";

@Component({
  selector: 'app-canvas',
  standalone: true,
  imports: [
    NgIf
  ],
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
    // this.ctx.fillStyle = "rgb(255, 255, 255)"
    // const block = new Block(this.ctx, 10, 10, 20, 20)
  }
}
