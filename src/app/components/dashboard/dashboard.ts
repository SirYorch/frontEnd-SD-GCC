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
  posts: { contenedor: string; id: number}[] = [];
  private socket!: WebSocket;

  constructor(
    private router: Router,
    private servicio: Solicitudes
  ) {}

  ngOnInit(): void {
    this.cargarPosts();
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
