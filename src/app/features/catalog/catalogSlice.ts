import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, productParams } from "../../models/product";
import agent from "../../api/agent";
import { RootState } from "../../context/configureStore";
import { MetaData } from "../../models/pagination";

interface CatalogState {
  productsLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  brands: [];
  types: [];
  productParams: productParams;
  metaData: MetaData | null;
}

const initParams = () => {
  return {
    orderBy: "name",
    pageNumber: 1,
    pageSize: 6,
    brands: [],
    types: [],
  };
};

const productsAdapter = createEntityAdapter<Product>();

const initialState = productsAdapter.getInitialState<CatalogState>({
  productsLoaded: false,
  filtersLoaded: false,
  status: "idle",
  brands: [],
  types: [],
  productParams: initParams(),
  metaData: null,
});

const getAxiosParams = (productParams: productParams) => {
  const params = new URLSearchParams(); //Creates a key/value object with the parameters to add to the URL
  params.append("pageNumber", productParams.pageNumber.toString()); //Names must math the properties that come from the server
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy);
  if (productParams.searchTerm)
    //searchTerm is optional
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.brands.length > 0)
    //If no brands selected  -> brands array is empty -> brands is not added to the url

    params.append("brands", productParams.brands.toString());
  if (productParams.types.length > 0)
    //If no types selected  -> types array is empty -> types is not added to the url

    params.append("types", productParams.types.toString());
  return params;
};

//In createAsyncThunk can be defined 3 types
export const fetchProductsAsync = createAsyncThunk<
  Product[], //Return type for the payload creator functon
  void, //Input type for the payload creator functon
  { state: RootState } // Optional fields for defining thunkApi field types
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  try {
    const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
    const response = await agent.Catalog.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchFilters = createAsyncThunk(
  "catalog/fetchFilters",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fethFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setProductParams: (state, action) => {
      state.productsLoaded = false; //Triggers the useEffect in Catalog.tsx
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1, //pageNumber must be set it to 1 every time a request is made from a page different of the first page
      };
    },
    setPageNumber: (state, action) => {
      state.productsLoaded = false; //Triggers the useEffect in Catalog.tsx
      state.productParams = {
        ...state.productParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams(); //Resets the product params
    },
  },
  extraReducers: (builder) => {
    //---FETCHING PRODUCTS CASES---//
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productsLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    //---FETCHING PRODUCT CASES---//
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    //---FETCHING FILTERS CASES---//
    builder.addCase(fetchFilters.pending, (state, action) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFilters.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filtersLoaded = true;
      state.status = "idle";
    });
    builder.addCase(fetchFilters.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const productSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;
