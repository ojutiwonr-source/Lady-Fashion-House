import { RunwayShow, RunwayAction } from '../../types/runway';

export interface RunwayState {
  shows: RunwayShow[];
  currentShow: RunwayShow | null;
  score: number;
}

const initialState: RunwayState = {
  shows: [],
  currentShow: null,
  score: 0,
};

export default function runwayReducer(
  state = initialState,
  action: RunwayAction
): RunwayState {
  switch (action.type) {
    case 'START_SHOW':
      return {
        ...state,
        currentShow: action.payload,
      };
    case 'END_SHOW':
      return {
        ...state,
        shows: [...state.shows, action.payload],
        currentShow: null,
      };
    case 'UPDATE_SCORE':
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
}
