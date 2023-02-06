import articlesReduser from './articlesSlise';
import publicationReduser from './publicationSlise'
import commentsReduser from './commentsSlise'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    articles: articlesReduser,
    publication: publicationReduser,
    comments: commentsReduser
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
