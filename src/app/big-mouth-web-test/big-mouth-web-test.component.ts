import { Component, Output } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';
import { Phoneme } from '../models/phoneme';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Language } from '../models/language';
import { SsmlObject } from '../models/ssml-object';
import { Lexicon } from '../models/lexicon';
import { buffer } from 'rxjs/operators';
import { Time } from '@angular/common';


@Component({
  selector: 'app-big-mouth-web-test',
  templateUrl: './big-mouth-web-test.component.html',
  styleUrls: ['./big-mouth-web-test.component.scss']
})
export class BigMouthWebTestComponent {

  private context = new AudioContext();
  ttsForm!: FormGroup;
  languages: Array<Language> = [];
  phonemes: Array<Phoneme> = [];
  lexicons: Lexicon[] = [];
  voiceNameFilter: any;
  lexiMessage: String = "";
  lexicon: any;
  
  english = new Language("English", "en-US", ["en-US-Gut24kRUS"," en-US-JennyNeural"]);
  german = new Language("German", "de-DE", ["de-DE-KatjaNeural", "de-DE-ConradNeural"]);

  constructor(private bigMouthApiService: BigMouthApiService, private fb: FormBuilder) { }

  ngOnInit() {
     this.ttsForm = this.fb.group({
         text: new FormControl('', Validators.required),
         language: new FormControl('', Validators.required),
         voiceName: new FormControl('', Validators.required),
         alphabet: new FormControl('', Validators.required),
         ph: new FormControl(),
         word: new FormControl(),
         type: new FormControl('', Validators.required),
         vocable: new FormControl('', Validators.required),
         grapheme: new FormControl('', Validators.required),
         articleName: new FormControl(),
     });
     this.languages.push(this.german, this.english);

    /* this.bigMouthApiService.getLexicon().subscribe(data => {this.lexicon = data});
     console.log("Lexicon: ", this.lexicon);*/
  }

  getAudio() {
    const languageName  = this.ttsForm.controls.language.value;
    let languageCode : any;

    if ( languageName == "English"){
      languageCode = this.english.languageCode
    }
    else {
       languageCode = this.german.languageCode
    }

    const alphabet= this.ttsForm.controls.alphabet.value;
    const ph= this.ttsForm.controls.ph.value;
    const word= this.ttsForm.controls.word.value;

    // const phonemeObject = new Phoneme(alphabet, ph, word);

    // this.phonemes.push(phonemeObject)

    const ssmlObject = new SsmlObject(this.ttsForm.controls.text.value, languageCode, this.ttsForm.controls.voiceName.value, this.ttsForm.controls.alphabet.value, this.ttsForm.controls.articleName.value, this.lexicons)

    var buf= this.context.createBufferSource();
 
    this.bigMouthApiService.getTexttoSpeach(ssmlObject).subscribe(result => this.context.decodeAudioData(result, (buffer) => {
      // this.ttsForm.controls.type.value,  this.ttsForm.controls.grapheme.value, this.ttsForm.controls.vocable.value
      console.log(buffer)
      buf.buffer = buffer;
      this.play(buf.buffer);
    }).catch(function(error){console.log(buf.buffer)})
    )
  }

  addLexicon(){
    this.lexiMessage = "";
    const type= this.ttsForm.controls.type.value;
    const grapheme= this.ttsForm.controls.grapheme.value;
    const vocable= this.ttsForm.controls.vocable.value;

    const lexiconObject = new Lexicon(type, grapheme, vocable);
    this.lexicons.push(lexiconObject); 

    console.log(this.lexicons);

     
     for(let i = 0; i < this.lexicons.length; i++){
       this.lexiMessage += this.lexicons[i].type + ": " + this.lexicons[i].grapheme + " " + this.lexicons[i].vocable + " | ";
     }
  }

  /*getLexicon(): any{
    return this.bigMouthApiService.getLexicon();
  }*/

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