import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styles: ['.bg-dark{background-color: #1077ff !important;}']
})
export class HeaderComponent implements OnInit {
	public location = '';

	constructor(private router: Router) {}

	ngOnInit() {}

	gotoHome (e) {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}


		const routePath = "map";
		this.router.navigateByUrl(routePath);
	}
}
