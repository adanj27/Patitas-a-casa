export type ApiResponse<T> = {
  status: boolean;
  message?: string;
  data?: T | null;
};
