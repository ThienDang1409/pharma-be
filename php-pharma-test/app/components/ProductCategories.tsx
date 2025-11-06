import Link from "next/link";

export default function ProductCategories() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Galenic Instruments */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <div className="relative h-96">
              {/* Background image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <span className="text-9xl">💊</span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-3xl font-bold mb-6">Galenic Instruments</h3>
                <Link
                  href="/galenic-instruments"
                  className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-colors font-semibold"
                >
                  VIEW ALL
                </Link>
              </div>
            </div>
          </div>

          {/* Dissolution Testing */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <div className="relative h-96">
              {/* Background image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <span className="text-9xl">🧪</span>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h3 className="text-3xl font-bold mb-6">Dissolution Testing</h3>
                <Link
                  href="/dissolution-testing"
                  className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 transition-colors font-semibold"
                >
                  VIEW ALL
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
