import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../api/axiosInstance'

export const createExpense = createAsyncThunk("expense/create", async (payload) => {
  const res = await axiosInstance.post("/expense", payload, { withCredentials: true });
  return res.data;
});

export const fetchReport = createAsyncThunk("reports/fetch", async ({year, month}) => {
  const res = await axiosInstance.get(`/report/monthly?year=${year}&month=${month}`, { withCredentials: true });
  return res.data;
});

const slice = createSlice({
  name: "expenses",
  initialState: { report: [], loading: false },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchReport.pending, s=> s.loading = true)
      .addCase(fetchReport.fulfilled, (s, a) => { s.report = a.payload; s.loading = false; })
      .addCase(createExpense.fulfilled, (s, a) => { });
  }
});

export default slice.reducer;
