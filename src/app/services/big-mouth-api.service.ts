import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BigMouthApiService {

  constructor(private httpClient: HttpClient){}

  getTexttoSpeach(text: string) {
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: {
        text: text,
        properties: {
          voice_name:"en-US-Guy24kRUS",
          language:"en-US" 
        }
      }, //Make xml requst
     });

    return this.httpClient
      .post( finalRequest.url, finalRequest.body )
      .pipe(catchError(this.handleError)).subscribe(() => { });
  }

  handleError(error: Error) {

    if(error instanceof Error)
    {
      return throwError(error)
    }
    return throwError('Something bad happened; please try again later.');
  }
}
