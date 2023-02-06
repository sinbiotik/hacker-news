import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IArticle } from "../models";

interface ArticlesState {
  articles: IArticle[];
  loading: boolean;
  error: null | string;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null, 
}

export const fetchArticles = createAsyncThunk<IArticle[], undefined, {rejectValue: string}>(
  'articles/fetchArticles',
  async function(_, {rejectWithValue}) {
    try {
      const newstories = await axios.get(
        `https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
      ) 
      const responses: AxiosResponse<IArticle>[] = await Promise.all(
        newstories.data.slice(0, 100).map((storyId: number) => axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
        ))
      )   
      const responseData = responses.map(response => response.data)
      return responseData

    } catch (e: unknown) {      
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const articlesSlise = createSlice({
  name: 'articles',
  initialState: initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) =>{
        state.loading = false
        state.articles = action.payload
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {        
        state.error = action.payload
        state.loading = false
      })
  },
})
export default articlesSlise.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}