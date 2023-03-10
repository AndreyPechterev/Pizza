import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
export type FetchPizzasArgs = {
    currentPage: number;
    limit: number;
    activeCategory: number;
    searchValue: string;
    activeSort: string;
    activeOrder: string;
}; 
export const fetchPizzas = createAsyncThunk(
    "pizza/fetchPizzasStatus",
    async (params: FetchPizzasArgs) => {
        const {
            currentPage,
            limit,
            activeCategory,
            searchValue,
            activeSort,
            activeOrder,
        } = params;
        const { data } = await axios.get<Pizza[]>(
            `https://63f9de3e897af748dcc4cb3c.mockapi.io/items?page=${currentPage}&limit=${limit}${
                activeCategory > 0 ? `&category=${activeCategory}` : ""
            }&sortBy=${activeSort}&order=${activeOrder}&title=${searchValue}`
        );
        return data;
    }
);
type Pizza = {
    id: string;
    imageUrl: string;
    title: string;
    types: Array<number>;
    sizes: Array<number>;
    price: number;
};

interface PizzaSliceState {
    items: Pizza[];
    status: "loading" | "success" | "error";
}

const initialState: PizzaSliceState = {
    items: [],
    status: "loading",
};

const pizzaSlice = createSlice({
    name: "pizzas",
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.pending, (state) => {
            state.items = [];
            state.status = "loading";
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = "success";
        });
        builder.addCase(fetchPizzas.rejected, (state) => {
            state.status = "error";
            state.items = [];
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export const selectPizza = (state: RootState) => state.pizza;

export default pizzaSlice.reducer;
