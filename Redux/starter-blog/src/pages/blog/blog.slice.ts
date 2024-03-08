import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface BlogState {
  postId: string
}

const initialState: BlogState = {
  postId: ''
}

export const blogSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditPost: (state) => {
      state.postId = ''
    }
  }
})

const blogReducer = blogSlice.reducer

export const { startEditPost, cancelEditPost } = blogSlice.actions

export default blogReducer
