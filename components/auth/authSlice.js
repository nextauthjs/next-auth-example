import { createSlice } from "@reduxjs/toolkit"

const initialState = {
     isAuth: false,
     isLoading: false,
     token: "",
     name: "",
     role: "",
}

export const autSlice = createSlice({
     name: "auth",
     initialState,

     reducers: {
          login: (state) => {
               state.isAuth = true
          },
          logout: (state) => {
               state.isAuth = false
          },
     },
})

export const { login, logout } = autSlice.actions

export const selectAuth = (state) => state.auth.isAuth

export default autSlice.reducer
