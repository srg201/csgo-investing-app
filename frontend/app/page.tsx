import { getCases } from "@/lib/actions/cases.actions";
import { ICaseFilters } from "@/types/cases.types";
import { Filters } from "@/components/global/filters";
import CasesList from "@/components/global/cases/cases-list";

export const revalidate = 3600; // invalidate every hour

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ICaseFilters>;
}) {
  const { status, data: cases } = await getCases(await searchParams);

  return (
    <div className="py-4 pr-4">
      <Filters />
      <CasesList cases={cases || []} error={status !== 200 ? true : false} />
    </div>
  );
}
