import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';

@Component({
  selector: 'app-big-mouth-web-test',
  templateUrl: './big-mouth-web-test.component.html',
  styleUrls: ['./big-mouth-web-test.component.scss']
})
export class BigMouthWebTestComponent {

  @Output() hover = new EventEmitter();  

  constructor(private bigMouthApiService: BigMouthApiService){}
 
  ngOnInit(): void {
  }

  play() {
    const paragragh = ;
    console.log("Plays", paragragh);
    this.bigMouthApiService.getTexttoSpeach(paragragh);
  }

}
