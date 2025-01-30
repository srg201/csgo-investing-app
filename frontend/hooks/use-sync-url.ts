import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFilters } from "@/store/filters";

export const useSyncUrl = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { search, sortBy, sortType, investType, syncWithUrl } = useFilters();

  useEffect(() => {
    syncWithUrl();
  }, [syncWithUrl]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (sortBy) params.set("sortBy", sortBy);
    if (sortType) params.set("sortType", sortType);
    if (investType) params.set("investType", investType);

    router.push(`?${params.toString()}`, { scroll: false });
  }, [search, sortBy, sortType, investType, router, searchParams]);
};
