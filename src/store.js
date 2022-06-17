import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/slices/userSlice';
import voteReducer from './redux/slices/voteSlice';
import playerReducer from './redux/slices/playerSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        vote: voteReducer,
        player: playerReducer
    },
})
