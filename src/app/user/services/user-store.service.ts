import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
    
    private name$$ = new BehaviorSubject<string | null>(null);
    private isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$: Observable<string | null> = this.name$$.asObservable();
    public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

    constructor(private userService: UserService) {}

    getUser(): void {
        this.userService.getUser().pipe(
            tap(user => {
                this.name$$.next(user.name);
                this.isAdmin$$.next(user.role === 'admin');
            })
        ).subscribe();
    }

    get isAdmin(): boolean {
        return this.isAdmin$$.getValue();
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}
