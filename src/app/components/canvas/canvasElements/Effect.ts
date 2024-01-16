export class Effect {
  private _ctx: CanvasRenderingContext2D;
  private _time: number;
  private _duration: number;

  constructor(ctx: CanvasRenderingContext2D, duration: number) {
    this._duration = duration
    this._ctx = ctx
    this._time = duration
  }

  draw(elapsed: number) {
    this._time -= elapsed
    if (this._time >= 0) {
      this._ctx.shadowBlur = 40
      this._ctx.shadowColor = `rgba(255,255,255,${this._time/this._duration * 0.6})`
      return true
    } else {
      return false
    }
  }
}
