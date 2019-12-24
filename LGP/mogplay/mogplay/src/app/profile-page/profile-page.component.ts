import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/User';

import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'app/models/Video';
import { DataService } from 'app/data.service';
import { VideoService } from 'app/services/video.service';

@Component({
	selector: 'app-profile-page',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

	id: number;
	user: User;
	userBlockchain: any;
	uploadedVideos: Video[];
	isMe: boolean;
	private sub: any;
	purchasedVideos: Video[] = [];

	constructor(
		private userService: UserService,
		private route: ActivatedRoute,
		private videoService: VideoService,
		private authenticationService: AuthenticationService,
		private dataService: DataService<User>
	) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; // (+) converts string 'id' to a number

			this.reload();  // In a real app: dispatch action to load the details here.
		});
	}

	reload() {
		this.userService.getUser(this.id).subscribe(_user => {
			this.user = _user;
			// User uploaded videos
			this.user.uploaded = [];

			this.userService.getUploadedVideos(this.id).subscribe(_videos => {
				this.uploadedVideos = _videos;
				this.getUserBlockchain()
	
				this.isMe = this.authenticationService.currentUserValue.id === this.id;
			})

		})
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	getUserBlockchain() {
		this.dataService.getUser(this.authenticationService.currentUserValue.id).then(_user => {
			this.userBlockchain = _user.data;

			this.userBlockchain.purchasedVideos.forEach(video => {
				this.videoService.getVideo(video.videoID).subscribe(_video => {
					this.purchasedVideos.push(_video);
				})
			});
		})
	}


}
