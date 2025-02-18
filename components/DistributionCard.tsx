import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { DistributionRecord } from "@/types";
import Image from "next/image";

interface DistributionCardProps {
  distributionData: DistributionRecord;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export const DistributionCard: React.FC<DistributionCardProps> = ({
  distributionData,
}) => {
  return (
    <Card className="rounded-lg border overflow-hidden flex flex-col bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardHeader className="space-y-4 flex-grow flex flex-col justify-between p-4 sm:p-6">
        <div className="space-y-4 text-sm">
          {/* Date & Time Section */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2 bg-slate-200 px-4 py-1 text-center rounded-full font-semibold text-muted-foreground">
              <div>{formatDate(distributionData.date)}</div>
              <div>{distributionData.time}</div>
            </div>
            <Image
              alt="Biomass"
              loading="lazy"
              width="64"
              height="64"
              decoding="async"
              className="h-12 w-12 sm:h-16 sm:w-16 rounded-full shadow-md"
              src="/placeholder.svg"
              style={{ color: "transparent" }}
            />
          </div>

          {/* Distribution Details */}
          <div className="grid gap-2 text-sm sm:text-base">
            <div>
              <span className="font-semibold">Farmer Name: </span>{" "}
              {distributionData.farmerName}
            </div>
            <div>
              <span className="font-semibold">Distribution Type: </span>{" "}
              {distributionData.distributionType}
            </div>
            <div>
              <span className="font-semibold">Distribution Qty: </span>{" "}
              {distributionData.distributionQty}
            </div>
            <div>
              <span className="font-semibold">Buyer Name: </span>{" "}
              {distributionData.buyerName}
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Footer (Vehicle Info) */}
      <CardFooter className="flex justify-end">
        <div className="flex items-center bg-slate-100 px-2 py-1 rounded">
          <svg
            className="w-4 h-4 text-muted-foreground"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
            <path d="M15 18H9"></path>
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"></path>
            <circle cx="17" cy="18" r="2"></circle>
            <circle cx="7" cy="18" r="2"></circle>
          </svg>
          <span className="ml-1 text-xs sm:text-sm text-muted-foreground">
            {distributionData.vehicle}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};
