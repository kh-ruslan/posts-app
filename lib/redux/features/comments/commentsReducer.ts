import { FETCH_COMMENTS_SUCCESS, CommentActions } from './commentActions';
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
    default:
      return state;
  }
}
