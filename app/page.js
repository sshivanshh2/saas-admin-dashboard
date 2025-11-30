export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            SaaS Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A modern, full-stack dashboard with authentication, data visualization, and role-based access control.
          </p>
          
          <div className="flex gap-4 justify-center">
            <a 
              href="/login"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Login
            </a>
            <a 
              href="/signup"
              className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              Sign Up
            </a>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-lg font-semibold mb-2">Secure Auth</h3>
              <p className="text-gray-600 text-sm">
                Role-based access control with NextAuth.js
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold mb-2">Data Visualization</h3>
              <p className="text-gray-600 text-sm">
                Interactive charts and real-time KPI dashboards
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">High Performance</h3>
              <p className="text-gray-600 text-sm">
                Server-side rendering and optimized data caching
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}