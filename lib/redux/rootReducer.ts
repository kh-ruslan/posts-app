import { combineReducers } from 'redux';

import commentsReducer from './features/comments/commentsReducer';
import postsReducer from './features/posts/postsReducer';
import usersReducer from './features/users/usersReducer';

const rootReducer = combineReducers({
  comments: commentsReducer,
  posts: postsReducer,
  users: usersReducer,
});

export default rootReducer;
