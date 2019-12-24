import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../models/Video';
import { dbApiActionUrl } from '../data.service';
import { Tag } from 'app/models/Tag';


@Injectable({
  providedIn: 'root'
})
export class VideoService {
	private readonly videoUrl: string;
	private readonly tagsUrl: string;

  constructor(private http: HttpClient) {
    this.videoUrl = dbApiActionUrl + 'api/videos';
    this.tagsUrl = dbApiActionUrl + 'api/tags';
  }

  // Get video
  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.videoUrl}/${id}`/*, httpOptions*/);
  }

  getVideo2(id: number): Video {
    return {
      id: 1,
      // title: "Cenas",
      // description: "um vídeo qualquer",
      price: 333.33,
      highQualityPath: 'assets/videos/sample.mp4',
      watermarkPath:
        '/home/vosferatu/Desktop/lgp-1a/mogplay/mogplay/src/assets/videos/sample.mp4',
      viewCount: 32,
      size: 456,
      rating: 3,
      duration: 680,
      bitrate: 24,
      createdAt: new Date(),
      updatedAt: new Date(),
      uploaderId: 1,
      uploaderName: 'LeoTeixeira',
      Tags: [
        {
          'id': 2,
          'name': 'foofighters'
        },
        {
          'id': 1,
          'name': 'rock'
        }
      ],
      thumbnails: [
        {
          'id': 2,
          'path': 'assets/images/video_placeholders/ph-2.jpg'
        },
        {
          'id': 1,
          'path': 'assets/images/video_placeholders/ph-1.jpg'
        }
      ]
    };
  }

  getVideos(): Observable<Video[]> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     withCredentials: 'true'
    //   })
    // };

    return this.http.get<Video[]>(`${this.videoUrl}`/*, httpOptions*/);
  }

  getTags(): Observable<Tag[]> {
	  return this.http.get<Tag[]>(`${this.tagsUrl}`)
  }

  getMostPopularTags(limit: number): Observable<any[]> {
	return this.http.get<any[]>(`${this.tagsUrl}/most-popular/${limit}`);
  }

  getVideosByTag(tagName: string): Observable<Video[]> {
	return this.http.get<Video[]>(`${this.tagsUrl}/${tagName}/tagged-videos`);
  }
}
