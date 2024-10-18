import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToD_curricular(){
    window.open('https://drive.google.com/file/d/1n43zLl_PC5IovckTjJQBLhGZqCScfpb5/preview', '_blank');
  }
}
