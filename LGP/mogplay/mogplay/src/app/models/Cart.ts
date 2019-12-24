import { Video } from "./Video";

export class Cart {
	id: number;
	ownerId: number;
	shoppingCartId: number;
	videos: Video[];
}
