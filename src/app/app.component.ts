import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  filter,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  private destroy$ = new Subject<void>();

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: any): void {
    // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
    const inputValue: string = element.target.value;
    this.searchTermByCharacters.next(inputValue);
  }

  initCharacterEvents(): void {
    // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      filter((value) => value.length >= 3),

      debounceTime(300),

      switchMap((searchTerm) => this.mockDataService.getCharacters(searchTerm))
    );
  }

  loadCharactersAndPlanet(): void {
    // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(),
      this.mockDataService.getPlanets(),
    ]).pipe(
      map(([characters, planets]) => [...characters, ...planets])
    );
  }

  initLoadingState(): void {
    /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request. When we send a request the value is true, when the request is completed, the value becomes false. You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().*/
    const loading$ = combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader(),
    ]).pipe(
      map(([charLoader, planetLoader]) => 
        this.areAllValuesTrue([charLoader, planetLoader]),
      )
    );
    const sub = loading$.subscribe((loading) => {
      this.isLoading = loading;
    });

    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    // 5.2 Unsubscribe from all subscriptions
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
