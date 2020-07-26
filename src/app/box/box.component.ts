import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Box } from '../models/box';
import { BoxserviceService } from '../boxservice.service';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css']
})
export class BoxComponent implements OnInit {

  @Input() boxData: Box;
  @Output() boxSelected = new EventEmitter<Box>();
  borderColor: string ='transparent';
  isBoxSelected: boolean = false;
  bounds: any; 

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if(this.isBoxSelected) {
      if(event.key == 'ArrowUp' || event.key == 'W') {
        let decreaseValue = this.boxData.yValue - this.bounds.top>=5? 5: this.boxData.yValue - this.bounds.top
        this.boxData.yValue = this.boxData.yValue - decreaseValue;
      }
      else if(event.key == 'ArrowDown'|| event.key =='S') {
        let incValue = this.bounds.bottom -this.boxData.yValue - this.boxData.height >=5? 5: this.bounds.bottom -this.boxData.yValue - this.boxData.height
        this.boxData.yValue = this.boxData.yValue + incValue;
      }
      else if(event.key == 'ArrowLeft' || event.key == 'A') {
        let decreaseValue = this.boxData.xValue - this.bounds.left>=5?5: this.boxData.xValue - this.bounds.left
        this.boxData.xValue = this.boxData.xValue - decreaseValue;
      }
      else if(event.key == 'ArrowRight' || event.key =='D') {
        let incValue = this.bounds.right - this.boxData.xValue - this.boxData.width >=5?5 : this.bounds.right - this.boxData.xValue - this.boxData.width;
        this.boxData.xValue = this.boxData.xValue + incValue;
      }
      else if(event.key == 'Delete') {
        console.log('key delete pressed');
        this.boxService.deleteBox(this.boxData.uid)
      }
    }
    
  }

  constructor(private boxService: BoxserviceService) { }

  ngOnInit() {
    this.bounds = this.boxService.getBounds();
    this.boxService.boxSelectedEmitter.subscribe((id:number)=>{
      if (this.boxData.uid == id) {
        this.isBoxSelected = true;
        this.borderColor = 'red';
      }
      else {
        this.isBoxSelected = false;
        this.borderColor = 'transparent';
      }
        
    })
  }

  selectBox() {
    this.boxService.boxSelected(this.boxData.uid)
  }
  

}
