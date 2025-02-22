const SkeletonCard = () => {
    return (
        <div className="bg-gray-200 animate-pulse shadow-md rounded-lg p-4">
            <div className="relative w-full h-48 bg-gray-300 rounded-y-lg">
                <div className="mt-4 space-y-2">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
                </div>
                <div className="mt-4 w-full h-10 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}

export default SkeletonCard;