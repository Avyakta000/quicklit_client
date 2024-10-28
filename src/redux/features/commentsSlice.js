import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchComments = createAsyncThunk('comments/fetchComments', async (readId) => {
    const response = await axiosInstance.get(`/api/comments/?blog_id=${readId}`, { withCredentials: true });
    console.log(response.data, readId, ' fetchComments')
    return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async (comment) => {
    const response = await axiosInstance.post('/api/comments/', comment, { withCredentials: true });
    return response.data;
});

export const editComment = createAsyncThunk('comments/editComment', async ({ id, comment }) => {
    const response = await axiosInstance.put(`/api/comments/${id}/`, comment, { withCredentials: true });
    return response.data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async ({id}) => {
    await axiosInstance.delete(`/api/comments/${id}/`, { withCredentials: true });
    return id; // Return the id of the deleted comment for state update
});

// Comments slice
const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.comments.push(action.payload);
            })
            .addCase(editComment.fulfilled, (state, action) => {
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            });
    },
});

export default commentsSlice.reducer;
