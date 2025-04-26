import { ErrorWithResponse } from "../types/responses.types";

export const getErrorMessage = (error: unknown, defaultMessage: string): string => {
  if (
    error &&
    typeof error === 'object' &&
    'data' in error &&
    (error as ErrorWithResponse).data?.body.message
  ) {
    return (error as ErrorWithResponse).data!.body.message;
  }
  return defaultMessage;
};