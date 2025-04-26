type ValidatorFn = (value: unknown) => string | null;

export type ValidationRules<T> = Partial<Record<keyof T, ValidatorFn>>;
