import { CookiesConsent } from "@/components/global/cookies-consent";
import { getCookieConsent } from "@/lib/actions/cookies.actions";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export const CookiesProvider: React.FC<Props> = async ({ children }) => {
  const isConsentExists = await getCookieConsent();

  return (
    <>
      {children}
      {!isConsentExists && <CookiesConsent />}
    </>
  );
};
