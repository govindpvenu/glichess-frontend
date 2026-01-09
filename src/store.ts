import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import gameReducer from "./slices/gameSlice"
import userReducer from "./slices/userSlice"
import { apiSlice } from "./slices/apiSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        game: gameReducer,
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

export default store as ReturnType<typeof configureStore>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
