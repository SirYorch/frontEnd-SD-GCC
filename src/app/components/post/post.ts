import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitudes } from '../../solicitudes';

@Component({
  selector: 'app-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post {
  newPost = '';
  
  submitPost() {
    this.sistema.EnviarCorreo({ contenedor: this.newPost }).subscribe(
      (response: any) => {
        console.log('Post enviado exitosamente:', response);
        this.newPost = ''; // Limpiar el campo de entrada después de enviar
      },
      (error: any) => {
        // Manejar error si es necesario
      },
      () => {
        this.dash();
      }
    );
      
  }
  constructor(private router: Router,private sistema: Solicitudes) {}
  dash(){
    this.router.navigate(['/']);
  }
}
