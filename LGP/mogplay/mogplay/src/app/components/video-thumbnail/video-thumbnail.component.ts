import { Component, OnInit, Input } from '@angular/core';
import { Video } from 'app/models/Video';
import * as moment from 'moment';
import { UserService } from 'app/services/user.service';
import { Cart } from 'app/models/Cart';
import axios from 'axios'
// import shortUrl from "node-url-shortener";

@Component({
	selector: 'app-video-thumbnail',
	templateUrl: './video-thumbnail.component.html',
	styleUrls: ['./video-thumbnail.component.css']
})
export class VideoThumbnailComponent implements OnInit {

	@Input() video: Video;
	@Input() cart: Cart;
	@Input() isMine: boolean;
	isInCart: boolean;
	timeDisplay: string;
	constructor(private userService: UserService) {
	}

	ngOnInit() {

		this.timeDisplay = moment().startOf('date').add(this.video.duration, 's').format('mm:ss');
		this.isInCart = this.cart.videos.filter(v => v.id === this.video.id).length > 0

	}

	toggleLeftButton() {
		if (this.isMine) {
			this.downloadFile()
		}

		if (this.isInCart) {
			this.userService.removeFromCart(this.video.id).subscribe(_newCart => {
				this.isInCart = !this.isInCart;
			})
		}
		else {
			this.userService.addToCart(this.video.id).subscribe(_newCart => {
				this.isInCart = !this.isInCart;
			})
		}
	}
	downloadFile() {
		/* shortUrl.short(this.video.highQualityPath, function (err, url) {
			console.log(url);*/
		axios.get(this.video.highQualityPath.toString(), { responseType: 'blob' }).then(r => {

			let blob = new Blob([r.data]);

			let linkDown = document.createElement('a')
			linkDown.href = window.URL.createObjectURL(blob);
			linkDown.download = 'download.mp4';
			document.body.appendChild(linkDown);
			linkDown.click()
			document.body.removeChild(linkDown)
		});
		// });

		// console.log("blob");
		// console.log(blob);	
	}
}
