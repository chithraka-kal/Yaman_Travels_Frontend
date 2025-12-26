export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        {/* Simple CSS Spinner */}
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">
          Starting your Adventure...
        </h2>
      </div>
    </div>
  );
}