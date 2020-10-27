import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as alertFunctions from '../../shared/data/sweet-alerts';
import { LoaderComponentService } from 'app/dashboard/shared/behavior-subject-service/loader-component-interaction.service';
@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router, private loaderComponentService: LoaderComponentService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token: string = sessionStorage.getItem('token');

    if (token) {
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failure
          if (error instanceof HttpErrorResponse) {
            console.log("api call error :", error);
            switch (error.status) {
              case 401: {
                alertFunctions.custometypeError("Oops.!!", "Your not authorized person..!!")
                break;
              }
              case 0: {
                alertFunctions.custometypeError("Oops.!!", "Your application backend service is down..!!")
                this.loaderComponentService.emitChange(false);
                break;
              }
            }
          }
        }
      )
    );
  }

}

