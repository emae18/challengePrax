import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Answer } from '../models/Answer';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

const httpOption = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })


export class AuthService {
    url: string = environment.url_api+'api/auth/login';

    private userSubject: BehaviorSubject<User>;
    public get userData(): User {
        return this.userSubject.value;
    }

    constructor(private _htpp: HttpClient) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('User')));
    }


    login(email: string, password: string): Observable<Answer> {
        return this._htpp.post<Answer>(this.url,
             { email, password }).pipe(
            map(response => {
                if (response.success === 1) {
                    const user: User = response.data;
                    localStorage.setItem('User', JSON.stringify(user));
                    this.userSubject.next(user);
                }
                return response;
            })
        );

    }
    logout() {
        localStorage.removeItem('User');
        this.userSubject.next(null);
    }
}