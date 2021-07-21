import { Component, Output } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';
import { TextItemNode } from '../models/TextItemNode';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Language } from '../models/language';


@Component({
  selector: 'app-big-mouth-web-test',
  templateUrl: './big-mouth-web-test.component.html',
  styleUrls: ['./big-mouth-web-test.component.scss']
})
export class BigMouthWebTestComponent {

  private context = new AudioContext();
  ttsForm!: FormGroup;
  languages: Array<Language> = [];
  voiceNameFilter: any;
  
  english = new Language("English", "en-US", ["en-US-Gut24kRUS"]);
  german = new Language("German", "de-DE", ["de-DE-KatjaNeural", "de-DE-ConradNeural"]);

  constructor(private bigMouthApiService: BigMouthApiService, private fb: FormBuilder) { }


  private form: FormGroup | undefined;

  ngOnInit() {
     this.ttsForm = this.fb.group({
         text: new FormControl(),
         language: new FormControl(),
         voiceName: new FormControl(),
         alphabet: new FormControl(),
         ph: new FormControl(),
         word: new FormControl()
     });
     this.languages.push(this.german, this.english);
  }

  getAudio() {
    const textInput=this.ttsForm.controls.text.value;
    const languageInput= this.ttsForm.controls.language.value;
    const voiceName= this.ttsForm.controls.voiceName.value;
    const alphabet= this.ttsForm.controls.alphabet.value;
    const ph= this.ttsForm.controls.ph.value;
    const word= this.ttsForm.controls.word.value;

    const textItemNode = new TextItemNode()
    var buf;

    this.bigMouthApiService.getTexttoSpeach(textInput, languageInput, voiceName, alphabet, ph, word).subscribe(result => this.context.decodeAudioData(result, (buffer) => {
      buf = buffer;
      this.play(buf);
    })
    )
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