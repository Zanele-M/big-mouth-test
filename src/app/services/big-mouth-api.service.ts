import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SsmlObject } from '../models/ssml-object';
import { literal } from '@angular/compiler/src/output/output_ast';
import { Lexicon } from '../models/lexicon';

@Injectable({
  providedIn: 'root'
})

export class BigMouthApiService {

  headers = new HttpHeaders().set("x-functions-key", "ObnUdrfaVjPCeUsd6ZxcKdrztH5NrX/leiCbn798T0uaey3d3/mvjA==");

  constructor(private httpClient: HttpClient){}

  getTexttoSpeach(textInput:string, languageCodes:string, voiceName: string, alphabet: string, articleName: string, grapheme:string, type:string, vocable:string): Observable<any> {
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: {
        "text": textInput,
        "language": languageCodes,
        "voice_name": voiceName,
        "alphabet": alphabet,
        "article_name": articleName,
        "lexicons": [
            {
                "type": type,
                "vocable": vocable,
                "grapheme": grapheme
            }
        ]
    }, //Make xml requst
     });

    return this.httpClient
      .post( finalRequest.url, finalRequest.body, {headers: this.headers, responseType: 'arraybuffer'})
      .pipe(catchError(this.handleError));
  }

  getLexicon(){

    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger',
    });
    return this.httpClient.post(finalRequest.url, { headers: this.headers } ).pipe(catchError(this.handleError)) as Observable<any>; 
  }

  handleError(error: Error) {

    if(error instanceof Error)
    {
      console.log(error)
      return throwError(error)
      
    }
    return throwError(error);
  }
        /*phoneme: {
          alphabet:  alphabet,
          ph: ph,
          word: word
        }*/
}