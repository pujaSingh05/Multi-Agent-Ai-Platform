import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import conversationReducer from "./conversationSlice"
import messageReducer from "./messageSlice"

export const store = configureStore({
    reducer: {
        user: userSlice,
        conversation: conversationReducer,
        message: messageReducer,
    },
})