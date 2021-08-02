import { Lexicon } from "./lexicon";
import { Phoneme } from "./phoneme";

export class SsmlObject  {
    text!: string;
    language_code!: string;
    voice_name!: string;
    alphabet!:string;
    article_name!: string;
    //phonemes!:Phoneme[];
    lexicons!:Lexicon[];

   constructor(
       text: string,
       language_code: string,
       voice_name: string,
       alphabet: string,
       article_name: string,
       //phonemes:Phoneme[],
       lexicons: Lexicon[]
   ){
    this.text = text;
    this.language_code = language_code;
    this.voice_name = voice_name;  
    this.alphabet = alphabet;
    this.article_name = article_name;
    //this.phonemes = phonemes;
    this.lexicons = lexicons;

   }
}
