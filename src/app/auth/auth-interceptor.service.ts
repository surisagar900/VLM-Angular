import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.loggedInUser.pipe(
      take(1),
      exhaustMap((userData) => {
        if (!userData) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          headers: new HttpHeaders().set(
            "Authorization",
            `Bearer ${userData.token}`
          ),
        });

        return next.handle(modifiedReq);
      })
    );
  }
}
