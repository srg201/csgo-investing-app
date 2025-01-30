export interface ICase {
  id: string;
  market_hash_name: string;
  name: string;
  price: number;
  listings: number;
  imageUrl: string;
  investingRoi1M: number;
  investingRoi6M: number;
  investingRoiYear: number;
  investingRoiWeek: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface ICaseFilters {
  investType: InvestType;
  search: string;
  sortBy: SortBy;
  sortType: SortType;
}

export enum SortBy {
  INVESTING_ROI = "investingRoi",
  PRICE = "price",
  LISTINGS = "listings",
}

export enum InvestType {
  ONE_WEEK = "1week",
  ONE_MONTH = "1month",
  SIX_MONTH = "6month",
  ONE_YEAR = "1year",
}

export enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export type CaseWithQuantity = ICase & { quantity: number };
