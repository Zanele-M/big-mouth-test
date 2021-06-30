import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';


@Component({
  selector: 'app-big-mouth-web-test',
  templateUrl: './big-mouth-web-test.component.html',
  styleUrls: ['./big-mouth-web-test.component.scss']
})
export class BigMouthWebTestComponent {


 
  constructor(private bigMouthApiService: BigMouthApiService){}
 
  ngOnInit(): void {
  }

  play(paragragh: string ) {
<<<<<<< HEAD
  
=======
>>>>>>> 1630c05bdb299707fdf15daf0c4da2721dbaf2ab

  var context: AudioContext;    // Audio context

  context = new AudioContext();
<<<<<<< HEAD
   this.bigMouthApiService.getTexttoSpeach(paragragh).subscribe(result  => console.log(result)
    );
=======
   this.bigMouthApiService.getTexttoSpeach(paragragh).subscribe(result  => this.audioObj.src = result );
   console.log(this.audioObj);
   this.audioObj.play();
>>>>>>> 1630c05bdb299707fdf15daf0c4da2721dbaf2ab
  }

}
