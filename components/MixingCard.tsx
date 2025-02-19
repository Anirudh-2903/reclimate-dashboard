import { Card, CardContent } from "@/components/ui/card";
import { MixData } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MixingCardProps {
  mixData: MixData;
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

export const MixingCard: React.FC<MixingCardProps> = ({ mixData }) => {
  return (
    <Card className="p-4 flex flex-col space-y-4 flex-grow shadow-lg rounded-lg bg-card text-card-foreground">
      <CardContent className="text-sm space-y-4">
        {/* Date & Image Section */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center space-x-2 bg-slate-200 px-4 py-1 rounded-full font-semibold text-muted-foreground text-xs sm:text-sm">
            <div>{formatDate(mixData.date)}</div>
            <div>{mixData.time}</div>
          </div>
          <Image
            alt="Biomass"
            src={mixData.imageSrc}
            width={56}
            height={56}
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-md"
          />
        </div>

        {/* Mix Data Details */}
        <div className="space-y-2 text-xs sm:text-sm break-words">
          <p className="font-semibold">
            Biochar Category: <span className="font-normal">{mixData.category}</span>
          </p>
          <p className="font-semibold">
            Biochar Type: <span className="font-normal">{mixData.type}</span>
          </p>
          <p className="font-semibold">
            Volume Of Biochar: <span className="font-normal">{mixData.volume}</span>
          </p>
          <p className="font-semibold">
            Open Biochar: <span className="font-normal">{mixData.openBiochar}</span>
          </p>
          <p className="font-semibold">
            Total Unpacked Mix: <span className="font-normal">{mixData.totalUnpackedMix}</span>
          </p>
          <p className="font-semibold">
            Available Unpacked Mix: <span className="font-normal">{mixData.availableUnpackedMix}</span>
          </p>
        </div>

        {/* Packaging & View Link */}
        <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm gap-2">
          <p className="font-semibold">
            Packaging Details:{" "}
            <span className="font-normal">
              {mixData.packagingDetails} {mixData.packagingDetails === "1" ? "Bag" : "Bags"}
            </span>
          </p>
          <Link href={mixData.viewLink} className="text-green-500 hover:underline">
            View
          </Link>
        </div>

        {/* Other Mix Quantity */}
        <p className="font-semibold text-xs sm:text-sm">
          Other Mix Qty: <span className="font-normal">{mixData.otherMixQty}</span>
        </p>
      </CardContent>
    </Card>
  );
};

