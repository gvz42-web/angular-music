import { Injectable } from '@angular/core';
import * as Tone from 'tone'

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private synth!: Tone.Sampler;
  private reverb!: Tone.Reverb;

  constructor() {
    this.reverb = new Tone.Reverb(30).toDestination();

    this.synth = new Tone.Sampler({
      urls: {
        A1: "A1.mp3",
        A2: "A2.mp3",
      },
      baseUrl: "https://tonejs.github.io/audio/casio/",
    })

    this.synth.connect(this.reverb)
  }

  start() {
    if (Tone.context.state !== "running") {
      Tone.start()
    }
  }

  triggerNote(note: string) {
    this.synth.triggerAttackRelease(note, "2n")
  }
}
