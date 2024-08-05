import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class JwtInterceptor implements HttpInterceptor {

 intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiYzQyNDFmOS1mMDg5LTRhZWMtOWYzZS01N2Y0YzgwMzQ1ODMiLCJhdSI6WyJTZWxsZXIiXSwiZSI6InNlbGxlckB0ZXN0LmNvbSIsImV4cCI6MTcyMjc2MTM4NywiaWF0IjoxNzIyNzU0MTg3fQ.9E_hpukcY2lsYA00mILVOp2IvXvZF3Rzk8oW_NU4Usg';
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
