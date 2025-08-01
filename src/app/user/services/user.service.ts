import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserResponse {
    id: string;
    name: string;
    email: string;
    role: string; // 'admin' or 'user'
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly apiUrl = 'http://localhost:4000/users/me';

    constructor(private http: HttpClient) {}

    getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(this.apiUrl);
    }
}
