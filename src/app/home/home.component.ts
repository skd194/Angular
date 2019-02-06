import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    registerMode: boolean;
    constructor(private readonly http: HttpClient) {
        this.registerMode = false;
    }

    ngOnInit() {
    }

    registerToggle() {
        this.registerMode = !this.registerMode;
    }

    cancelRegisterMode(registerMode: boolean) {
        this.registerMode = registerMode;
    }

}
