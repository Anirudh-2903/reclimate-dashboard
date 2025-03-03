import { Skeleton } from "@/components/ui/skeleton";

export const SearchBarSkeleton = () => {
    return (
        <div className="container py-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {/* Search Input Skeleton */}
                <div className="relative flex-1 max-w-lg">
                    <Skeleton className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" /> {/* Search Icon */}
                    <Skeleton className="h-10 w-full pl-10 " /> {/* Search Input */}
                </div>

                {/* Date Range and Add Button Skeleton */}
                <div className="flex items-center gap-4">
                    {/* Date Range Button Skeleton */}
                    <Skeleton className="h-10 w-32 " /> {/* Date Range Button */}

                    {/* Add Button Skeleton */}
                    <Skeleton className="h-10 w-24 " /> {/* Add Button */}
                </div>
            </div>
        </div>
    );
};