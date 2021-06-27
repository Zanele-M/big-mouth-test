import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BigMouthApiService {

  constructor(private httpClient: HttpClient){}

  API_KEY = 'YOUR_API_KEY';

  getTexttoSpeach(text: string) {
    const finalRequest = ({
      url: 'https://eastus.tts.speech.microsoft.com/cognitiveservices/v1', 
      body: {
        text: text,
        properties: {
          gender:"female",
          languages:"en-US" 
        }
      }, //Make xml requst
     });

    return this.httpClient
      .post( finalRequest.url, finalRequest.body )
      .pipe(catchError(this.handleError)) as Observable<any>;
  }

  handleError(error: Error) {

    if(error instanceof Error)
    {
      return throwError(error)
    }
    return throwError('Something bad happened; please try again later.');
  }
}
