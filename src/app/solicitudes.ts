import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Solicitudes {
  private http = inject(HttpClient);

  private readonly BACKEND_URL = 'http://34.46.243.239:8080';

  constructor() {}

  /**
   * Envía una imagen al servidor de archivos (7000)
   */
  EnviarImagen(selectedFile: File | null): Observable<any> {
    if (!selectedFile) {
      throw new Error("No hay archivo seleccionado");
    }

    const formData = new FormData();
    formData.append('imagen', selectedFile);

    return this.http.post(`${this.BACKEND_URL}/subir-imagen`, formData);
  }

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
