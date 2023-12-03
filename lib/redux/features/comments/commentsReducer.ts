import {
  FETCH_COMMENTS_SUCCESS,
  UPDATE_COMMENT_SUCCESS,
  CommentActions,
} from './commentActions';
import { CommentData } from '@/src/types';

interface CommentsState {
  comments: CommentData[];
}

const initialState: CommentsState = {
  comments: [],
};

export default function commentReducer(
  state = initialState,
  action: CommentActions,
) {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.payload,
      };
    }
    case UPDATE_COMMENT_SUCCESS: {
      const updatedComments = [...state.comments];

      const commentIndex = state.comments.findIndex(
        (comment) => comment.id === action.payload.id,
      );

      if (commentIndex !== -1) {
        updatedComments[commentIndex] = action.payload;

        return {
          ...state,
          comments: updatedComments,
        };
      }
    }
    default:
      return state;
  }
}
