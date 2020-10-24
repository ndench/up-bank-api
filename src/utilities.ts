import { ErrorResponse, UpApiError } from './interfaces';
import { AxiosError } from 'axios';

export function isUpApiError(e: unknown): e is UpApiError {
  if (!(e instanceof Error)) {
    return false;
  }

  const axiosError = e as AxiosError<ErrorResponse>;
  if (!axiosError.isAxiosError) {
    return false;
  }

  const response = axiosError.response;
  if (response === undefined) {
    return false;
  }

  return response.data !== undefined && response.status !== undefined;
}
