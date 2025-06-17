import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Solicitudes } from '../../solicitudes';

@Component({
  selector: 'app-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post implements OnInit{
  newPost = '';
  selectedFile: File | null = null;
  nombre: string | null = null;
  private socket!: WebSocket;
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.nombre = this.selectedFile.name
    }
  }
  
  submitPost() {
    if(this.selectedFile){
      this.sistema.EnviarCorreo({ contenedor: this.newPost, imagen:this.nombre}).subscribe(
      (response: any) => {
        console.log('Post enviado exitosamente:', response);
        
        console.log(this.sistema.EnviarImagen(this.selectedFile))
        this.socket.send(this.newPost);
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
    else{
      this.sistema.EnviarCorreo({ contenedor: this.newPost}).subscribe(
      (response: any) => {
        console.log('Post enviado exitosamente:', response);
        this.socket.send(this.newPost);
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
      
  }

  
  constructor(private router: Router,private sistema: Solicitudes) {}
  ngOnInit(): void {
    // 1. Conectar al WebSocket
    this.socket = new WebSocket('http://34.46.243.239:8080/ws');

    // 2. Enviar saludo o mensaje inicial
    this.socket.onopen = () => {
      console.log("Conectado al WebSocket");
    };

    

  }
  

  dash(){
    this.router.navigate(['/']);
  }
}
