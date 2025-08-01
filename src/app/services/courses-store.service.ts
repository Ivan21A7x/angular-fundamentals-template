import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, switchMap, tap, map } from 'rxjs/operators';
import { CoursesService } from './courses.service';
import { Course, CourseFormPayload } from '@app/features/courses/models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<Course[]>([]);
  public courses$: Observable<Course[]> = this.courses$$.asObservable();

  private allCourses: Course[] = []; 

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll()
      .pipe(
        tap((courses) => {
          this.allCourses = courses;
          this.courses$$.next(courses);
        }),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  getCourse(id: string): Observable<Course> {
    return this.coursesService.getCourse(id);
  }

  getCourseWithAuthorNames(id: string): Observable<Course & { authorNames: string[] }> {
    return this.getCourse(id).pipe(
      switchMap(course =>
        this.getAllAuthors().pipe(
          map(authors => {
            const authorNames = course.authors.map((authorId: string) =>
              authors.find(a => a.id === authorId)?.name || 'Unknown'
            );
            return { ...course, authorNames };
          })
        )
      )
    );
  }

  createCourse(course: CourseFormPayload): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.createCourse(course).pipe(
      tap(() => this.getAll()),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  editCourse(id: string, course: CourseFormPayload): Observable<Course> {
    this.isLoading$$.next(true);
    return this.coursesService.editCourse(id, course).pipe(
      tap(() => this.getAll()),
      finalize(() => this.isLoading$$.next(false))
    );
  }

  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id)
      .pipe(
        tap(() => {
          const updated = this.courses$$.value.filter(course => course.id !== id);
          this.allCourses = this.allCourses.filter(course => course.id !== id);
          this.courses$$.next(updated);
        }),
        finalize(() => this.isLoading$$.next(false))
      )
      .subscribe();
  }

  filterCourses(term: string): void {
    const normalizedTerm = term.trim().toLowerCase();

    if (!normalizedTerm) {
      this.courses$$.next(this.allCourses);
      return;
    }

    const filtered = this.allCourses.filter(course =>
      course.title.toLowerCase().includes(normalizedTerm)
    );

    this.courses$$.next(filtered);
  }

  getAllAuthors(): Observable<any[]> {
    return this.coursesService.getAllAuthors();
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }

  createAuthor(name: string): Observable<any> {
    return this.coursesService.createAuthor({ name });
  }
}
