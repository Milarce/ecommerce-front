import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../models/product";
import agent from "../../api/agent";

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState({
  productsLoaded: false,
  status: "idle",
});

export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "catalog/fetchProductsAsync",
  async () => {
    try {
      return await agent.Catalog.list();
    } catch (error) {
      console.error(error);
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});
