import { Card, CardContent } from "@/components/ui/card";
import { MixData } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface MixingCardProps {
    mixData: MixData;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);  // Parse the date string
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  // Convert the date to a long-form date without the weekday
  const longFormDate = date.toLocaleDateString('en-US', options);

  return longFormDate;
}

export const MixingCard: React.FC<MixingCardProps> = ({mixData}) => {
  return (
    <Card className="p-4 flex flex-col justify-between space-y-4 flex-grow">
      <CardContent className="text-sm space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2 bg-slate-200 px-4 text-center rounded-full font-semibold text-muted-foreground my-4">
            <div>{formatDate(mixData.date)}</div>
            <div>{mixData.time}</div>
          </div>
          <Image
            alt="Biomass"
            src={mixData.imageSrc}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full shadow-md"
          />
        </div>
        <div>
          <span className="font-semibold">Biochar Category:</span>  {mixData.category}
        </div>
        <div>
          <span className="font-semibold">Biochar Type:</span>  {mixData.type}
        </div>
        <div>
          <span className="font-semibold">Volume Of Biochar:</span>  {mixData.volume}
        </div>
        <div>
          <span className="font-semibold">Open Biochar:</span>  {mixData.openBiochar}
        </div>
        <div>
          <span className="font-semibold">Total Unpacked Mix:</span>  {mixData.totalUnpackedMix}
        </div>
        <div>
          <span className="font-semibold">Available Unpacked Mix:</span>  {mixData.availableUnpackedMix}
        </div>
        <div className="flex flex-row justify-between">
          <div>
            <span className="font-semibold">Packaging Details:</span>  {mixData.packagingDetails}
          </div>
          <Link href={mixData.viewLink} className="hover:text-green-500 transition-colors">
            View
          </Link>
        </div>
        <div>
          <span className="font-semibold">Other Mix Qty:</span>  {mixData.otherMixQty}
        </div>
      </CardContent>
    </Card>
  );
};