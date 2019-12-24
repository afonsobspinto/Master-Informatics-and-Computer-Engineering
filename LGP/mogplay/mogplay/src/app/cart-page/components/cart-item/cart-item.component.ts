import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Video } from "../../../models/Video";

@Component({
	selector: 'app-cart-item',
	templateUrl: './cart-item.component.html',
	styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

	@Input() video: Video;
	@Output() removeItemFromCartEvent = new EventEmitter<number>();
	constructor() { }

	ngOnInit() {
	}

	removeFromCart() {
		this.removeItemFromCartEvent.emit(this.video.id);
	}

}
