import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantData } from '../core/constant-data';

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private http: HttpClient) { }

	public getImages(page?: number): Observable<Object> {
		const endpoint = page ? `images?page=${page}` : 'images';
		return this.http.get(ConstantData.API_URL + endpoint);
	}

	public getImage(id: string): Observable<Object> {
		const endpoint = `images/${id}`;
		return this.http.get(ConstantData.API_URL + endpoint);
	}
}
