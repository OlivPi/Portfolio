import { loginAction } from '@/lib/admin-auth'

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 w-full max-w-sm shadow-sm">
        <h1 className="text-xl font-bold mb-6">Administration</h1>
        {error && (
          <p className="text-red-600 text-sm mb-4">
            {error === 'locked'
              ? 'Trop de tentatives. Réessayez dans 15 minutes.'
              : 'Mot de passe incorrect.'}
          </p>
        )}
        <form action={loginAction} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Connexion
          </button>
        </form>
      </div>
    </div>
  )
}
