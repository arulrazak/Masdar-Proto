import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dsm',
  templateUrl: './dsm.component.html',
  styleUrls: ['./dsm.component.scss']
})
export class DsmComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  ortho(){
    console.log("test")
    this.router.navigateByUrl('/viewer')
  }
   Contour(){
     this.router.navigateByUrl('/contour')
   }

   Mesh(){

   }
   Dsm(){

   }
}
