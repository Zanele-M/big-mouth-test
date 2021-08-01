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

  headers = new HttpHeaders().set("x-functions-key", "ObnUdrfaVjPCeUsd6ZxcKdrztH5NrX/leiCbn798T0uaey3d3/mvjA==");

  constructor(private httpClient: HttpClient){}

  getTexttoSpeach(ssmlOject:SsmlObject): Observable<any> {
    let body = JSON.stringify(ssmlOject);
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: body, //Make xml requst
     });

     console.log("body:", body)
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