export default function Loading() {
  return (
    <div className="animate-pulse space-y-10 py-4">
      <div className="space-y-3">
        <div className="h-4 bg-tertiary rounded w-3/4" />
        <div className="h-4 bg-tertiary rounded w-1/2" />
        <div className="h-4 bg-tertiary rounded w-2/3" />
        <div className="h-60 w-60 bg-tertiary rounded mt-6" />
      </div>
      <div className="space-y-3">
        <div className="h-6 bg-tertiary rounded w-40" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="h-7 bg-tertiary rounded-full w-20" />
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-6 bg-tertiary rounded w-40" />
        <div className="h-32 bg-tertiary rounded w-full" />
      </div>
    </div>
  )
}
