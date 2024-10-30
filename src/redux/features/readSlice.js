// src/features/read/readSlice.js

import axiosInstance from '@/utils/axiosInstance';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true
// Async thunk to fetch reads
export const fetchReads = createAsyncThunk('reads/fetchReads', async () => {
  const response = await axiosInstance.get('/api/blogs/');
  return response.data; // Return the data directly from the response
});

// Async thunk to post a new read
export const postRead = createAsyncThunk(
  'reads/postRead',
  async (readData) => {
    const response = await axiosInstance.post('/api/blogs/', readData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Return the newly created read
  }
);

const readSlice = createSlice({
  name: 'reads',
  initialState: {
    reads: [],
    error: null,
    status: 'idle', // Set initial status
  },
  reducers: {
    resetReadStatus(state) {
      state.status = 'idle'; // reset to idle after successful post
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReads.pending, (state) => {
        state.error = null;
        state.status = 'loading'; // Set status to loading
      })
      .addCase(fetchReads.fulfilled, (state, action) => {
        state.reads = action.payload;
        state.status = 'success'; // Set status to success
        console.log('Fetched reads:', action.payload); // Debugging line
      })
      .addCase(fetchReads.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed'; // Set status to failed
      })
      .addCase(postRead.pending, (state) => {
        state.error = null;
        state.status = 'loading'; // Set status to loading
      })
      .addCase(postRead.fulfilled, (state, action) => {
        // state.reads.push(action.payload); // Add the new read to the state
        state.status = 'success'; // Set status to success
        console.log('Posted new read:', action.payload); // Debugging line
      })
      .addCase(postRead.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'failed'; // Set status to failed
      });
  },
});

// Selector to get a specific read by slug
export const selectReadBySlug = (state, slug) => {
  return state.reads.reads.find(read => read.slug === slug);
}
export const { resetReadStatus } = readSlice.actions;

export default readSlice.reducer;


// import axiosInstance from '@/utils/axiosInstance';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch reads
// export const fetchReads = createAsyncThunk('reads/fetchReads', async () => {
//   const response = await axios.get('http://localhost:8000/api/blogs/');
//   return response.data; // Return the data directly from the response
// });

// // Async thunk to post a new read
// export const postRead = createAsyncThunk(
//   'reads/postRead',
//   async (readData) => {
//     const response = await axiosInstance.post('/api/blogs/', readData);
//     return response.data; // Return the newly created read
//   }
// );

// const readSlice = createSlice({
//   name: 'reads',
//   initialState: {
//     reads: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchReads.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchReads.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reads = action.payload;
//         console.log('Fetched reads:', action.payload); // Debugging line
//       })
//       .addCase(fetchReads.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(postRead.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(postRead.fulfilled, (state, action) => {
//         state.loading = false;
//         state.reads.push(action.payload); // Add the new read to the state
//         console.log('Posted new read:', action.payload); // Debugging line
//       })
//       .addCase(postRead.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // Selector to get a specific read by slug
// export const selectReadBySlug = (state, slug) => {
//   return state.reads.reads.find(read => read.slug === slug);
// }

// export default readSlice.reducer;

