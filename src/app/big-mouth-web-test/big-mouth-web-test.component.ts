import { Component, Output } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';
//import { Parameters } from '../models/parameters';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-big-mouth-web-test',
  templateUrl: './big-mouth-web-test.component.html',
  styleUrls: ['./big-mouth-web-test.component.scss']
})
export class BigMouthWebTestComponent {

  private context = new AudioContext();
  ttsForm!: FormGroup;

  constructor(private bigMouthApiService: BigMouthApiService, private fb: FormBuilder) { }


  private form: FormGroup | undefined;

  ngOnInit() {
     this.ttsForm = this.fb.group({
         text: new FormControl(),
         language: new FormControl(),
         voiceName: new FormControl()
     });

  }

  voiceNames = ["en-US-Guy24kRUS", "de-DE-KatjaNeural"];
  languages = ["en-US", "de-DE"]

  getAudio() {

    const textInput=this.ttsForm.controls.text.value;
    const languageInput= this.ttsForm.controls.language.value;
    const voiceName= this.ttsForm.controls.voiceName.value;


    var buf;

    this.bigMouthApiService.getTexttoSpeach(textInput, languageInput, voiceName).subscribe(result => this.context.decodeAudioData(result, (buffer) => {
      buf = buffer;
      this.play(buf);
    })
    );

  }

  play(buf: AudioBuffer) {
    // Create a source node from the buffer
    var source = this.context.createBufferSource();
    source.buffer = buf;
    // Connect to the final output node (the speakers)
    source.connect(this.context.destination);
    // Play immediately
    source.start(0);
  }
}