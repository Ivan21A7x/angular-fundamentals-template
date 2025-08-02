import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoursesActions from './courses.actions';
import { CoursesService } from '@app/services/courses.service';
import { catchError, map, mergeMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../index';
import { getAllCourses } from './courses.selectors';

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router,
    private store: Store<State>
  ) {}

  // Get all courses
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      switchMap(() =>
        this.coursesService.getAll().pipe(
          map((courses) => CoursesActions.requestAllCoursesSuccess({ courses })),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error: error.message || 'Failed to load courses' }))
          )
        )
      )
    )
  );

  // Filter courses
  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      withLatestFrom(this.store.select(getAllCourses)),
      map(([action, allCourses]) => {
        const filtered = allCourses.filter((course) =>
          course.title.toLowerCase().includes(action.title.toLowerCase().trim())
        );
        return CoursesActions.requestFilteredCoursesSuccess({ courses: filtered });
      }),
      catchError((error) =>
        of(CoursesActions.requestFilteredCoursesFail({ error: error.message || 'Failed to filter courses' }))
      )
    )
  );

  // Get specific course by ID
  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      switchMap(({ id }) =>
        this.coursesService.getCourse(id).pipe(
          map((course) => CoursesActions.requestSingleCourseSuccess({ course })),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error: error.message || 'Course not found' }))
          )
        )
      )
    )
  );

  // Delete course
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap(({ id }) =>
        this.coursesService.deleteCourse(id).pipe(
          map(() => CoursesActions.requestDeleteCourseSuccess()),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error: error.message || 'Failed to delete course' }))
          )
        )
      )
    )
  );

  // Reload courses after deletion
  reloadCoursesAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourseSuccess),
      map(() => CoursesActions.requestAllCourses())
    )
  );

  // Edit course
  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap(({ id, course }) =>
        this.coursesService.editCourse(id, course).pipe(
          map(() => CoursesActions.requestEditCourseSuccess({ course: { ...course, id } })),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error: error.message || 'Failed to edit course' }))
          )
        )
      )
    )
  );

  // Create course
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap(({ course }) =>
        this.coursesService.createCourse(course).pipe(
          map((newCourse) => CoursesActions.requestCreateCourseSuccess({ course: newCourse })),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error: error.message || 'Failed to create course' }))
          )
        )
      )
    )
  );

  // Redirect to courses page after create/edit only
  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess
          // requestSingleCourseFail REMOVIDO aquí
        ),
        tap(() => this.router.navigate(['/courses']))
      ),
    { dispatch: false }
  );
}
