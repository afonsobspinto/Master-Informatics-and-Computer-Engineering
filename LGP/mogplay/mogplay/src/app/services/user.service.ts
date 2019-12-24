import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { dbApiActionUrl } from '../data.service'
import { User } from '../models/User';
import { Video } from '../models/Video';
import { Cart } from '../models/Cart';
import { map } from 'rxjs/operators';
import { sha256 } from 'js-sha256';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  //   userUrl = 'https://jsonplaceholder.typicode.com/users';
  userUrl = dbApiActionUrl + 'api/users';

  constructor(private http: HttpClient) { }

  // Get user
  getUser(id: number): Observable<User> {

    return this.http.get<User>(`${this.userUrl}/${id}`);
  }

  // Edit Email
  editEmail(email: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.userUrl}/email`, { email, user })
      .pipe(map(user => {
        return user;
      }));
  }

  // Edit Password
  editPassword(password: string, user: User): Observable<User> {

    const passHash = sha256(password);

    return this.http.put<User>(`${this.userUrl}/password`, { password: passHash, user })
      .pipe(map(user => {
        return user;
      }));
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.userUrl}/shopping-cart`);
  }

  getUploadedVideos(userId): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.userUrl}/uploaded/${userId}`)
  }

	addToCart(videoId): Observable<Cart> {
		return this.http.patch<Cart>(`${this.userUrl}/shopping-cart`, {videoId})
	}
	
	removeFromCart(videoId): Observable<Cart> {
		return this.http.patch<Cart>(`${this.userUrl}/shopping-cart`, {videoId, toDelete: true})
	}

	toggleCart(videoId): Observable<Cart> {
		let exists:boolean;

		this.getCart().subscribe(_cart => {
			exists = _cart.videos.filter(_video => _video.id === videoId).length > 0;
		})
		
		return exists ? this.removeFromCart(videoId) : this.addToCart(videoId);
	}

}
