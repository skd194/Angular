import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                catchError(error => {
                    if (!(error instanceof HttpErrorResponse)) {
                        return;
                    }
                    if (error.status === 401) {
                        return throwError(error.statusText);
                    }
                    const applicationError = error.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    let modelStateError = '';
                    const errors = (serverError || {} as any).errors;
                    if (serverError && errors) {
                        for (const key in errors) {
                            if (errors[key]) {
                                modelStateError += errors[key] + '\n';
                            }
                        }
                    }
                    const commonErrorMsg = 'Some thing went wrong';
                    const errorMsg = modelStateError
                        ? modelStateError :
                        (typeof serverError === 'string') ? serverError : commonErrorMsg;
                    return throwError(errorMsg);
                })
            );
    }
}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};


