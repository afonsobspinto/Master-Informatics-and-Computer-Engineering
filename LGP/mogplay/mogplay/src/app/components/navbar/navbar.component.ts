import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	private loggedIn: boolean;
	private user: any = {};

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {

		this.router.events.filter(e => e instanceof NavigationEnd).subscribe(res => {
			this.loggedIn = !!this.authenticationService.currentUserValue;
			if (this.loggedIn) {
				this.user = this.authenticationService.currentUserValue;
			}
		})

	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
		// location.assign('/login');

	}
}
