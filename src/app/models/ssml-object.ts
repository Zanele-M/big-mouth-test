import { Lexicon } from "./lexicon";
import { Phoneme } from "./phoneme";

export class SsmlObject  {
    text!: string;
    languageCode!: string;
    voice!: string;
    //phonemes!:Phoneme[];
    lexicons!:Lexicon[];

   constructor(
       text: string,
       languageCode: string,
       voice: string,
       //phonemes:Phoneme[],
       lexicons: Lexicon[]
   ){
    this.text = text;
    this.languageCode = languageCode,
    this.voice = voice;  
    //this.phonemes = phonemes;
    this.lexicons = lexicons;

   }
}
