import React from 'react';
import AppNavigator from "./navigation/AppNavigator";
import AppLoading from 'expo-app-loading';
import { useFonts, Manrope_200ExtraLight, Manrope_300Light, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import HistoryReducer from "./store/HistoryReducer";
import BookmarkReducer from "./store/BookmarkReducer";

import { initBookmarkDatabase, initHistoryDatabase } from "./database/database";


initBookmarkDatabase().catch(err => {
  console.log("Initializing bookmarks database failed.");
  console.log(err);
});

initHistoryDatabase().catch(err => {
  console.log("Initializing history database failed.");
  console.log(err);
});

// Konfigurieren der Schriftarten
const fonts = {
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
}

// Konfigurieren von Redux
const rootReducer = combineReducers({
  HistoryReducer: HistoryReducer,
  BookmarkReducer: BookmarkReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  let [fontsLoaded] = useFonts(fonts);
  // Zunächst werden die Schriftarten geladen. Solange diese nicht geladen wurden, wird ein Ladescreen angezeigt (Logo von BirdID)
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

