import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import agent from "../../api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  "account/signInUser",
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto; //This destructuring this way: basket = userDto.basket, the rest of the properties go to user
      if (basket) thunkAPI.dispatch(setBasket(basket)); //Updating the store with the basket (if there is a basket)
      localStorage.setItem("user", JSON.stringify(user)); //Saving the user in the local store allows to keep the token if the browser is reloaded
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  "account/fetchCurrentUser",
  async (_, thunkAPI) => {
    //getting the token saved in local store and run setUser to save it in the state
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem("user")!))); //we know this line won't be null because fetchCurrentUser will be executed only if
    //localStorage.getItem("user") is not null (means there is a token saved), thanks to the condition option
    try {
      const userDto = await agent.Account.currentUser();
      const { basket, ...user } = userDto; //This destructuring this way: basket = userDto.basket, the rest of the properties go to user
      if (basket) thunkAPI.dispatch(setBasket(basket)); //Updating the store with the basket (if there is a basket)
      localStorage.setItem("user", JSON.stringify(user)); //Updating the current user with the token returned by the API
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    //fetchCurrentUser is not launched if there is not the user key inside the local storage
    condition: () => {
      if (!localStorage.getItem("user")) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem("user"); //Clear the local storage when signin out (remove the actual token)
      router.navigate("/");
    },
    //saving the token in the state
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.rejected, (state, action) => {
      throw action.payload;
    });
    //If the token expires or is invalid we make the user to login again
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.error("Please login again");
      router.navigate("/");
    });
    //function addMatcher allows to handle same response cases for all the reducers passed in
    //note: addMatcher if present, goes always and the end of the cases
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { signOut, setUser } = accountSlice.actions;
