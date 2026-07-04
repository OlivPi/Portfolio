export default function Loading() {
  return (
    <div className="animate-pulse space-y-10 py-4">
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-56 w-56 bg-gray-200 rounded mt-6" />
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded w-40" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded w-20" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded w-40" />
        <div className="h-28 bg-gray-200 rounded w-full" />
      </div>
    </div>
  )
}
