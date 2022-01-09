import { createSlice } from "@reduxjs/toolkit"

const initialState = {
     isAuth: false,
     isLoading: false,
     error: "",
     token: "",
     name: "",
     role: "",
}

export const autSlice = createSlice({
     name: "auth",
     initialState,

     reducers: {
          loginPendding: (state) => {
               state.isLoading = true
          },
          loginSuccess: (state, { payload }) => {
               state.isLoading = false
               ;(state.isAuth = true), (state.name = payload.name)
               state.token = payload.token
               state.role = payload.role
          },
          loginFail: (state, { payload }) => {
               ;(state.isAuth = true), (state.error = payload.error)
          },
          logout: (state) => {
               state.isAuth = false
          },
     },
})

export const { logout, loginSuccess, loginFail, loginPendding } =
     autSlice.actions

export const selectAuth = (state) => state.auth.isAuth

export default autSlice.reducer
