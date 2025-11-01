'use client';

import { useEffect, useState } from 'react';
import productService from '@/services/productService';
import { Package } from '@/types/product';
import { Bounded } from '@/components/Bounded';
import { Heading } from '@/components/Heading';

export default function TestApiPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await productService.getPackages();
        setPackages(data);
        console.log('✅ Packages fetched successfully:', data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch packages';
        setError(errorMessage);
        console.error('❌ Error fetching packages:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <Bounded className="bg-white min-h-screen">
      <Heading as="h1" className="mb-6">
        API Connection Test
      </Heading>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p className="font-semibold">API Base URL:</p>
        <p className="text-sm text-gray-600">
          {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}
        </p>
      </div>

      {loading && (
        <div className="p-4 bg-blue-100 text-blue-800 rounded">
          Loading packages...
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <p className="font-semibold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          <div className="p-4 bg-green-100 text-green-800 rounded">
            <p className="font-semibold">✅ Success!</p>
            <p>Fetched {packages.length} packages from backend</p>
          </div>

          <div className="space-y-4">
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-4 border rounded shadow-sm">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-2">{pkg.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="font-semibold">ID: {pkg.id}</span>
                  <span className="font-semibold">Price: ₹{pkg.price}</span>
                  <span className={pkg.is_active ? 'text-green-600' : 'text-red-600'}>
                    {pkg.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                {pkg.items && pkg.items.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Items:</p>
                    <ul className="text-sm text-gray-600">
                      {pkg.items.map((item) => (
                        <li key={item.id}>
                          {item.name} (x{item.quantity})
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Bounded>
  );
}
