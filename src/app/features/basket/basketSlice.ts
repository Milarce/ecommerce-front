import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../models/basket";
import agent from "../../api/agent";
import { getCookie } from "../../util/util";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
  "basket/fetchBasketAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Basket.get();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      //the request is launched only if the buyerId cookie is present
      if (!getCookie("buyerId")) return false;
    },
  }
);

export const addBasketItemAsync = createAsyncThunk<
  //Returns Basket
  Basket,
  { productId: number; quantity?: number } //action.meta.arg comes from here (optional properties are not included)
>("basket/addBasketItemsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    return await agent.Basket.addItem(productId, quantity); //action.payload comes from the return response
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const removeBasketItemAsync = createAsyncThunk<
  //Returns nothing (void)
  void,
  { productId: number; quantity: number; name?: string } //action.meta.arg comes from here (optional properties are not included)
>("basket/removeBasketItemsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.removeItem(productId, quantity); //Not return response = not action.payload
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    clearBasket: (state) => {
      state.basket = null;
    },
    /*removeItem: (state, action) => {
      const { productId, quantity } = action.payload; //The reducers receive just one action argument, for that we distructuring payload into productId, quantity
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity;
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
    }, */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBasketAsync.pending, (state) => {
      state.status = "pendingFetchBasket";
    });
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pendingAddItem" + action.meta.arg.productId; //action.payload is undifined because it has a payload just whenever is a fulfilled addCase
    });
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status = "pendingRemoveItem" + action.meta.arg.productId; //action.payload is undifined because it has a payload just whenever is a fulfilled addCase
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      console.log(action);
      const itemIndex = state.basket?.items.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.items[itemIndex].quantity -= quantity; //quantity could never be undifined, we set it to 1 above
      if (state.basket?.items[itemIndex].quantity === 0)
        state.basket.items.splice(itemIndex, 1);
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "idle";
    });
    builder.addMatcher(
      isAnyOf(fetchBasketAsync.fulfilled, addBasketItemAsync.fulfilled),
      (state, action) => {
        state.basket = action.payload;
        state.status = "idle";
      }
    );
    builder.addMatcher(
      isAnyOf(fetchBasketAsync.rejected, addBasketItemAsync.rejected),
      (state) => {
        state.status = "idle";
      }
    );
  },
});

export const { setBasket, clearBasket } = basketSlice.actions;
