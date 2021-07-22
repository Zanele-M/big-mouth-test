export class Phoneme {
    alphabet!: string;
    ph!: string[];
    word!: string[];

   constructor(
    alphabet: string,
    ph: string[],
    word: string[]
   ){
    this.alphabet = alphabet;
    this.ph = ph,
    this.word = word;  

   }
}
