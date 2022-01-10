import { fetchBookmarks } from "../database/database";

export const GET_ALL_BOOKMARKS = "GET_ALL_BOOKMARKS";


export const getAllBookmarks = () => {
  return async dispatch => {
    try {
      const current_bookmarks = await fetchBookmarks()
      dispatch({
        type: GET_ALL_BOOKMARKS,
        bookmarks: current_bookmarks.rows._array
      })
    } catch (err) {
      throw err;
    }

  }
}
