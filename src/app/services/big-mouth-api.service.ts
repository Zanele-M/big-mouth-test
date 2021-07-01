import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class BigMouthApiService {

  constructor(private httpClient: HttpClient){}

  getTexttoSpeach(text: string, language: string, voiceName: string): Observable<any> {
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: {
        text: text,
        properties: {
          voice_name: voiceName,
          language: language 
        }
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
