type Success<T> = {
  error_status: false;
  value: T;
};

type Failure<U> = {
  error_status: true;
  error: U;
};

type ErrorCode = 'INTERNAL_SERVICE_ERROR' | 'INPUT_VALIDATION_ERROR' | 'NOT_FOUND' | 'CUSTOM_ERROR';

export type ServiceErrorCode = {
  name: string;
  issues: Record<string, string | string[]> | null;
  message: string;
  code: ErrorCode;
};

export type MMApiErrorShape = {
  timestamp: Date;
  data: null;
  message: string;
  error: ServiceErrorCode | null;
};

export type Result<T, U> = Success<T> | Failure<U>;

const success = <T>(value: T): Success<T> => ({
  error_status: false,
  value,
});

const failure = <T extends MMApiErrorShape>(error: T): Failure<T> => ({
  error_status: true,
  error,
});

export { success, failure };
