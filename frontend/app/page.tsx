import CasesList from "@/components/cases-list";
import { getCases } from "@/lib/actions/cases.actions";
import { ICaseFilters } from "@/types/cases.types";
import { Filters } from "@/widgets/filters";

export const revalidate = 60;
export const dynamicParams = true; // or false, to 404 on unknown paths

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<ICaseFilters>;
}) {
  const { data: cases, error } = await getCases(await searchParams);

  return (
    <div className="py-4 pr-4">
      <Filters />
      <CasesList cases={cases} error={error} />
    </div>
  );
}
