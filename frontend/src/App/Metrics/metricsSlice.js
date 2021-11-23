import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { requestCurrentUser, getCurrentVersion } from "./appRequests";
// import { fetchHiringActions } from "./HiringActions/hiringActionSlice";
// import { dispatch } from "../store";
import { fetchAssessmentHurdleMetrics } from "./metricsRequests";
// const fakeTimer = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000);
//   });
// };
export const fetchMetrics = createAsyncThunk(
  "metrics/fetchMetrics",
  async (assessmentHurdleId) => {
    const userMetrics = await fetchAssessmentHurdleMetrics(assessmentHurdleId);
    return { userMetrics };
  }
);

export const metricsSlice = createSlice({
  name: "metrics",
  initialState: {
    error: "",
    status: "idle",
    metrics: {},
  },
  extraReducers: {
    [fetchMetrics.pending]: (state, action) => {
      state.status = "pending";
      state.error = "";
    },
    [fetchMetrics.fulfilled]: (state, { payload }) => {
      const { userMetrics } = payload;
      state.status = "fulfilled";
      state.error = "";
      state.metrics = userMetrics;
    },
    [fetchMetrics.rejected]: (state, action) => {
      state.status = "rejectd";
      state.error = action.error.message;
    },
  },
});

export const selectMetrics = (state) => state.metrics.metrics;
export const selectMetricsStatus = (state) => state.metrics.status;
export default metricsSlice.reducer;
