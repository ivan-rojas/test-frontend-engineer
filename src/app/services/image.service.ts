import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	private apiUrl: string = 'http://interview.agileengine.com/';

	constructor(private http: HttpClient) { }

	public getImages(page?: number): Observable<Object> {
		const options = {
			headers: new HttpHeaders({
    			Authorization: '501d7af63f7a434a8bd4f2dd45add72315291430'
			})
		}
		const endpoint = page ? `images?page=${page}` : 'images';

		return this.http.get(this.apiUrl + endpoint, options);
	}

	public getImage(id: string): Observable<Object> {
		const options = {
			headers: new HttpHeaders({
    			Authorization: '501d7af63f7a434a8bd4f2dd45add72315291430'
			})
		}
		const endpoint = `images/${id}`;

		return this.http.get(this.apiUrl + endpoint, options);
	}
}
