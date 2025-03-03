import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const ErrorState = ({ error, onRetry }: { error: string; onRetry: () => void }) => {
    return (
        <div className="p-6">
            <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
                <Button variant="outline" className="mt-4" onClick={onRetry}>
                    Retry
                </Button>
            </Alert>
        </div>
    );
};

export default ErrorState;