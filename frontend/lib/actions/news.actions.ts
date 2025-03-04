"use server";

import { NewsFilters } from "@/types/news.types";
const baseUrl = process.env.API_URL;

export async function getNews(filters: NewsFilters) {
  const { limit, offset, exclude } = filters;
  try {
    const stringParams: Record<string, string> = {};

    if (limit !== undefined) stringParams.limit = String(limit);
    if (offset !== undefined) stringParams.offset = String(offset);
    if (exclude?.length) stringParams.exclude = JSON.stringify(exclude);

    const reqParams = new URLSearchParams(stringParams);

    const response = await fetch(`${baseUrl}/news?${reqParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { status: 404, error: "No news found" };
    }

    const data = await response.json();
    return { status: 200, data, limit, offset };
  } catch (error) {
    return { status: 500, error };
  }
}

export async function getOneNews(id: string) {
  try {
    const response = await fetch(`${baseUrl}/news/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { status: 404, error: "No news found" };
    }

    const data = await response.json();
    return { status: 200, data };
  } catch (error) {
    return { status: 500, error };
  }
}
