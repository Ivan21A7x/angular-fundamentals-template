import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import * as CoursesSelectors from './courses.selectors';
import { Course, CourseFormPayload } from '@app/features/courses/models/course.model';
import { Observable } from 'rxjs';
import { State } from '../index';

@Injectable({ providedIn: 'root' })
export class CoursesStateFacade {
    // --- Exposed Observables ---
    readonly isAllCoursesLoading$: Observable<boolean> = this.store.pipe(
        select(CoursesSelectors.isAllCoursesLoadingSelector)
    );

    readonly isSingleCourseLoading$: Observable<boolean> = this.store.pipe(
        select(CoursesSelectors.isSingleCourseLoadingSelector)
    );

    readonly isSearchingState$: Observable<boolean> = this.store.pipe(
        select(CoursesSelectors.isSearchingStateSelector)
    );

    readonly allCourses$: Observable<Course[]> = this.store.pipe(
        select(CoursesSelectors.getAllCourses)
    );

    readonly courses$: Observable<Course[]> = this.store.pipe(
        select(CoursesSelectors.getCourses)
    );

    readonly course$: Observable<Course | null> = this.store.pipe(
        select(CoursesSelectors.getCourse)
    );

    readonly errorMessage$: Observable<string | null> = this.store.pipe(
        select(CoursesSelectors.getErrorMessage)
    );

    constructor(private store: Store<State>) {}

    // --- Methods for triggering actions ---
    getAllCourses(): void {
        this.store.dispatch(CoursesActions.requestAllCourses());
    }

    getSingleCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
    }

    getFilteredCourses(searchValue: string): void {
        this.store.dispatch(CoursesActions.requestFilteredCourses({ searchValue }));
    }

    deleteCourse(id: string): void {
        this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
    }

    editCourse(course: CourseFormPayload, id: string): void {
        this.store.dispatch(CoursesActions.requestEditCourse({ id, course }));
    }

    createCourse(course: CourseFormPayload): void {
        this.store.dispatch(CoursesActions.requestCreateCourse({ course }));
    }
}
