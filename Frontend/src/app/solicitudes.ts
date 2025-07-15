import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Solicitudes {
  private http = inject(HttpClient);

  private readonly BACKEND_URL = '/api';

  private readonly TIMEOUT_MS = 5000; // 5 segundos
  private readonly MAX_RETRIES = 7;

  constructor() { }

  getSolicitudes(): Observable<any> {
    return this.http.get(`${this.BACKEND_URL}/datos`).pipe(
      timeout(this.TIMEOUT_MS),  //tiempo de espera que colocamos
      retry(this.MAX_RETRIES), //cantidad de intentos a una solicitud
      catchError((error) => {
        console.error('Error en getSolicitudes:', error);
        return throwError(() => error);
      })
    );
  }

  EnviarCorreo(dato: any): Observable<any> {
    return this.http.post(`${this.BACKEND_URL}/insertar`, dato).pipe(
      timeout(this.TIMEOUT_MS),
      retry(this.MAX_RETRIES),
      catchError((error) => {
        console.error('Error en EnviarCorreo:', error);
        return throwError(() => error);
      })
    );
  }
}
