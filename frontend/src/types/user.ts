export type User = {
  id: number;
  name: string;
  email: string;
};

export interface CreateFormState {
  name: string;
  email: string;
}

export interface EditFormState {
  name: string;
  email: string;
}

export type ToastSeverity = "success" | "error";
