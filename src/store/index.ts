import articlesReducer from './articlesSliсe';
import publicationReducer from './publicationSliсe'
import commentsReducer from './commentsSliсe'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    publication: publicationReducer,
    comments: commentsReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
