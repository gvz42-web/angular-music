import {Effect} from "./Effect";

interface IBlockConfig {
  height: number
  width: number
  y: number
  x: number
  ctx: CanvasRenderingContext2D
}

export class Block {
  private height: number;
  private width: number;
  private x: number;
  private y: number;
  private ctx: CanvasRenderingContext2D;
  private direction: boolean;
  private collideListeners: Function[];
  private effect!: Effect | undefined;

  constructor(config: IBlockConfig) {
    this.ctx = config.ctx
    this.height = config.height
    this.width = config.width
    this.x = config.x
    this.y = config.y
    this.direction = true
    this.collideListeners = []

    this.draw()
  }

  reverse() {
    this.direction = !this.direction
  }

  move(elapsed: number, speed: number) {
    if (this.direction) {
      this.y += elapsed / speed
    } else {
      this.y -= elapsed / speed
    }

    if (this.effect) {
      const isEffectFinished = !this.effect.draw(elapsed)
      if (isEffectFinished) {
        this.effect = undefined
      }
    }

    this.draw()
    this.ctx.shadowColor = 'transparent'
    this.checkCollide()
  }

  modify(newHeight: number) {
    if (this.y + newHeight > 600) {
      this.y -= this.y + newHeight - 600
    }
    this.height = newHeight
  }

  checkCollide() {
    if ((this.y + this.height >= 600 && this.direction) || (this.y <= 0 && !this.direction)) {
      this.reverse()
      this.collideListeners.forEach((fn) => {
        fn()
      })
      this.effect = new Effect(this.ctx, 1000)
    }
  }

  draw() {
    this.ctx.fillStyle = 'rgb(255,255,255)'
    this.ctx.fillRect(this.x,this.y,this.width, this.height)
  }

  addCollideListener(fn: Function) {
    this.collideListeners.push(fn)
  }
}
