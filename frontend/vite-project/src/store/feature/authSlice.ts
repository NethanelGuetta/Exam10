import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/userType"
import axios from "axios";

const BASE_URL = 'http://localhost:5000/api/users'

interface UserState {
    user: UserType[] ;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: UserState = {
    user: [],
    status: 'idle',
    error: null,
};  

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async (): Promise<UserType[] | undefined> => {
        const response = await axios.get(BASE_URL);
        console.log(response);
        
        return response.data
    }
);

export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (user: Partial<UserType>) => {
        const response = await axios.post(`${BASE_URL}/register`, user)
        return response.data
    }
);

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user: Partial<UserType>) => {
        const response = await axios.post(`${BASE_URL}/login`, user) 
        if (response.data) {
            const token = response.data.token;
            localStorage.setItem('token', token);
        }
        return response.data
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                if (action.payload) {
                    state.status = 'succeeded'
                    state.user = action.payload
                }
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown error'
            })
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown error'
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message ?? 'Unknown error'
            })

    }
});

export default userSlice.reducer;