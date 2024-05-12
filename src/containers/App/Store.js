import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import PostReducer from '../../components/Post/PostSlice.js'
import { postApi } from '../../Services/PostApi.js'


export const store = configureStore({
    reducer: {
      // Add the generated reducer as a specific top-level slice
      [postApi.reducerPath]: postApi.reducer,
      post: PostReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postApi.middleware),
  })

  setupListeners(store.dispatch)

export default store