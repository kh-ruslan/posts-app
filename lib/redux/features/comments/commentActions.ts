import { CommentData } from '@/src/types';
import { Action } from '../types';

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

type FetchCommentsSuccess = Action<
  typeof FETCH_COMMENTS_SUCCESS,
  CommentData[]
>;

export const fetchCommentsSuccess = (
  comments: CommentData[],
): FetchCommentsSuccess => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export type CommentActions = FetchCommentsSuccess;
