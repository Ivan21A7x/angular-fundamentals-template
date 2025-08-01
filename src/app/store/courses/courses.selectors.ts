import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState, coursesFeatureKey } from './courses.reducer';

// --- Feature Selector ---
export const selectCoursesFeature = createFeatureSelector<CoursesState>(coursesFeatureKey);

// --- Selectors ---
export const isAllCoursesLoadingSelector = createSelector(
    selectCoursesFeature,
    (state) => state.isAllCoursesLoading
);

export const isSingleCourseLoadingSelector = createSelector(
    selectCoursesFeature,
    (state) => state.isSingleCourseLoading
);

export const isSearchingStateSelector = createSelector(
    selectCoursesFeature,
    (state) => state.isSearchState
);

export const getCourses = createSelector(
    selectCoursesFeature,
    (state) => state.allCourses
);

export const getAllCourses = createSelector(
    selectCoursesFeature,
    (state) => state.allCourses
);

export const getCourse = createSelector(
    selectCoursesFeature,
    (state) => state.course
);

export const getErrorMessage = createSelector(
    selectCoursesFeature,
    (state) => state.errorMessage
);
