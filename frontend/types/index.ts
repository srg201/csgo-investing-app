import { ICase } from "./cases.types";

export interface ActionResponse<T> {
  status: number;
  data: T | null;
  error: string | null;
}

export interface CaseWithQuantity extends ICase {
  quantity: number;
}
