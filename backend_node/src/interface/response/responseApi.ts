export type ApiResponse<T> = {
  status: boolean;
  total?: number;
  data?: T | null;
  message?: string;
  nextPage?: boolean;
};
