import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  posts = [
    'Este es el primer post. ¡Hola mundo!',
    'Acabo de terminar un proyecto en Angular 🚀',
    '¿Qué opinan sobre el nuevo diseño de nuestra app?','Este es el primer post. ¡Hola mundo!',
    'Acabo de terminar un proyecto en Angular 🚀',
    '¿Qué opinan sobre el nuevo diseño de nuestra app?','Este es el primer post. ¡Hola mundo!',
    'Acabo de terminar un proyecto en Angular 🚀',
  ];
  constructor(private router: Router) {}
  crear(){
    this.router.navigate(['/Crear']);
  }
}
