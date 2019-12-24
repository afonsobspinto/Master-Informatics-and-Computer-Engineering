import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		const currentUser = this.authenticationService.currentUserValue;

		try {
			if (!currentUser) {
				throw new Error('Unlogged')
			}

			await this.authenticationService.checkToken(currentUser.token).toPromise()

			return true;
		} catch (error) {
			// not logged in so redirect to login page with the return url
			this.authenticationService.logout();
			this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
			return false;
		}
	}
}
