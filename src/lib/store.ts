import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice/userSlice'
import emailSlice from './features/emailSlice/emailSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        user: userSlice,
        email: emailSlice
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']