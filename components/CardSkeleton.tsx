import { Skeleton } from "@/components/ui/skeleton";
import {SearchBarSkeleton} from "@/components/SearchBarSkeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";


export const CardSkeletonCollection = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <SearchBarSkeleton />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
                {[...Array(7)].map((_, index) => (
                    <div className="rounded-lg border overflow-hidden bg-card text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between p-4" key={index}>
                        {/* Top Section: FPU Name & Image */}
                        <div className="flex justify-between items-start">
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-32 " /> {/* FPU Name */}
                                <Skeleton className="h-4 w-24 " /> {/* FPU Name Subtext */}
                            </div>
                            <Skeleton className="rounded-md w-12 h-12 sm:w-16 sm:h-16" /> {/* Image */}
                        </div>

                        {/* Biomass Details Section */}
                        <div className="flex justify-between mt-3">
                            <Skeleton className="h-4 w-24 " /> {/* Biomass Details Label */}
                            <Skeleton className="h-4 w-20 " /> {/* Date */}
                        </div>

                        {/* Bottom Section: Biomass Source, Weight & Vehicle */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-auto">
                            <Skeleton className="h-4 w-28 " /> {/* Biomass Source */}
                            <Skeleton className="h-4 w-20 " /> {/* Weight */}
                            <div className="flex items-center bg-slate-100 px-2 py-1 rounded w-fit ml-auto sm:ml-0">
                                <Skeleton className="w-4 h-4 rounded-full " /> {/* Vehicle Icon */}
                                <Skeleton className="ml-1 h-3 w-12 " /> {/* Vehicle Type */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function ProductionCardSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <SearchBarSkeleton />
            <div className="max-w-7xl mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-4 p-4 sm:gap-6 sm:p-6">
                    {[...Array(7)].map((_, index) => (
                    <Card className="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl" key={index}>
                    <CardHeader className="p-6 space-y-1.5">
                        <div className="flex flex-col space-y-1.5">
                            <Skeleton className="h-6 w-3/4 mx-auto" />
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                                <div className="flex flex-col items-center">
                                    <Skeleton className="h-6 w-6" />
                                    <Skeleton className="h-3 w-12 mt-1" />
                                </div>
                            </div>
                        </div>
                        <Skeleton className="h-5 w-1/2 mt-6" />
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between rounded-md bg-slate-100 p-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-5 w-5" />
                            </div>
                            <div className="flex items-center justify-between rounded-md bg-slate-100 p-2">
                                <Skeleton className="h-4 w-1/2" />
                                <Skeleton className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-24 rounded-md" />
                            <Skeleton className="h-6 w-24 rounded-md" />
                            <Skeleton className="h-6 w-24 rounded-md" />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-wrap justify-between gap-2 p-3">
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                        <Skeleton className="h-8 w-24 rounded-md" />
                    </CardFooter>

                    <div className="w-full rounded-md  px-4 py-2 text-xs sm:text-sm font-semibold text-center sm:text-left">
                        <Skeleton className="h-4 w-3/4 mx-auto" />
                    </div>
                </Card>
                ))}
                </div>
            </div>
        </div>
    );
}