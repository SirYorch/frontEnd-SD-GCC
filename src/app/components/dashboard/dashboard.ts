import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitudes } from '../../solicitudes';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  posts: { contenedor: string; id: number; imagen: string | null }[] = [];
  private socket!: WebSocket;

  constructor(
    private router: Router,
    private servicio: Solicitudes
  ) {}

  ngOnInit(): void {
    this.cargarPosts();

    // 1. Conectar al WebSocket
    this.socket = new WebSocket('http://34.71.68.251:8080/ws');

    // 2. Enviar saludo o mensaje inicial
    this.socket.onopen = () => {
      console.log("Conectado al WebSocket");
      // this.socket.send("hola");
    };

    // 3. Escuchar mensajes del servidor
    this.socket.onmessage = (msg) => {
     this.cargarPosts()
    };
  }

  cargarPosts() {
    this.servicio.getSolicitudes().subscribe((data: any) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  crear() {
    this.router.navigate(['/Crear']);
  }
}
