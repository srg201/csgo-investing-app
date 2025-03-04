"use server";

import { CaseWithQuantity, ICase, ICaseFilters } from "@/types/cases.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { COOKIE_KEYS, COOKIE_MAX_AGE } from "@/constants";
import type { ActionResponse } from "@/types/index";

const baseUrl = process.env.API_URL;

export const getCases = async (
  params: ICaseFilters
): Promise<ActionResponse<ICase[]>> => {
  try {
    const stringParams: Record<string, string> = {};
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        stringParams[key] = String(value);
      }
    });

    const reqParams = new URLSearchParams(stringParams);
    const response = await fetch(`${baseUrl}/cases?${reqParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error: "Failed to fetch cases",
      };
    }

    const data: ICase[] = await response.json();
    return {
      status: 200,
      data: data || [],
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch cases:", error);
    return {
      status: 500,
      data: null,
      error: "Failed to fetch cases",
    };
  }
};

export const getUpdatedTime = async (): Promise<ActionResponse<string>> => {
  try {
    const response = await fetch(`${baseUrl}/cases/updated-time`);

    if (!response.ok) {
      return {
        status: response.status,
        data: null,
        error: "Failed to fetch updated time",
      };
    }

    const data = await response.json();
    return {
      status: 200,
      data: data.updatedAt,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch updated time:", error);
    return {
      status: 500,
      data: null,
      error: "Failed to fetch updated time",
    };
  }
};

export const addToCalculator = async (
  caseItem: ICase,
  quantity: number
): Promise<ActionResponse<CaseWithQuantity>> => {
  try {
    const cookieStore = await cookies();
    const calculatorCookie = cookieStore.get(COOKIE_KEYS.CALCULATOR_CASES);

    // Parse existing cases with type safety
    const casesInCalculator: CaseWithQuantity[] = calculatorCookie
      ? JSON.parse(calculatorCookie.value)
      : [];

    // Validate quantity
    if (quantity <= 0) {
      return {
        status: 400,
        data: null,
        error: "Quantity must be greater than 0",
      };
    }

    // Find and update existing case or add new one
    const existingCaseIndex = casesInCalculator.findIndex(
      (c) => c.id === caseItem.id
    );

    let updatedCase: CaseWithQuantity;

    if (existingCaseIndex !== -1) {
      casesInCalculator[existingCaseIndex] = {
        ...casesInCalculator[existingCaseIndex],
        quantity: casesInCalculator[existingCaseIndex].quantity + quantity,
      };
      updatedCase = casesInCalculator[existingCaseIndex];
    } else {
      updatedCase = { ...caseItem, quantity };
      casesInCalculator.push(updatedCase);
    }

    cookieStore.set(
      COOKIE_KEYS.CALCULATOR_CASES,
      JSON.stringify(casesInCalculator),
      {
        maxAge: COOKIE_MAX_AGE.ONE_MONTH,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }
    );

    revalidatePath("/calculator");

    return {
      status: 200,
      data: updatedCase,
      error: null,
    };
  } catch (error) {
    console.error("Failed to add case to calculator:", error);
    return {
      status: 500,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to add case to calculator",
    };
  }
};

export const getCaseById = async (
  id: string
): Promise<ActionResponse<ICase>> => {
  try {
    const response = await fetch(`${baseUrl}/cases/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        status: 404,
        data: null,
        error: "Case not found",
      };
    }

    const data = await response.json();

    return {
      status: 200,
      data,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch case:", error);
    return {
      status: 500,
      data: null,
      error: error instanceof Error ? error.message : "Failed to fetch case",
    };
  }
};

export const removeFromCalculator = async (
  caseItem: ICase
): Promise<ActionResponse<boolean>> => {
  try {
    const cookieStore = await cookies();
    const calculatorCookie = cookieStore.get(COOKIE_KEYS.CALCULATOR_CASES);

    if (!calculatorCookie) {
      return {
        status: 404,
        data: false,
        error: "No cases found in calculator",
      };
    }

    const casesInCalculator: CaseWithQuantity[] = JSON.parse(
      calculatorCookie.value
    );

    const caseExists = casesInCalculator.some((c) => c.id === caseItem.id);
    if (!caseExists) {
      return {
        status: 404,
        data: false,
        error: "Case not found in calculator",
      };
    }

    const updatedCases = casesInCalculator.filter((c) => c.id !== caseItem.id);

    cookieStore.set(
      COOKIE_KEYS.CALCULATOR_CASES,
      JSON.stringify(updatedCases),
      {
        maxAge: COOKIE_MAX_AGE.ONE_MONTH,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      }
    );

    revalidatePath("/calculator");

    return {
      status: 200,
      data: true,
      error: null,
    };
  } catch (error) {
    console.error("Failed to remove case from calculator:", error);
    return {
      status: 500,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to remove case from calculator",
    };
  }
};

export const getCasesFromCalculator = async (): Promise<
  ActionResponse<CaseWithQuantity[]>
> => {
  try {
    const cookieStore = await cookies();
    const calculatorCookie = cookieStore.get(COOKIE_KEYS.CALCULATOR_CASES);

    if (!calculatorCookie) {
      return {
        status: 200,
        data: [],
        error: null,
      };
    }

    const casesInCalculator: CaseWithQuantity[] = JSON.parse(
      calculatorCookie.value
    );

    const updatedCases = await Promise.all(
      casesInCalculator.map(async (caseInCalculator) => {
        const { data, error, status } = await getCaseById(caseInCalculator.id);
        if (error || !data || status !== 200) {
          console.warn(`Failed to fetch case ${caseInCalculator.id}:`, error);
          return null;
        }
        return { ...data, quantity: caseInCalculator.quantity };
      })
    );

    const validCases = updatedCases.filter(
      (c): c is CaseWithQuantity => c !== null
    );

    return {
      status: 200,
      data: validCases,
      error: null,
    };
  } catch (error) {
    console.error("Failed to fetch calculator cases:", error);
    return {
      status: 500,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch calculator cases",
    };
  }
};
