export default async function ReferencesPage() {
  // const references = await getReferences()

  return (
    <section className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Références</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ul>
              <li>Ref 1</li>
              <li>Ref 2</li>
              <li>Ref 3</li>
              <li>Ref 3</li>
          </ul>
      </div>
    </section>
  )
}
