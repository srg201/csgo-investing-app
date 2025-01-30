import { CalculatorCase } from "@/components/calculator-case";
import { cn, formatCurrency } from "@/lib/utils";
import { getCasesFromCalculator } from "@/lib/actions/cases.actions";
import { ICase } from "@/types/cases.types";

export const revalidate = 60;
export const dynamicParams = true; // or false, to 404 on unknown paths

const Page = async () => {
  const cases = await getCasesFromCalculator();
  const totalPrice = cases.reduce(
    (acc: number, item: ICase & { quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  const calculateWeightedRoi = (
    roiField:
      | "investingRoi1M"
      | "investingRoi6M"
      | "investingRoiWeek"
      | "investingRoiYear"
  ) => {
    return cases.reduce((acc: number, item: ICase & { quantity: number }) => {
      const itemValue = item.price * item.quantity;
      const weightedRoi = (itemValue / totalPrice) * item[roiField];
      return acc + weightedRoi;
    }, 0);
  };

  return (
    <div className="p-4">
      <div className="mt-7">
        <h4 className="mb-7 font-bold text-xl">Added cases</h4>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7 mt-4">
          {cases.map((item: ICase & { quantity: number }) => (
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
