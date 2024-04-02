import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    /**
     * @remarks This method intercepts all the http requests and adds the token to the headers if it exists.
     * 
     * @param req - HttpRequest<any> object
     * @param next - HttpHandler object
     * @returns - Observable<HttpEvent<any>> object
     */    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = sessionStorage.getItem('token');

        if (!token) {
            return next.handle(req);
        }

        const request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
        });

        return next.handle(request);
    }
}