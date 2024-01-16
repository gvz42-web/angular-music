import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _speed = new BehaviorSubject(10)
  private _notes  =  new BehaviorSubject(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
  private _minHeight= new BehaviorSubject(20)
  private _dh = new BehaviorSubject(20)

  public minHeight$ = this._minHeight.asObservable()
  public dh$ = this._dh.asObservable()
  public notes$ = this._notes.asObservable()
  public speed$ = this._speed.asObservable()

  constructor() {
  }

  set speed(value:number) {
    this._speed.next(value)
  }

  get speed() {
    return this._speed.value
  }

  setNote(i: number, value: string) {
    this._notes.value[i] = value
    this._notes.next(this._notes.value)
  }

  get notes() {
    return this._notes.value
  }

  set minHeight(value: number) {
    this._minHeight.next(value)
  }

  get minHeight() {
    return this._minHeight.value
  }

  set dh(value: number) {
    this._dh.next(value)
  }

  get dh() {
    return this._dh.value
  }
}
