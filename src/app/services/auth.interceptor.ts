import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ACCESS_TOKEN, UtilsService } from './utils.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  myBearer: string = 'Bearer ';

  constructor(private utilsService: UtilsService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let access_token = this.utilsService.getToken(ACCESS_TOKEN);
    // console.log('access_token---: ', access_token);
    if (access_token) {
      const newReq = req.clone({
        headers: req.headers
          .set('Authorization', this.myBearer + access_token)
          .set('Content-Type', 'application/json')
      });
      req = newReq;
      // console.log('append access-token for authorization');
      // console.log(req);
    }
    return next.handle(req);
  }
}
