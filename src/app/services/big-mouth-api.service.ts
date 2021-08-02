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

  getTexttoSpeach(ssmlObject: SsmlObject): Observable<any> {

    
    let jsonString: any = JSON.stringify(ssmlObject)

    let jsonObject: any = JSON.parse(jsonString)

    console.log("this is the obkect", jsonObject)
    const finalRequest = ({
      url: 'https://bigmouth.azurewebsites.net/api/bigmouthtrigger', 
      body: 

        jsonObject

    , 
   });
    console.log("body: ", finalRequest.body)
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