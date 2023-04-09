import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        roomId: null,
        isAdmin: false
    },
    reducers: {
        login: (state, action) => {
            state.name = action.payload.username;
            state.roomId = action.payload.roomId;
            state.isAdmin = action.payload.isAdmin;
        },
        logout: (state) => {
            state.name = null;
        }
    },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
