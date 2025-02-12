// pages/index.tsx
import React from 'react';
import { TopNavbar } from '@/components/TopNavbar';
import { CircleCheck, LucideXCircle, LucideAlertCircle, Recycle, Leaf, LucideTruck, LucidePackage, Wheat, Package, ChartCandlestick } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const Home = () => {

  const ProducedStatuses = [
    { label: "Approved", value: "0.00 kL", icon: CircleCheck, color: "text-green-500" },
    { label: "Rejected", value: "0.30 kL", icon: LucideXCircle, color: "text-red-500" },
    { label: "Pending", value: "1.25 kL", icon: LucideAlertCircle, color: "text-yellow-500" },
    { label: "Mixed", value: "0.78 kL", icon: Recycle, color: "text-muted-foreground" },
    { label: "Shipped", value: "0.00 kL", icon: LucideTruck, color: "text-muted-foreground" },
    { label: "Applied", value: "0.00 kL", icon: LucidePackage, color: "text-muted-foreground" },
  ];

  const CollectedStatuses = [
    { label: "Lemon Myrtle:", value: "64.94 ton" },
    { label: "Empty Fruit Bunch (EFB):", value: "16.00 ton" },
  ];

  const biocharStatistics = {
    statistics: [
      { icon: <Package className="w-6 h-6 text-muted-foreground" />, label: "Total Packed", value: "1150.00 Ltr." },
      { icon: <LucideTruck className="w-6 h-6 text-muted-foreground" />, label: "Total Shipped", value: "150.00 Ltr." }
    ],
    tableData: [
      { label: "Mix A", packed: "780.00", shipped: "0.00" },
      { label: "Mix B", packed: "150.00", shipped: "100.00" },
      { label: "Mix C", packed: "220.00", shipped: "50.00" }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar />
      <div className="flex flex-col items-center w-full min-h-screen p-6 bg-gray-50">
        <div className="w-full max-w-4xl mt-6 space-y-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            Site Summary
          </h2>

          {/* Total Produced Biochar */}
          <Card className="rounded-lg border shadow-sm p-4 bg-card text-card-foreground">
            <CardContent className="flex flex-col items-center justify-between p-6 space-y-1.5">
              <div className="flex items-center gap-2">
                <Leaf className="w-6 h-6 text-muted-foreground" />
                <h3 className="font-semibold tracking-tight text-lg">Total Produced Biochar</h3>
              </div>
              <div className="text-lg font-semibold">2.328 kL</div>
            </CardContent>
            <CardContent className="grid grid-cols-3 gap-4 mt-4 p-6 pt-0">
              {ProducedStatuses.map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex flex-col items-center">
                  <Icon className={`w-6 h-6 ${color}`} />
                  <p className="mt-2 text-sm">{label}</p>
                  <p className="text-sm font-semibold">{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Total Biomass Collected */}
          <Card className="mt-4 p-4">
            <CardContent>
              <div className="flex flex-col items-center space-y-2.5 p-6 my-2">
                <div className="flex items-center gap-2">
                  <Wheat className="w-6 h-6 text-muted-foreground" />
                  <h3 className="font-semibold tracking-tight text-lg">Total Biomass Collected</h3>
                </div>
                <div className="text-lg font-semibold">80.94 tons</div>
              </div>
              <div className="p-6 pt-0 space-y-4">
                {CollectedStatuses.map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <p className="text-md text-muted-foreground">{label}</p>
                    <p className="text-md font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Biochar Statistics */}
          <Card className="mt-4 p-4">
            <CardContent>
              <div className="flex flex-col items-center space-y-2.5 p-6">
                <div className="flex items-center gap-2">
                  <ChartCandlestick className="w-6 h-6 text-muted-foreground" />
                  <h3 className="font-semibold tracking-tight text-lg">Biochar Statistics</h3>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-20 mt-4 p-6">
                {biocharStatistics.statistics.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    {item.icon}
                    <p className="mt-2 text-sm">{item.label}</p>
                    <p className="text-sm font-semibold">{item.value}</p>
                  </div>))}
              </div>
              <div className="overflow-x-auto mt-4">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-4 py-2 text-left text-muted-foreground">Sack</th>
                      <th className="border px-4 py-2 text-left text-muted-foreground">Packed (Ltr)</th>
                      <th className="border px-4 py-2 text-left text-muted-foreground">Shipped (Ltr)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {biocharStatistics.tableData.map((row, index) => (
                      <tr key={index} className="bg-card text-card-foreground">
                        <td className="border px-4 py-2 text-muted-foreground">{row.label}</td>
                        <td className="border px-4 py-2 text-muted-foreground">{row.packed}</td>
                        <td className="border px-4 py-2 text-muted-foreground">{row.shipped}</td>
                      </tr>))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;