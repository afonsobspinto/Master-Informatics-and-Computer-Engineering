import { Component, OnInit } from '@angular/core';
import { VideoService } from 'app/services/video.service';
import { Video } from 'app/models/Video';
import { Subject } from 'rxjs';
import { Tag } from 'app/models/Tag';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-videos-page',
	templateUrl: './videos-page.component.html',
	styleUrls: ['./videos-page.component.css']
})
export class VideosPageComponent implements OnInit {

	tags: Tag[];
	selectedTag: Tag;
	allTag: Tag = { id: -1, name: 'all' };
	videos: Video[];
	changeTagSub: Subject<number> = new Subject<number>();

	constructor(
		private videoService: VideoService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		this.videoService.getMostPopularTags(5).subscribe(_tags => {
			this.tags = _tags;

			if (this.tags.length > 0) {

				let selectedTagId = this.route.snapshot.queryParams['tag'] || -1;
				
				if(selectedTagId == -1){
					this.selectedTag = this.allTag;
				}
				else {
					let tag = this.tags.filter(x => x.id == selectedTagId);
					this.selectedTag = tag.length ? tag[0] : this.allTag;
				}

			}
			
			this.getVideos();


		})
	}


	toggleTag(tag: Tag) {

		this.changeTagSub.next(tag.id)
		this.selectedTag = tag;

		this.getVideos();

	}

	getVideos() {
		if(this.selectedTag.id == -1){
			this.videoService.getVideos().subscribe(_videos => {
				this.videos = _videos;
			})
		}
		else{
			this.videoService.getVideosByTag(this.selectedTag.name).subscribe(_videos => {
				this.videos = _videos;
			})
		}
	}


}
