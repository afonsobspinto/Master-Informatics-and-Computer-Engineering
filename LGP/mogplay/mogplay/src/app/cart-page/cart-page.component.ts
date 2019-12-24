import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Video } from '../models/Video';
import { Cart } from '../models/Cart';
import { forEach } from '@angular/router/src/utils/collection';
import { AuthenticationService } from '../services/authentication.service';
import { DataService } from '../data.service';
import { User } from '../com.mog.technologies';
import uuidv1 from 'uuid/v1';
import { VideoService } from 'app/services/video.service';

@Component({
	selector: 'app-cart-page',
	templateUrl: './cart-page.component.html',
	styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

	cart: Video[] = [];
	userBlockchain: any;
	purchasedVideos: Video[] = [];
	constructor(private userService: UserService,
		private videoService: VideoService,
		private authenticationService: AuthenticationService,
		private dataService: DataService<User>) {
	}

	ngOnInit() {

		this.userService.getCart().subscribe(_cart => {
			this.cart = _cart.videos;
		});

		this.getUserBlockchain();

		// if (!this.cart) { this.cart = []; }
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

	getTotalPrice() {
		let total = 0;
		this.cart.forEach(element => {
			total += element.price;
		});

		return Math.round(total * 100) / 100
	}

	getCartLength() {
		return this.cart.length;
	}

	async buyVideo() {

		const loggedIn = !!this.authenticationService.currentUserValue;
		if (loggedIn) {
			const user = this.authenticationService.currentUserValue;
			const response = await this.dataService.getTokens(user.token);
			const tokens = response.data.tokens;
			const totalPrice = this.getTotalPrice();
			const videos = this.cart.map((video) => `com.mog.technologies.Video#${video.id}`);
			if (tokens > totalPrice) {
				const purchase = {
					'$class': 'com.mog.technologies.Purchase',
					'videos': videos,
					'newOwner': `com.mog.technologies.User#${user.id}`,
					'totalPrice': totalPrice,
					'timestamp': +new Date()
				};
				try {
					await this.dataService.addPurchase(purchase);

					this.purchasedVideos = this.purchasedVideos.concat(this.cart)

					this.cart.forEach(video => {
						this.removeFromCart(video.id)
					});

					return true
				}
				catch (error) {
					console.log(error);
				}
				return false
			}
		}
		return false
	}

	removeFromCart(videoId) {
		this.userService.removeFromCart(videoId).subscribe(_newCart => {
			this.cart = _newCart.videos;
		});
	}

}
