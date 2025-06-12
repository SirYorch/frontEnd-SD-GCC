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
export class Dashboard  implements OnInit {
  posts = [
    'Este es el primer post. ¡Hola mundo!',
    'Acabo de terminar un proyecto en Angular 🚀',
    '¿Qué opinan sobre el nuevo diseño de nuestra app?','Este es el primer post. ¡Hola mundo!',
    'Acabo de terminar un proyecto en Angular 🚀',
    '¿Qué opinan sobre el nuevo diseño de nuestra app?','Este es el primer post. ¡Hola mundo!',
    'Acabo de terminar un proyecto en Angular 🚀',
  ];

  constructor(private router: Router, private servicio:Solicitudes) {}
  ngOnInit(): void {
    this.servicio.getSolicitudes().subscribe((data:any)=>{
      console.log(data);
      
    })
  }

  crear(){
    this.router.navigate(['/Crear']);
  }
}
