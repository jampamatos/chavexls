/** Simple sample component used for testing Tailwind */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <h1 className="text-3xl font-bold mb-4">ChaveXLS</h1>
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">
        Test CTA
      </button>
      <p className="mt-4 text-muted-foreground">If you can read this with proper colors, Tailwind v4 is working.</p>
    </div>
  )
}
