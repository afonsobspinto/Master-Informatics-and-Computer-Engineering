import { Thumbnail } from "./Thumbnail";
import { Tag } from "./Tag";

export class Video {
	id: number;
	//title: String;
	//description: Text;
	price: number;
	highQualityPath: String;
	watermarkPath: String;
	viewCount: number;
	size: number;
	rating: number;
	duration: number;
	bitrate: number;
	createdAt: Date;
	updatedAt: Date;
	uploaderId: number;
	uploaderName: string;
	Tags: Tag[];
	thumbnails: Thumbnail[];
}
