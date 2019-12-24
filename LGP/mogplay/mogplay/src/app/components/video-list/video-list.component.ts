import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'app/models/Video';
import { Tag } from 'app/models/Tag';
import { Cart } from 'app/models/Cart';
import { UserService } from 'app/services/user.service';
import { VideoService } from 'app/services/video.service';
import { DataService } from 'app/data.service';
import { User } from 'app/models/User';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
	selector: 'app-video-list',
	templateUrl: './video-list.component.html',
	styleUrls: ['./video-list.component.css']
})

export class VideoListComponent implements OnInit {

	// Thumbnail example for testing
	@Input() videos: Video[];
	cart: Cart;
	userBlockchain: any;

	constructor(
		private userService: UserService,
		private videoService: VideoService,
		private dataService: DataService<User>,
		private authenticationService: AuthenticationService
	) { }

	ngOnInit() {
	}

	ngOnChanges() {
		this.userService.getCart().subscribe(_cart => {
			this.cart = _cart;
		})
		
		
		this.dataService.getUser(this.authenticationService.currentUserValue.id).then(_user => {
			this.userBlockchain = _user.data;
		})
	}

	isMine(videoId) {				
		return this.userBlockchain.purchasedVideos.filter(x => x.videoID == videoId).length > 0
	}

}
