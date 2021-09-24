import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contour',
  templateUrl: './contour.component.html',
  styleUrls: ['./contour.component.scss']
})
export class ContourComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  ortho(){
    console.log("test")
    this.router.navigateByUrl('/viewer')
  }
   Dsm(){
     this.router.navigateByUrl('/contour')
   }

   Mesh(){

   }
   Contour(){

   }
}
