import { Component } from '@angular/core';
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {AnimationService} from "../../animation.service";
import {ConfigService} from "../../config.service";
import {KnobModule} from "primeng/knob";
import {FormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CardModule,
    ToolbarModule,
    ButtonModule,
    KnobModule,
    FormsModule,
    SliderModule
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.sass'
})
export class ControlPanelComponent {

  public speed!: number;
  public minHeight!: number;
  public dh!: number

  constructor(
    public animationService: AnimationService,
    private configService: ConfigService)
  {
    this.speed = 100 / this.configService.speed
    this.minHeight = this.configService.minHeight
    this.dh = this.configService.dh
  }

  toggleAnimation() {
    this.animationService.toggle()
  }

  reset() {
    this.animationService.initDraw()
  }

  changeSpeed(value: number | undefined) {
    if (value) {
      this.configService.speed = 100 / value
    }
  }

  changeMinHeight(value: number | undefined) {
    if (value) {
      this.configService.minHeight = value
    }
  }

  changeDH(value: number | undefined) {
    if (value) {
      this.configService.dh = value
    }
  }
}
