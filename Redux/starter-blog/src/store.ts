import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { rtkQueryErrorMessage } from 'middleware'

// components
import { blogApi } from 'pages/blog/blog.service'
import blogReducer from 'pages/blog/blog.slice'

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer
  },

  //   khai bao middleware
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(blogApi.middleware, rtkQueryErrorMessage)
  }
})

//optional dung tinh nang refetchOnFocus, refetchOnReconnect
setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
