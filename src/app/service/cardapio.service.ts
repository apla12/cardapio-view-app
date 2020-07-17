import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cardapio } from '../model/cardapio';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardapioService {

  apiURL: string = environment.apiURLBase + "/api/cardapios"

  constructor(private http: HttpClient) { }

  addCardapio(cardapio: Cardapio): Observable<any> {
    var formData: any = new FormData();
    formData.append("categoria", cardapio.categoria);
    formData.append("file", cardapio.file);

    return this.http.post(this.apiURL, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}