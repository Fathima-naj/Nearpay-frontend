import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../api/axiosInstance'

export const fetchCategories = createAsyncThunk("categories/fetch", async () => {
  const res = await axiosInstance.get("/category", { withCredentials: true });
  return res.data;
});

export const createCategory = createAsyncThunk("categories/create", async (payload) => {
  const res = await axiosInstance.post("/category", payload, { withCredentials: true });
  return res.data;
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
  await axiosInstance.delete(`/category/${id}`, { withCredentials: true });
  return id;
});

const slice = createSlice({
  name: "categories",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.fulfilled, (s, a) => { s.items = a.payload; s.loading = false; })
      .addCase(fetchCategories.pending, s => { s.loading = true; })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.push(action.payload);
        })
      .addCase(deleteCategory.fulfilled, (s, a) => { s.items = s.items.filter(i => i._id !== a.payload); });
  }
});

export default slice.reducer;
