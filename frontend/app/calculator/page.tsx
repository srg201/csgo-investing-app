import { CalculatorCase } from "@/components/global/cases/calculator-case";
import { cn, formatCurrency } from "@/lib/utils";
import { getCasesFromCalculator } from "@/lib/actions/cases.actions";
import { ICase } from "@/types/cases.types";
import { NotFound } from "@/components/global/not-found";

const Page = async () => {
  const { status, data: cases, error } = await getCasesFromCalculator();

  if (status === 500) {
    return <div>{error}</div>;
  }

  // Early return if no cases
  if (status === 404 || !cases?.length) {
    return (
      <NotFound
        title="No cases found."
        description="You have not added any cases yet."
        linkText="Add cases"
        linkHref="/?sortBy=investingRoi&sortType=asc&investType=1year"
      />
    );
  }

  const totalPrice = cases.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const calculateWeightedRoi = (
    roiField: keyof Pick<
      ICase,
      | "investingRoi1M"
      | "investingRoi6M"
      | "investingRoiWeek"
      | "investingRoiYear"
    >
  ) => {
    return cases.reduce((acc, item) => {
      const itemValue = item.price * item.quantity;
      const weightedRoi = (itemValue / totalPrice) * item[roiField];
      return acc + weightedRoi;
    }, 0);
  };

  return (
    <div className="p-4">
      <div className="">
        <h4 className="mb-7 heading-2">Added cases</h4>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7 mt-4">
          {cases.map((item) => (
            <CalculatorCase key={item.id} {...item} />
          ))}
        </ul>

        <div className="mt-7 flex flex-col gap-4">
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="text-xl font-bold">Total Price</h4>
            <p className="text-2xl">{formatCurrency(totalPrice)}</p>
          </div>

          <div className="bg-accent p-4 rounded-lg">
            <h4 className="text-xl font-bold">Total Investing ROI (Year)</h4>
            <p
              className={cn("text-2xl", {
                "text-green-500": calculateWeightedRoi("investingRoiYear") > 0,
                "text-red-500": calculateWeightedRoi("investingRoiYear") < 0,
              })}
            >
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
              }).format(calculateWeightedRoi("investingRoiYear") / 100)}
            </p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="text-xl font-bold">Total Investing ROI (6M)</h4>
            <p
              className={cn("text-2xl", {
                "text-green-500": calculateWeightedRoi("investingRoi6M") > 0,
                "text-red-500": calculateWeightedRoi("investingRoi6M") < 0,
              })}
            >
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
              }).format(calculateWeightedRoi("investingRoi6M") / 100)}
            </p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="text-xl font-bold">Total Investing ROI (1M)</h4>
            <p
              className={cn("text-2xl", {
                "text-green-500": calculateWeightedRoi("investingRoi1M") > 0,
                "text-red-500": calculateWeightedRoi("investingRoi1M") < 0,
              })}
            >
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
              }).format(calculateWeightedRoi("investingRoi1M") / 100)}
            </p>
          </div>
          <div className="bg-accent p-4 rounded-lg">
            <h4 className="text-xl font-bold">Total Investing ROI (Week)</h4>
            <p
              className={cn("text-2xl", {
                "text-green-500": calculateWeightedRoi("investingRoiWeek") > 0,
                "text-red-500": calculateWeightedRoi("investingRoiWeek") < 0,
              })}
            >
              {new Intl.NumberFormat("en-US", {
                style: "percent",
                minimumFractionDigits: 2,
              }).format(calculateWeightedRoi("investingRoiWeek") / 100)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
