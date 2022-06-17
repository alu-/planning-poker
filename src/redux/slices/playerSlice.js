import { createSlice } from '@reduxjs/toolkit'

export const playerSlice = createSlice({
    name: 'player',
    initialState: {
        players: []
    },
    reducers: {
        add: (state, action) => {
            if (!state.players.includes(action.payload)) {
                state.players.push(action.payload);
            }
        },
        remove: (state, action) => {
            state.players = state.players.filter(s => s !== action.payload);
        }
    },
})

export const { add, remove } = playerSlice.actions

export default playerSlice.reducer
