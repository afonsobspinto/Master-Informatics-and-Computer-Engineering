

import { Component } from '@angular/core';
import { Banner } from '../models/Banner';
import { VideoService } from "../services/video.service";
import { Video } from "../models/Video";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {

	banners: Banner[];
	videos: Video[];


	constructor(private videoService: VideoService) { }

	ngOnInit() {

		this.videoService.getMostPopularTags(2).subscribe(_tags => {
			this.banners = _tags;
			if (this.banners.length == 2) {
				this.banners[0].background = 'tag1-banner';
				this.banners[1].background = 'tag2-banner';
			}

			this.videoService.getVideos().subscribe(_videos => {
				this.videos = _videos;


				console.log(this.banners);
				console.log(this.videos);
			})
		})




	}

}
