"use server";

import { Api } from "@/api";
import { CaseWithQuantity, ICase, ICaseFilters } from "@/types/cases.types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const revalidate = async () => 60;

export const getCases = async (params: ICaseFilters) => {
  try {
    const { data } = await Api.get<ICase[]>("/cases", {
      params,
    });
    console.log("data", data[0]);
    return { data, error: false };
  } catch (error) {
    console.log("error", error);
    return { data: [], error: true };
  }
};

export const getUpdatedTime = async () => {
  try {
    const { data } = await Api.get("/cases/updated-time");
    return data.updatedAt;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const addToCalculator = async (caseItem: ICase, quantity: number) => {
  const casesInCalculator = JSON.parse(
    (await cookies()).get("calculator-cases")?.value || "[]"
  );

  const existingCaseIndex = casesInCalculator.findIndex(
    (c: ICase) => c.id === caseItem.id
  );

  if (existingCaseIndex !== -1) {
    casesInCalculator[existingCaseIndex].quantity += quantity;
  } else {
    casesInCalculator.push({ id: caseItem.id, quantity });
  }

  (await cookies()).set("calculator-cases", JSON.stringify(casesInCalculator), {
    maxAge: 60 * 60 * 24 * 30,
  });

  return {
    data:
      existingCaseIndex !== -1
        ? casesInCalculator[existingCaseIndex]
        : { ...caseItem, quantity },
    error: false,
  };
};

export const getCaseById = async (id: string) => {
  try {
    const { data } = await Api.get<ICase>(`/cases/${id}`);
    return { data, error: false };
  } catch (error) {
    console.log("error", error);
    return { data: null, error: true };
  }
};

export const removeFromCalculator = async (caseItem: ICase) => {
  const casesInCalculator = JSON.parse(
    (await cookies()).get("calculator-cases")?.value || "[]"
  );

  const updatedCases = casesInCalculator.filter(
    (c: ICase) => c.id !== caseItem.id
  );

  (await cookies()).set("calculator-cases", JSON.stringify(updatedCases));

  revalidatePath("/calculator");
};

export const getCasesFromCalculator = async () => {
  const casesInCalculator = JSON.parse(
    (await cookies()).get("calculator-cases")?.value || "[]"
  );
  const updatedCases = await Promise.all(
    casesInCalculator.map(async (caseInCalculator: CaseWithQuantity) => {
      const { data, error } = await getCaseById(caseInCalculator.id);
      if (error) {
        return null;
      }
      return { ...data, quantity: caseInCalculator.quantity };
    })
  );

  return updatedCases;
};
