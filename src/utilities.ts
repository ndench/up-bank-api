import { ErrorResponse, UpApiError } from "./interfaces";
import { AxiosError } from "axios";

export function isUpApiError(e: any): e is UpApiError {
  if (!(e instanceof Error)) {
    return false;
  }

  const axiosError = e as AxiosError<ErrorResponse>;
  if (!axiosError.isAxiosError) {
    return false;
  }

  return axiosError.code !== undefined && axiosError.response !== undefined;
}

