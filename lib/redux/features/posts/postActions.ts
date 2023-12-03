import { PostData } from '@/src/types';
import { Action } from '../types';

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

type FetchPostsSuccess = Action<typeof FETCH_POSTS_SUCCESS, PostData[]>;

export const fetchPostsSuccess = (posts: PostData[]): FetchPostsSuccess => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export type PostActions = FetchPostsSuccess;
