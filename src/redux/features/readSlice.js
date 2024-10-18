// src/features/read/readSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch reads
export const fetchReads = createAsyncThunk('reads/fetchReads', async () => {
  const response = await axios.get('http://localhost:8000/api/blogs/');
  return response.data; // Return the data directly from the response
});

// Async thunk to post a new read
export const postRead = createAsyncThunk(
  'reads/postRead',
  async (readData) => {
    const response = await axios.post('http://localhost:8000/api/blogs/', readData);
    return response.data; // Return the newly created read
  }
);

const readSlice = createSlice({
  name: 'reads',
  initialState: {
    reads: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReads.fulfilled, (state, action) => {
        state.loading = false;
        state.reads = action.payload;
        console.log('Fetched reads:', action.payload); // Debugging line
      })
      .addCase(fetchReads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRead.fulfilled, (state, action) => {
        state.loading = false;
        state.reads.push(action.payload); // Add the new read to the state
        console.log('Posted new read:', action.payload); // Debugging line
      })
      .addCase(postRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Selector to get a specific read by slug
export const selectReadBySlug = (state, slug) => {
  console.log(slug, 'slug');
  console.log(state.reads.reads, 'data');
  return state.reads.reads.find(read => read.slug === slug);
}

export default readSlice.reducer;



// this code works well but has no code for posting a read
// // src/features/read/readSlice.js

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchReads = createAsyncThunk('reads/fetchReads', async () => {
//   const response = await axios.get('http://localhost:8000/api/blogs/');
//   return response.data; // Return the data directly from the response
// });

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
//       });
//   },
// });


// // Selector to get a specific read by slug
// export const selectReadBySlug = (state, slug) => {
//     console.log(slug, 'slug')
//     console.log(state.reads.reads,'data')
//     return state.reads.reads.find(read => read.slug === slug);
// }

// export default readSlice.reducer;
