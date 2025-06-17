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
  if (this.selectedFile) {
    // 1. Primero subir la imagen
    this.sistema.EnviarImagen(this.selectedFile).subscribe({
      next: (respuestaImagen) => {
        console.log('✅ Imagen subida:', respuestaImagen);

        // 2. Luego enviar el post con el nombre de imagen
        const nombreImagen = this.selectedFile?.name;

        this.sistema.EnviarCorreo({ contenedor: this.newPost, imagen: nombreImagen }).subscribe({
          next: (respuestaPost) => {
            console.log('✅ Post enviado:', respuestaPost);
            this.socket.send(this.newPost);
            this.newPost = '';
          },
          complete: () => this.dash()
        });
      },
      error: (error) => {
        console.error('❌ Error al subir imagen:', error);
        alert('Error al subir la imagen');
      }
    });
  } else {
    // Si no hay imagen, solo envía el texto
    this.sistema.EnviarCorreo({ contenedor: this.newPost }).subscribe({
      next: (respuestaPost) => {
        console.log('✅ Post sin imagen enviado:', respuestaPost);
        this.socket.send(this.newPost);
        this.newPost = '';
      },
      complete: () => this.dash()
    });
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
