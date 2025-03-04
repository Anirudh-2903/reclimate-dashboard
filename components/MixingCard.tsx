import { Card, CardContent } from "@/components/ui/card";
import { MixData } from "@/types";
import Image from "next/image";

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
            src={mixData.imageUrl}
            width={56}
            height={56}
            className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-md"
          />
        </div>

        {/* Mix Data Details */}
        {/* Mix Data Details */}
        <div className="grid gap-2 text-sm sm:text-base">
          <div>
            <span className="font-semibold">Biochar Category: </span>{" "}
            {mixData.category}
          </div>
          <div>
            <span className="font-semibold">Biochar Type: </span>{" "}
            {mixData.type}
          </div>
          <div>
            <span className="font-semibold">Volume Of Biochar: </span>{" "}
            {mixData.volume}
          </div>
          <div>
            <span className="font-semibold">Open Biochar: </span>{" "}
            {mixData.openBiochar}
          </div>
            <div>
              <span className="font-semibold">Total Unpacked Mix: </span>{" "}
              {mixData.totalUnpackedMix}
            </div>
            <div>
              <span className="font-semibold">Available Unpacked Mix: </span>{" "}
              {mixData.availableUnpackedMix}
            </div>
          <div>
            <span className="font-semibold">Packaging Details: </span>{" "}
            {mixData.packagingDetails}
          </div>
          <div>
            <span className="font-semibold">Other Mix Qty: </span>{" "}
            {mixData.otherMixQty}
          </div>
          </div>
      </CardContent>
    </Card>
  );
};

