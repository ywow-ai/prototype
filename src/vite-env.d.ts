/// <reference types="vite/client" />

interface ApiResponseT<T = unknown> {
  status: string;
  message: string;
  detailError: string | null;
  data: T;
}
