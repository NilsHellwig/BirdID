import { GET_HISTORY } from './HistoryActions';


const initialState = {
  history: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY:
      return {
        history: action.history
      }
    default:
      return state;
  }
};
