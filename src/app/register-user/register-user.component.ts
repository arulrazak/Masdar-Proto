import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    console.log("this is running")
  }

   signup(){
     console.log("test");
    const x = document.getElementById("login");
  const y = document.getElementById("sign-up");
  const z = document.getElementById("btn");

    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "110px";

  }
  login(){
    console.log("test");
      const x = document.getElementById("login");
  const y = document.getElementById("sign-up");
  const z = document.getElementById("btn");

    x.style.left = "50px";
    y.style.left = "450px";
    z.style.left = "0px";

  }
  map(){
    this.router.navigateByUrl('/map')
  }
  // loginUser(e){
  //   e.preventDefault();
  //   console.log(e);
  //   var username = e.target.elements[0].value;
  //   var password = e.target.elements[1].value;
    
  //   if( username == 'admin' && password == 'admin'){
  //     this.router.navigate(['map-dashboard']);
  //   }
  // }

}
