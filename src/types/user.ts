export type RegisterUser = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export type LoginUser = {
  username: string;
  email?: string;
  password: string;
};

export type User = {
  username: string;
};

type WithNonFieldErrors<T> = T & { non_field_errors: string[] };

export type Errors<T> = Partial<
  WithNonFieldErrors<Record<keyof T, string>>
> | null;

export type FormField = {
  title: string;
  name: string;
  placeholder?: string;
  kind: string;
  value: string | number;
  onChange: (e: { target: { value: string } }) => void;
};
