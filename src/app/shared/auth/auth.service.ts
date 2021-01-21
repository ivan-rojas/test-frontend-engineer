import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantData } from 'src/app/core/constant-data';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	public getToken(): Observable<any> {
		const body = {
			'apiKey': '23567b218376f79d9415'
		};

		const options = {
			headers: new HttpHeaders({
    			'Content-Type': 'application/json'
			})
		};

		const endpoint = 'auth';

		return this.http.post(ConstantData.API_URL + endpoint, body, options);
	}
}
