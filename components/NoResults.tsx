import { Frown } from "lucide-react"; // Import the Frown icon
import { motion } from "framer-motion";

export const NoResults = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-[calc(100vh)] mb-24 py-12 px-4 text-center" // Adjusted min-height
        >
            <div className="flex flex-col items-center mb-24 justify-center w-full max-w-md">
                {/* Icon */}
                <div className="mb-6">
                    <Frown
                        width={200}
                        height={200}
                        className="w-32 h-32 sm:w-48 sm:h-48" // Adjusted size for mobile and tablet
                    />
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                    No Results Found
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    We couldn&#39;t find any results.
                </p>
            </div>
        </motion.div>
    );
};