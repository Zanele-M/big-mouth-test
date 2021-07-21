import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { literal } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class BigMouthApiService {

  constructor(private httpClient: HttpClient){}

  getTexttoSpeach(text: string, languageInput: string, voiceName: string, alphabet: string, ph: string, word: string): Observable<any> {
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: {
        text: text,
        properties: {
          voice_name: voiceName,
          language: languageInput 
        },
        /*phoneme: {
          alphabet:  alphabet,
          ph: ph,
          word: word
        }*/
      }, //Make xml requst
     });
    
    return this.httpClient
      .post( finalRequest.url, finalRequest.body, {responseType: 'arraybuffer'})
      .pipe(catchError(this.handleError));
  }

  handleError(error: Error) {

    if(error instanceof Error)
    {
      console.log(error)
      return throwError(error)
      
    }
    return throwError(error);
  }
}