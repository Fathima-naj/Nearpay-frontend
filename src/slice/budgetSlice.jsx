import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../api/axiosInstance'

export const fetchBudgets = createAsyncThunk("budget/fetch", async ({year, month}) => {
  const res = await axiosInstance.get(`/budget?year=${year}&month=${month}`, { withCredentials: true });
  return res.data;
});

export const upsertBudget = createAsyncThunk("budgets/upsert", async (payload) => {
  const res = await axiosInstance.post("/budget", payload, { withCredentials: true });
  return res.data;
});

const slice = createSlice({
  name: "budgets",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBudgets.fulfilled, (s, a) => { s.items = a.payload; s.loading = false; })
      .addCase(fetchBudgets.pending, s => s.loading = true)
      .addCase(upsertBudget.fulfilled, (s, a) => {
        const idx = s.items.findIndex(i => i.categoryId === String(a.categoryId));
        if (idx >= 0) s.items[idx] = {...s.items[idx], limitCents: a.limitCents, budgetId: a._id};
        else s.items.push(a);
      });
  }
});
export default slice.reducer;
