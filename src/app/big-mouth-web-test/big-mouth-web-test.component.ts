import { Component, Output } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';

@Component({
  selector: 'app-big-mouth-web-test',
  templateUrl: './big-mouth-web-test.component.html',
  styleUrls: ['./big-mouth-web-test.component.scss']
})
export class BigMouthWebTestComponent {

  private context = new AudioContext();

  constructor(private bigMouthApiService: BigMouthApiService){}
 
  ngOnInit(): void {

  }

  getAudio(paragragh: string ) {

   var buf;

   this.bigMouthApiService.getTexttoSpeach(paragragh).subscribe(result  => this.context.decodeAudioData(result, (buffer) => {
    buf = buffer;
    this.play(buf);
})
    );

  }
  play(buf:AudioBuffer) {
    // Create a source node from the buffer
    var source = this.context.createBufferSource();
    source.buffer = buf;
    // Connect to the final output node (the speakers)
    source.connect(this.context.destination);
    // Play immediately
    source.start(0);
}

  


}