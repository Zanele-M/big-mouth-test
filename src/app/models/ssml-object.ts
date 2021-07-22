import { Phoneme } from "./phoneme";

export class SsmlObject  {
    text!: string;
    languageCode!: string;
    voice!: string;
    phonemes!:Phoneme[];

   constructor(
       text: string,
       languageCode: string,
       voice: string,
       phonemes:Phoneme[]
   ){
    this.text = text;
    this.languageCode = languageCode,
    this.voice = voice;  
    this.phonemes = phonemes;

   }
}
