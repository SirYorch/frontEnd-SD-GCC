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
export class Post{
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
  this.sistema.EnviarCorreo({ contenedor: this.newPost }).subscribe({
    next: (respuestaPost) => {
      console.log(' Post sin imagen enviado:', respuestaPost);
      this.socket.send(this.newPost);
      this.newPost = '';
    },
    complete: () => this.dash()
  });
}

  
  constructor(private router: Router,private sistema: Solicitudes) {}

  dash(){
    this.router.navigate(['/']);
  }
}
