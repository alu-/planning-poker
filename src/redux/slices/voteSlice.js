import { createSlice } from '@reduxjs/toolkit'

export const voteSlice = createSlice({
    name: 'vote',
    initialState: {
        votes: {},
        myVote: false,
        users: []
    },
    reducers: {
        userHasVoted: (state, action) => {
            if (!state.users.includes(action.payload)) {
                state.users.push(action.payload);
            }
        },
        registerVotes: (state, action) => {
            state.votes = action.payload;
        },
        resetVotes: (state, action) => {
            state.votes = {};
            state.myVote = false;
            state.users = [];
        },
        setMyVote: (state, action) => {
            state.myVote = action.payload;
        },
    },
})

export const { userHasVoted, registerVotes, resetVotes, setMyVote } = voteSlice.actions

export default voteSlice.reducer
