import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SsmlObject } from '../models/ssml-object';
import { literal } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class BigMouthApiService {

  constructor(private httpClient: HttpClient){}

  getTexttoSpeach(ssmlOject:SsmlObject): Observable<any> {
    let body = JSON.stringify(ssmlOject);
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: body, //Make xml requst
     });

     console.log("ssmlObject:", ssmlOject)
    
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
        /*phoneme: {
          alphabet:  alphabet,
          ph: ph,
          word: word
        }*/
}