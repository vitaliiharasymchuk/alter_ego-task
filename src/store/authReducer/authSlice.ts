import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { rtkQueryAPI } from './../../api/index';

interface IUser {
    id: number | string,
    token: string,
    email: string,
    displayName: string,
    avatarUrl: string | null
}

const emptyUser = {
    id: "",
    token: "",
    email: "",
    displayName: "",
    avatarUrl: null
}

interface IAuthState {
    user: IUser
}

const initialState: IAuthState = {
    user: emptyUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.user = action.payload;
        },
        logout(state, action) {
            state.user = emptyUser;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            rtkQueryAPI.endpoints.changeUserAvatar.matchFulfilled,
            (state, { payload }) => {
                state.user.avatarUrl = payload.avatarUrl;
                toast.success("User avatar changed successfull");
            },
        )
        builder.addMatcher(
            rtkQueryAPI.endpoints.changeUserName.matchFulfilled,
            (state, { payload }) => {
                state.user.displayName = payload.userName;
                toast.success("User name changed successfull");
            })
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;