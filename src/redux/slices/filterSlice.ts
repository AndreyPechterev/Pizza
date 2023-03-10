import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type Sort = {
    name: string;
    sortProperty: "rating" | "title" | "price";
    order: "desc" | "asc";
};
export interface FilterSliceState {
    searchValue: string;
    activeCategory: number;
    currentPage: number;
    activeSort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: "",
    activeCategory: 0,
    currentPage: 1,
    activeSort: {
        name: "популярности (DESC)",
        sortProperty: "rating",
        order: "desc",
    },
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<number>) {
            state.activeCategory = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.activeSort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action) {
            state.currentPage = Number(action.payload.currentPage);
            state.activeCategory = Number(action.payload.category);
            state.activeSort = action.payload.activeSort;
        },
    },
});

export const {
    setCategory,
    setSort,
    setCurrentPage,
    setSearchValue,
    setFilters,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
