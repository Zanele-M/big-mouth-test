export class Lexicon {
    type!: string;
    grapheme!: string[];
    vocable!: string[];

   constructor(
    type: string,
    grapheme: string[],
    vocable: string[]
   ){
    this.type = type;
    this.grapheme = grapheme,
    this.vocable = vocable;  
   }
}
