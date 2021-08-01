import { Component, Output } from '@angular/core';
import { BigMouthApiService } from '../services/big-mouth-api.service';
import { Phoneme } from '../models/phoneme';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Language } from '../models/language';
import { SsmlObject } from '../models/ssml-object';
import { Lexicon } from '../models/lexicon';
import { buffer } from 'rxjs/operators';


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
  lexicons: Array<Lexicon> = [];
  voiceNameFilter: any;
  lexiMessage: String = "";
  lexicon: any;
  
  english = new Language("English", "en-US", ["en-US-Gut24kRUS"]);
  german = new Language("German", "de-DE", ["de-DE-KatjaNeural", "de-DE-ConradNeural"]);

  constructor(private bigMouthApiService: BigMouthApiService, private fb: FormBuilder) { }

  ngOnInit() {
     this.ttsForm = this.fb.group({
         text: new FormControl(),
         language: new FormControl(),
         voiceName: new FormControl(),
         alphabet: new FormControl(),
         ph: new FormControl(),
         word: new FormControl(),
         type: new FormControl(),
         vocable: new FormControl(),
         grapheme: new FormControl(),
         articleName: new FormControl(),
     });
     this.languages.push(this.german, this.english);

     this.bigMouthApiService.getLexicon().subscribe(data => {this.lexicon = data});
     console.log("Lexicon: ", this.lexicon);
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

    const phonemeObject = new Phoneme(alphabet, ph, word);

    this.phonemes.push(phonemeObject)

    //const ssmlObject = new SsmlObject(textInput, languageCode, voiceName, alphabet, this.ttsForm.controls.articleName.value, true, this.ttsForm.controls.type.value, this.ttsForm.controls.grapheme.value, this.ttsForm.controls.vocable.value)

    var buf= this.context.createBufferSource();

    this.bigMouthApiService.getTexttoSpeach(this.ttsForm.controls.text.value, languageCode, this.ttsForm.controls.voiceName.value, this.ttsForm.controls.alphabet.value, this.ttsForm.controls.articleName.value,  this.ttsForm.controls.type.value,  this.ttsForm.controls.grapheme.value, this.ttsForm.controls.vocable.value ).subscribe(result => this.context.decodeAudioData(result, (buffer) => {
      console.log(buffer)
      buf.buffer = buffer;
      this.play(buf.buffer);
    }).catch(function(error){})
    )
  }

  addLexicon(){
    this.lexiMessage = "";
    const type= this.ttsForm.controls.type.value;
    const grapheme= this.ttsForm.controls.grapheme.value;
    const vocable= this.ttsForm.controls.vocable.value;

    const lexiconObject = new Lexicon(type, grapheme, vocable);
    this.lexicons.push(lexiconObject); 
     
     for(let i = 0; i < this.lexicons.length; i++){
       this.lexiMessage += this.lexicons[i].type + ": " + this.lexicons[i].grapheme + " " + this.lexicons[i].vocable + " | ";
     }

    this.ttsForm.controls.type.reset();
    this.ttsForm.controls.grapheme.reset();
    this.ttsForm.controls.vocable.reset();
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