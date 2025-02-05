// pages/index.tsx
import { TopNavbar } from '@/components/TopNavbar';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="bg-white font-sans text-gray-900 antialiased">
        <div className="max-w-4xl mx-auto py-8">
          <header>
            <h1 className="text-2xl font-bold mb-4">Site Summary</h1>
          </header>
          <main>
            <section>
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 mr-2 bg-green-500"></div>
                <h2 className="text-lg font-medium">Total Produced Biochar</h2>
              </div>
              <p className="text-2xl font-bold">2,328 kL</p>
              <div className="flex justify-between mt-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 mr-2 bg-green-500"></div>
                    <h3 className="text-base font-medium">Approved</h3>
                  </div>
                  <p className="text-base font-bold">0.00 kL</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 mr-2 bg-red-500"></div>
                    <h3 className="text-base font-medium">Rejected</h3>
                  </div>
                  <p className="text-base font-bold">0.30 kL</p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-5 h-5 mr-2 bg-yellow-500"></div>
                    <h3 className="text-base font-medium">Pending</h3>
                  </div>
                  <p className="text-base font-bold">1.25 kL</p>
                </div>
              </div>
            </section>
            <section className="mt-8">
              <div className="flex items-center mb-4">
                <div className="w-5 h-5 mr-2 bg-gray-900"></div>
                <h2 className="text-lg font-medium">Total Biomass Collected</h2>
              </div>
              <p className="text-2xl font-bold">80.94 ton</p>
              <div className="flex justify-between mt-4">
                <div>
                  <h3 className="text-base font-medium">Lemon Myrtle:</h3>
                  <p className="text-base font-bold">64.94 ton</p>
                </div>
                <div>
                  <h3 className="text-base font-medium">Empty Fruit Bunch (EFB):</h3>
                  <p className="text-base font-bold">16.00 ton</p>
                </div>
              </div>
            </section>
            <section className="mt-8">
              <h2 className="text-lg font-medium mb-4">Biochar Statistics</h2>
              <div className="flex justify-between mb-4">
                <div>
                  <h3 className="text-base font-medium">Total Packed</h3>
                  <p className="text-base font-bold">1150.00 Ltr.</p>
                </div>
                <div>
                  <h3 className="text-base font-medium">Total Shipped</h3>
                  <p className="text-base font-bold">150.00 Ltr.</p>
                </div>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border text-left">Sack</th>
                    <th className="p-2 border text-left">Packed (Ltr)</th>
                    <th className="p-2 border text-left">Shipped (Ltr)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">Mix A</td>
                    <td className="p-2 border">780.00</td>
                    <td className="p-2 border">0.00</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Mix B</td>
                    <td className="p-2 border">150.00</td>
                    <td className="p-2 border">100.00</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">Mix C</td>
                    <td className="p-2 border">220.00</td>
                    <td className="p-2 border">50.00</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;