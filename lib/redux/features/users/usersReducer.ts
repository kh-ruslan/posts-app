import { FETCH_USERS_SUCCESS, UserActions } from './userActions';
import { UserData } from '@/src/types';

interface UsersState {
  users: UserData[];
}

const initialState: UsersState = {
  users: [],
};

export default function usersReducer(
  state = initialState,
  action: UserActions,
) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    default:
      return state;
  }
}
