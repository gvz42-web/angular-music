import { Injectable } from '@angular/core';
import {AnimationFrameService} from "./animation-frame.service";
import {Block} from "./components/canvas/canvasElements/block";
import {SoundService} from "./sound.service";
import {ConfigService} from "./config.service";
import {Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private ctx!: CanvasRenderingContext2D;
  private blocks!: Block[];
  private notes!: string[]
  private animationSubscription!: Subscription;
  private _isStarted!: boolean;

  constructor(
    private animationFrame: AnimationFrameService,
    private soundService: SoundService,
    private configService: ConfigService
  ) {
    this.notes = this.configService.notes
  }

  init(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.animationFrame.startAnimation()

    this.initDraw()

    document.addEventListener('visibilitychange', (event) => {
      if (this._isStarted) {
        this.toggle()
      }
    });

    this.configService.minHeight$.subscribe(() => this.modify())
    this.configService.dh$.subscribe(() => this.modify())
  }

  initDraw() {
    this.blocks = []
    this._isStarted = false

    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe()
    }
    this.ctx.clearRect(0, 0, 1000, 600);

    for (let i = 0; i < 8; i++) {
      this.blocks.push(
        new Block({
          ctx: this.ctx,
          height: this.configService.dh * (8 - i) + this.configService.minHeight,
          width: 80,
          y: 0,
          x: i* 120 + 40,
          i: i
        })
      )
      this.blocks.forEach((block, i) => block.addCollideListener((data: any) => {
        this.soundService.triggerNote(this.configService.notes[i])
      }))
    }
  }

  get isStarted() {
    return this._isStarted
  }

  toggle() {
    if (this._isStarted) {
      this.animationSubscription.unsubscribe()
    } else {
      this.animationSubscription = this.animationFrame.$frames.subscribe((elapsed) => this.draw(elapsed))
    }
    this._isStarted = !this._isStarted
  }

  draw(elapsed: number) {
    this.ctx.clearRect(0, 0, 1000, 600);
    this.blocks.forEach((block) => block.move(elapsed, this.configService.speed))
  }

  modify() {
    this.ctx.clearRect(0, 0, 1000, 600);
    this.blocks.forEach((block, i) => {
      block.modify(this.configService.dh * (8 - i) + this.configService.minHeight)
      block.draw()
    })
  }
}
