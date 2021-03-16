import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private AuthService: AuthService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.AuthService.userData;
        if (user) {
            request = request.clone({
                setHeaders:
                {
                    Authorization: `Bearer ${user.token}`
                }
            })
        }
        return next.handle(request);
    }
}