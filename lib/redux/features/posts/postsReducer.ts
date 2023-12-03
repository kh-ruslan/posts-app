import { FETCH_POSTS_SUCCESS, PostActions } from './postActions';
import { PostData } from '@/src/types';

interface PostsState {
  posts: PostData[];
}

const initialState: PostsState = {
  posts: [],
};

export default function postsReducer(
  state = initialState,
  action: PostActions,
) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
      };
    }
    default:
      return state;
  }
}
