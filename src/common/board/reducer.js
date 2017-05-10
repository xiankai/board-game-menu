// @flow
import type { Action, BoardState } from '../types';

const initialState = {
  appetizers: [],
  lightFare: [],
  mainCourse: [],
  description: {},
  error: '',
};

const reducer = (
  state: BoardState = initialState,
  action: Action,
): BoardState => {
  switch (action.type) {
    case 'POPULATE': {
      const boardgames = action.payload;

      const sort = (a, b) => a.playingtime - b.playingtime;

      const appetizers = boardgames.filter(a => a.playingtime < 60).sort(sort);
      const lightFare = boardgames.filter(a => a.playingtime >= 60 && a.playingtime < 180).sort(sort);
      const mainCourse = boardgames.filter(a => a.playingtime >= 180).sort(sort);

      return {
        ...state,
        appetizers,
        lightFare,
        mainCourse,
        error: '',
      };
    }

    case 'ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }

    case 'DESCRIPTION': {
      return {
        ...state,
        description: {
          ...state.description,
          [action.payload.id]: action.payload.description,
        },
      };
    }

    case 'RESET_DESCRIPTION': {
      return {
        ...state,
        description: {
          ...state.description,
          [action.payload]: '',
        },
      };
    }

    default:
      return state;

  }
};

export default reducer;
