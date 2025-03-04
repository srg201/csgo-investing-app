export interface INews {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  source?: string;
  imageUrl?: string;
  timeToRead?: number;
}

export interface NewsFilters {
  limit?: number;
  offset?: number;
  exclude?: string[];
}
