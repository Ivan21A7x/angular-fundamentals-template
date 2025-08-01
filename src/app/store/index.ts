import { ActionReducerMap } from '@ngrx/store';
import { CoursesState, coursesReducer } from './courses/courses.reducer';
import { CoursesEffects } from './courses/courses.effects';

import { AuthState, authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';

export interface State {
    courses: CoursesState;
    auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
    courses: coursesReducer,
    auth: authReducer,
};

export const effects = [CoursesEffects, AuthEffects];
