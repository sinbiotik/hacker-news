import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IArticle } from '../models';

interface PublicationState {
  publication: IArticle | null;
  loading: boolean;
  error: null | string;    
}

const initialState: PublicationState = {
  publication: null,
  loading: false,
  error: null,   
}

export const fetchPublication = createAsyncThunk<
  IArticle,
  string | undefined,
  {rejectValue: string}
>(
  'publication/fetchPublication',
  async function(id, {rejectWithValue}) {
    try {
      const responseStory = await axios.get(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      )
      const response: IArticle = responseStory.data
      return response

    } catch (e: unknown) {      
      const error = e as AxiosError
      return rejectWithValue(error.message)
    }
  }
)

const publicationSliсe = createSlice({
  name: 'publication',
  initialState: initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchPublication.pending, (state) => {
        state.publication = null
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublication.fulfilled, (state, action) =>{
        state.loading = false
        state.publication = action.payload
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.loading = false
      })
  },
})
export default publicationSliсe.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}