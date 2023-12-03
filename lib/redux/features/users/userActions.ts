import { UserData } from '@/src/types';
import { Action } from '../types';

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

type FetchUsersSuccess = Action<typeof FETCH_USERS_SUCCESS, UserData[]>;

export const fetchUsersSuccess = (users: UserData[]): FetchUsersSuccess => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export type UserActions = FetchUsersSuccess;
