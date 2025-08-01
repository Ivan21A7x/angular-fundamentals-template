import { createReducer, on } from '@ngrx/store';
import { Course } from '@app/features/courses/models/course.model';
import * as CoursesActions from './courses.actions';

export const coursesFeatureKey = 'courses';

// --- State ---
export interface CoursesState {
    allCourses: Course[];
    course: Course | null;
    isAllCoursesLoading: boolean;
    isSingleCourseLoading: boolean;
    isSearchState: boolean;
    errorMessage: string | null;
}

// --- Initial State ---
export const initialState: CoursesState = {
    allCourses: [],
  course: null,
    isAllCoursesLoading: false,
    isSingleCourseLoading: false,
    isSearchState: false,
    errorMessage: null,
};

// --- Reducer ---
export const coursesReducer = createReducer(
    initialState,

  // --- All Courses ---
    on(CoursesActions.requestAllCourses, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
        isSearchState: false,
    })),

    on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
        ...state,
        isAllCoursesLoading: false,
        allCourses: courses,
        errorMessage: null,
    })),

    on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // --- Single Course ---
    on(CoursesActions.requestSingleCourse, (state) => ({
        ...state,
        isSingleCourseLoading: true,
        course: null,
        errorMessage: null,
    })),

    on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
        ...state,
        isSingleCourseLoading: false,
        course,
        errorMessage: null,
    })),

      on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
        ...state,
        isSingleCourseLoading: false,
        course: null,
        errorMessage: error,
    })),

    // --- Filtered Courses ---
    on(CoursesActions.requestFilteredCourses, (state) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: false,
        allCourses: courses,
        errorMessage: null,
    })),

    on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
        ...state,
        isSearchState: true,
        isAllCoursesLoading: false,
        errorMessage: error,
      })),

    // --- Delete Course ---
    on(CoursesActions.requestDeleteCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: null,
    })),

    on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // --- Edit Course ---
    on(CoursesActions.requestEditCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
        ...state,
        isAllCoursesLoading: false,
        course,
        errorMessage: null,
    })),

    on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    })),

    // --- Create Course ---
    on(CoursesActions.requestCreateCourse, (state) => ({
        ...state,
        isAllCoursesLoading: true,
        errorMessage: null,
    })),

    on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
        ...state,
        isAllCoursesLoading: false,
        course,
        errorMessage: null,
    })),

    on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
        ...state,
        isAllCoursesLoading: false,
        errorMessage: error,
    }))
);
