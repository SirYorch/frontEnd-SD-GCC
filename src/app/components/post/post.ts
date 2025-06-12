import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './post.html',
  styleUrl: './post.scss'
})
export class Post {
  newPost = '';
  submitPost() {
    ///codigo aqui para enviar las nuevas posts
    this.dash();
  }
  constructor(private router: Router) {}
  dash(){
    this.router.navigate(['/']);
  }
}
