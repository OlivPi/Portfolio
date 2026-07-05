import Link from 'next/link'
import { logoutAction } from '@/lib/admin-auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-56 bg-black text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Admin
          </p>
          <p className="font-bold mt-1">Olivier Pierre</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin/experiences"
            className="block px-3 py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Expériences
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
