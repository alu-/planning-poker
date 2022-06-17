import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload;
        },
        logout: (state) => {
            state.name = null;
        }
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
