export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center p-10 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
            <p className="text-blue-600 font-medium animate-pulse">Loading data...</p>
        </div>
    );
}