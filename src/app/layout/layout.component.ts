import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  public location = '';

  constructor(private router: Router) {
    this.location = router.url;
  }

  ngOnInit() {}

}
