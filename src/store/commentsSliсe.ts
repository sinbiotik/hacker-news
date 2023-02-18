import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { IComment } from "../models";

interface CommentsState {
  comments: {[kid: number]:IComment};
  loading: boolean;
  error: null | string;    
}

const initialState: CommentsState = {
  comments: {},
  loading: false,
  error: null,    
}

export const fetchComments = createAsyncThunk<
  IComment[],
  number[] | undefined,
  {rejectValue: string}
>(
  'comment/fetchComment',
  async function(kids, {rejectWithValue}) {
    try {
      if(kids) {
        const result: AxiosResponse<IComment>[] = await Promise.all(      
          kids.map(responseKid => axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${responseKid}.json?print=pretty`
          ))
        )
        const commentsKidsArray = result.map(res => res.data)
        return commentsKidsArray 
      } else {
        return []
      }
    } catch (e: unknown) {      
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const commentSliсe = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        // state.comments = {}
        state.loading = true
        state.error = null
      })
      .addCase(fetchComments.fulfilled, (state, action) =>{
        state.loading = false
        action.payload.forEach(comment => state.comments[comment.id] = comment)
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})

export default commentSliсe.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}