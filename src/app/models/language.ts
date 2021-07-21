export class Language {
    languageName!: string;
       languageCode!: string;
       voices!: string[];

   constructor(
       languageName: string,
       languageCode: string,
       voices: string[]
   ){
    this.languageName = languageName;
    this.languageCode = languageCode,
    this.voices = voices;  

   }
}
