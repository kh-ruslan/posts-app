import { CommentData } from '@/src/types';
import { Action } from '../types';

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';

type FetchCommentsSuccess = Action<
  typeof FETCH_COMMENTS_SUCCESS,
  CommentData[]
>;

type UpdateCommentSuccess = Action<typeof UPDATE_COMMENT_SUCCESS, CommentData>;

export const fetchCommentsSuccess = (
  comments: CommentData[],
): FetchCommentsSuccess => ({
  type: FETCH_COMMENTS_SUCCESS,
  payload: comments,
});

export const updateCommentSuccess = (
  comment: CommentData,
): UpdateCommentSuccess => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: comment,
});

export type CommentActions = FetchCommentsSuccess | UpdateCommentSuccess;
