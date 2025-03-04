"use server";
import { cookies } from "next/headers";

export const setCookieConsent = async (isAccepted: boolean) => {
  const cookieStore = await cookies();
  cookieStore.set("cookieConsent", isAccepted.toString(), {
    maxAge: 60 * 60 * 24 * 30,
  });
};

export const getCookieConsent = async () => {
  const cookieStore = await cookies();
  const cookieConsent = cookieStore.get("cookieConsent");
  return cookieConsent?.value ? true : false;
};
