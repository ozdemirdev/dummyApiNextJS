import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC__DUMMY_API_KEY
const headers = { 'Content-type': 'application/json', 'app-id': apiKey }

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response: any = await axios.get("https://dummyapi.io/data/v1/post", { headers: headers })
    return response.data.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: any) => {
    const response = await axios.delete(`https://dummyapi.io/data/v1/post/${postId}`, { headers: headers });
    return postId;
});

export const createPost = createAsyncThunk('posts/createPost', async (formData: any) => {
    const response: any = await axios.post("https://dummyapi.io/data/v1/post/create", formData, { headers: headers })
    return response.data;
});

export const filterPosts = createAsyncThunk('posts/filterPosts', async ({type, key}: {type: any, key: any}) => {
    let queryPath = "";
    switch (type) {
        case 1:
            queryPath = "https://dummyapi.io/data/v1/user/" + key + "/post";
            break;
        case 2:
            queryPath = "https://dummyapi.io/data/v1/tag/" + key + "/post";
            break;
        case 3:
            queryPath = "https://dummyapi.io/data/v1/post/" + key;
            break;
        default:
            return
    }
    const response = await axios.get(queryPath, { headers: headers })
    if (type != 3) {
        return response.data.data
    }
    else {
        return [response.data]
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const deletedPostId = action.payload;
                state.loading = false;
                state.data = state.data.filter((post: any) => post.id !== deletedPostId);
            })
            .addCase(filterPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, action.payload] as any
            })
    },
});

export default postsSlice.reducer;