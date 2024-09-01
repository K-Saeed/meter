import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class JwtInterceptor implements HttpInterceptor {
  private excludedUrls: string[] = [
    '/api/user/validateToken',
    '/api/user/login/mail'
  ];
 intercept(req: HttpRequest<any>, next: HttpHandler) {
  const isExcluded = this.excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next.handle(req);
  }
  const token = localStorage.getItem('JWT_Token');
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `${token}`

        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }


}
