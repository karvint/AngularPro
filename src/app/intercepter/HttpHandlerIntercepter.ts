import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable, Injector} from "@angular/core";
import {Observable, of} from 'rxjs/index';
import { mergeMap, catchError } from 'rxjs/operators';
import {NzMessageService} from "ng-zorro-antd";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie";

@Injectable()
export class HttpHandlerIntercepter implements HttpInterceptor {

  constructor(private injector: Injector,private _cookieService:CookieService) {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    let req = request.clone();// 这里可以在请求中加参数
    if(request.url.indexOf("/securey")!==-1){
      req = request.clone({headers:request.headers.set("authorization","bearer;"+this._cookieService.get("securey"))});
    }
    return next.handle(req).pipe(mergeMap((event: any) => {
        // 正常返回，处理具体返回参数
        if (event instanceof HttpResponse && event.status === 200) {
          return this.handleData(event);// 具体处理请求返回数据
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)));
  }

  private handleData(event: HttpResponse<any> | HttpErrorResponse,): Observable<any> {
    // 业务处理：一些通用操作
    switch (event.status) {
      // case 200:
      //   if (event instanceof HttpResponse) {
      //     const body: any = event.body;
      //     if (body && body.rc === 3) {
      //       this.goTo('/test');
      //     }
      //   }
      //   break;
      // case 401: // 未登录状态码
      //   this.goTo('/login');
      //   break;
      // case 404:
      // case 500:
      //
      //     break;
      default:
        return of(event);
    }
  }
  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  get msg(): NzMessageService {
    return this.injector.get(NzMessageService);
  }
}
