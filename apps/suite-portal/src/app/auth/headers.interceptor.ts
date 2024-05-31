import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (this.shouldAddToken(request)) {  // breaking here
            const modifiedRequest = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + localStorage.getItem(this.authService.authSecretKey),
                },
            });
            return next.handle(modifiedRequest);
        }
        return next.handle(request);
    }

    private shouldAddToken(request: HttpRequest<unknown>): boolean{
        let positionIndicator: string = 'api/maintenance-requests';
        let position = request.url.indexOf(positionIndicator);
        if (position > 0 && (request.method === 'GET' || request.method === 'PUT') && this.authService.isTokenValid()) {
            return true;
        }

        return false;
    }
}
