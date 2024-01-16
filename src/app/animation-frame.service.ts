import { Injectable } from '@angular/core';
import {animationFrames, map, Observable, pairwise} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimationFrameService {
  public $frames!: Observable<number>
  constructor() { }

  startAnimation() {
    this.$frames = animationFrames().pipe(
      map(({ elapsed }) => elapsed),
      pairwise(),
      map(([previous, current]) => current - previous)
    );
  }
}
