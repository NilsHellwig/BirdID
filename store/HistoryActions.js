import { fetchHistory } from "../database/database";

export const GET_HISTORY = "GET_HISTORY";


export const getHistory = () => {
  return async dispatch => {
    try {
      const current_history = await fetchHistory()
      dispatch({
        type: GET_HISTORY,
        history: current_history.rows._array
      })
    } catch (err) {
      throw err;
    }

  }
}
