import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../models/Video';
import { VideoService } from '../services/video.service';
import { UserService } from 'app/services/user.service';
import { Cart } from 'app/models/Cart';


@Component({
	selector: 'app-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
	id: number;
	video: Video;
	isInCart: boolean;
	private sub: any;
	minutes: number;
	seconds: number;
	videoSize: string;
	videoBitrate: string;
	recommendedVideos: Video[];

	constructor(
		private videoService: VideoService,
		private route: ActivatedRoute,
		private userService: UserService
	) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; // (+) converts string 'id' to a number

			this.reload(); // In a real app: dispatch action to load the details here.
		});
	}

	reload() {
		
		this.videoService.getVideo(this.id).subscribe(_video => {
			this.video = _video;

			if (this.video) {

				this.minutes = Math.floor(this.video.duration / 60);
				this.seconds = this.video.duration % 60;
				this.videoSize = this.humanFileSize(this.video.size, 'B');
				this.videoBitrate = this.humanFileSize(this.video.bitrate, 'bps');
			
				this.userService.getCart().subscribe(_cart => {
					this.isInCart = _cart.videos.filter(v => v.id === this.video.id).length > 0;
				})
			}


		});

		

		this.videoService.getVideos().subscribe(_videos => {
			this.recommendedVideos = _videos;
		});


	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	toggleCart() {
		
		if(this.isInCart){
			this.userService.removeFromCart(this.video.id).subscribe(_newCart => {
				this.isInCart = !this.isInCart;	
			})
		}
		else{
			this.userService.addToCart(this.video.id).subscribe(_newCart => {
				this.isInCart = !this.isInCart;	
			})
		}
	}

	humanFileSize(bytes, unit, si = true) {
		var thresh = si ? 1000 : 1024;
		if(Math.abs(bytes) < thresh) {
			return bytes + ' ' + unit;
		}
		var units = si
			? ['k','M','G','T','P','E','Z','Y']
			: ['Ki','Mi','Gi','Ti','Pi','Ei','Zi','Yi'];
		var u = -1;
		do {
			bytes /= thresh;
			++u;
		} while(Math.abs(bytes) >= thresh && u < units.length - 1);
		return bytes.toFixed(1)+' '+units[u]+unit;
	}
}
