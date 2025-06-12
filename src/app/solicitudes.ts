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
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1');
  }
}
