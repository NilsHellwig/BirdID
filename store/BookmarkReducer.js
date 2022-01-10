import { GET_ALL_BOOKMARKS } from './BookmarkActions';


const initialState = {
  bookmarks: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BOOKMARKS:
      return {
        bookmarks: action.bookmarks
      }
    default:
      return state;
  }
};
