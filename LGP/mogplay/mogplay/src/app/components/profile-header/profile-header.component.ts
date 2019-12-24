import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { User } from '../../models/User';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-profile-header',
	templateUrl: './profile-header.component.html',
	styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit {

	@Input() user: User;
	@Input() tokens: number;
	@Input() nPurchased: number;
	@Input() nUploaded: number;
	@Input() isMe: boolean;

	constructor() { }

	ngOnInit() { }

}
