import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private baseUrl = 'http://localhost:5000/api/';
    constructor(private readonly http: HttpClient) {

    }

    login(userLoginDto: any) {
        return this.http.post(`${this.baseUrl}auth/login`, userLoginDto)
            .pipe(
                map((response: any) => {
                    const user = response;
                    if (user) {
                        localStorage.setItem('token', user.token);
                    }
                })
            );
    }

    register(userRegisterDto: any) {
        return this.http.post(`${this.baseUrl}auth/register`, userRegisterDto);
    }

}
