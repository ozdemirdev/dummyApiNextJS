import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.REACT_APP_DUMMY_API_KEY
const headers = { 'Content-type': 'application/json', 'app-id': apiKey }

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response: any = await axios.get("https://dummyapi.io/data/v1/user", { headers: headers })
    return response.data.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: any) => {
    const response = await axios.delete(`https://dummyapi.io/data/v1/user/${userId}`, { headers: headers });
    return userId;
});

const postsSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message as any
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            const deletedUserId = action.payload;
            state.loading = false;
            state.data = state.data.filter((post: any) => post.id !== deletedUserId);
        })
    },
});

export default postsSlice.reducer;