export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "completed",
  ERROR = "error",
}
export interface PizzasSliceState {
  items: Pizza[];
  status: Status;
}
export type SearchPizzaParams = {
  category: string;
  search: string;
  currentPage: string;
  order: string;
  sortBy: string;
};
