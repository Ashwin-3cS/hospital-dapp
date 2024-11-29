export function LoadingState() {
  return (
    <main>
      <div className="container mx-auto px-6 py-8 animate-pulse">
        {/* Hero skeleton */}
        <div className="h-[400px] bg-gray-200 rounded-lg mb-8" />

        {/* Features skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[200px] bg-gray-200 rounded-lg" />
          ))}
        </div>

        {/* Dashboard buttons skeleton */}
        <div className="text-center">
          <div className="h-8 bg-gray-200 w-64 mx-auto mb-4 rounded" />
          <div className="flex justify-center space-x-4">
            <div className="h-10 w-40 bg-gray-200 rounded" />
            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </main>
  );
}
