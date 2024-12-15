export interface ListRequestParams {
  page?: number;
  size?: number;
  query?: string;
}

export interface ListResponseData<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  prev: number | null;
  next: number | null;
}
