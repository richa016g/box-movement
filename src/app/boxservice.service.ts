import { Injectable, EventEmitter } from '@angular/core';
import { Box } from './models/box';

@Injectable({
  providedIn: 'root'
})
export class BoxserviceService {

  boxes: Box[] = [];
  boxSelectedEmitter = new EventEmitter<number>();
  constructor() { }

  getBoxes() {
    return this.boxes;
  }
  getBounds() {
    return {'top':50,'left':25,'right':window.innerWidth - 25, 'bottom': window.innerHeight-25}
  }
  boxSelected(id:number) {
    this.boxSelectedEmitter.emit(id);
  }
  deleteBox(id:number) {
    let index = this.boxes.findIndex((elem)=> {
      return elem.uid == id;
    });
    this.boxes.splice(index,1);
  }

  addBox(box:Box) {
    this.boxes.push(box);
  }
}
