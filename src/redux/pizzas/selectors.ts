import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectPizza = (state: RootState) => state.pizza;
