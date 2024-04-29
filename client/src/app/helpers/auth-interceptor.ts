import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    /**
     * @remarks This method intercepts all the http requests and adds the token to the headers if it exists.
     * 
     * @param req - HttpRequest<any> object
     * @param next - HttpHandler object
     * @returns - Observable<HttpEvent<any>> object
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');

        // Handle the request if the token is not present. Don't allow user to see pages after logout
        if (!token) {
            return next.handle(req).pipe( tap(() => {},
            (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
               return;
              }
              this.router.navigate(['login']);
            }
          }));
        }

        const request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return next.handle(request);
    }
}