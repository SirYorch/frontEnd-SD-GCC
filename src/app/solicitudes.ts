import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Solicitudes {
  private http = inject(HttpClient);

  private readonly BACKEND_URL = 'http://192.168.1.102:5001';
  

  constructor() {}
  /**
   * Recupera todos los posts desde el backend (5001)
   */
  getSolicitudes(): Observable<any> {
    return this.http.get(`${this.BACKEND_URL}/datos`);
  }

  /**
   * Envía texto + nombre de imagen al backend (5001)
   */
  EnviarCorreo(dato: any): Observable<any> {
    return this.http.post(`${this.BACKEND_URL}/insertar`, dato);
  }
}
