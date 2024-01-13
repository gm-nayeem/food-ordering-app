import { cn } from "@/libs/cn";

const LoadingSkeleton = ({ className }) => {
    return (
        <div className={cn("text-center", className)}>Loading...</div>
    )
}

export default LoadingSkeleton;