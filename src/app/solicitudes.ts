import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Solicitudes {

  constructor() { }
  private http = inject(HttpClient);
  
  getSolicitudes(){
    return this.http.get('http://104.155.162.91:3000/api/posts');
  }
  EnviarCorreo(dato:any){
    return this.http.post('http://104.155.162.91:3000/api/posts',dato)
  }
}
