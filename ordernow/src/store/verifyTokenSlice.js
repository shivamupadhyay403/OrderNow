import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { VERIFY_TOKEN } from "../api/api";

/**
 * Async thunk to verify token
 */
export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token, { rejectWithValue }) => {
    try {
      if (!token) {
        throw new Error("Token is required for verification.");
      }
      const response = await axios.post(VERIFY_TOKEN, { token });
      return response.data;
    } catch (error) {
      // Handle HTTP and custom errors
      if (error.response) {
        return rejectWithValue(error.response.data); // Handle server errors
      }
      return rejectWithValue(error.message); // Handle client-side errors
    }
  }
);

// Initial state for the slice
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

/**
 * Redux slice for token verification
 */
const verifyTokenSlice = createSlice({
  name: "verifyToken",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.data = null;
        state.error = action.payload || "An error occurred while verifying the token.";
      });
  },
});

// Export the reducer and actions
export default verifyTokenSlice.reducer;
