import { createAction, props } from '@ngrx/store';
import { CoursesConstants } from './courses.constants';
import { Course, CourseFormPayload } from '@app/features/courses/models/course.model';

// ========== Request All Courses ==========
export const requestAllCourses = createAction(
    CoursesConstants.REQUEST_ALL_COURSES
);

export const requestAllCoursesSuccess = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_SUCCESS,
    props<{ courses: Course[] }>()
);

export const requestAllCoursesFail = createAction(
    CoursesConstants.REQUEST_ALL_COURSES_FAIL,
    props<{ error: string }>()
);

// ========== Request Single Course ==========
export const requestSingleCourse = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE,
    props<{ id: string }>()
);

export const requestSingleCourseSuccess = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_SUCCESS,
    props<{ course: Course }>()
);

export const requestSingleCourseFail = createAction(
    CoursesConstants.REQUEST_SINGLE_COURSE_FAIL,
    props<{ error: string }>()
);

// ========== Request Filtered Courses ==========
export const requestFilteredCourses = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES,
    props<{ searchValue: string }>()
);

export const requestFilteredCoursesSuccess = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_SUCCESS,
    props<{ courses: Course[] }>()
);

export const requestFilteredCoursesFail = createAction(
    CoursesConstants.REQUEST_FILTERED_COURSES_FAIL,
    props<{ error: string }>()
);

// ========== Delete Course ==========
export const requestDeleteCourse = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE,
    props<{ id: string }>()
);

export const requestDeleteCourseSuccess = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_SUCCESS
);

export const requestDeleteCourseFail = createAction(
    CoursesConstants.REQUEST_DELETE_COURSE_FAIL,
    props<{ error: string }>()
);

// ========== Edit Course ==========
export const requestEditCourse = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE,
    props<{ id: string; course: CourseFormPayload }>()
);

export const requestEditCourseSuccess = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_SUCCESS,
    props<{ course: Course }>()
);

export const requestEditCourseFail = createAction(
    CoursesConstants.REQUEST_EDIT_COURSE_FAIL,
    props<{ error: string }>()
);

// ========== Create Course ==========
export const requestCreateCourse = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE,
    props<{ course: CourseFormPayload }>()
);

export const requestCreateCourseSuccess = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_SUCCESS,
    props<{ course: Course }>()
);

export const requestCreateCourseFail = createAction(
    CoursesConstants.REQUEST_CREATE_COURSE_FAIL,
    props<{ error: string }>()
);
