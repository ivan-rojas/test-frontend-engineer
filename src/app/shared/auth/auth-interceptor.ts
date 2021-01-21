import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpClient,
	HttpErrorResponse,
	HttpHeaders
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	constructor(private auth: AuthService) { }


	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let token = localStorage.getItem('aengine-api-token');

		console.log('Interceptor')

		if(token) 
		{
			request = request.clone({
				headers: new HttpHeaders({
					Authorization: token
				})
			});

			console.log('Using existent token', token);
		}

		return next.handle(request).pipe(
			catchError((err: HttpErrorResponse) => {
				if(err.status === 401)
				{
					return this.auth.getToken().pipe(
						switchMap(response => {
							request = request.clone({
								headers: new HttpHeaders({
									Authorization: response.token
								})
							});

							localStorage.setItem('aengine-api-token', response.token);
							console.log('Using a new token', response.token);
							return next.handle(request);
						})
					)
				}
				else
					return throwError(err);
			})
		)
	}
}