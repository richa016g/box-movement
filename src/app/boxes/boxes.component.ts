import { Component, OnInit, HostListener } from '@angular/core';
import { Box } from '.././models/box';
import { BoxserviceService } from '../boxservice.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit {

  constructor(private boxService: BoxserviceService) { }

  borderHeight: number;
  borderWidth: number;
  currentId: number = 1;
  color: string = 'blue';
  width:number = 100;
  height: number =100;
  xValue: number ;
  yValue: number;
  selectedBoxId = null;
  bounds: any;
  boxes: Box[];

  ngOnInit() {
    this.bounds = this.boxService.getBounds()
    this.borderWidth = this.bounds.right - this.bounds.left ;
    this.borderHeight = this.bounds.bottom - this.bounds.top;
    // this.borderHeight = bounds.innerHeight-50;
    // this.borderWidth = bounds.innerWidth -50;
    this.xValue = (this.borderWidth-this.width)/2
    this.yValue = (this.borderHeight-this.height)/2
    this.boxes = this.boxService.getBoxes()
  }
  generateABox(event) {
      const newBox: Box = {
        'uid': this.currentId++,
        'width': this.width,
        'height': this.height,
        'color': this.color,
        'xValue': this.xValue,
        'yValue': this.yValue
      }

      this.boxService.addBox(newBox);
  }

  selectBox(boxData: Box) {
    this.selectedBoxId = boxData.uid;

  }


}
