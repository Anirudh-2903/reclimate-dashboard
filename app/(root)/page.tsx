// pages/index.tsx
"use client";

import React, { useEffect, useState } from "react";
import { CircleCheck, LucideXCircle, LucideAlertCircle, Recycle, Leaf, LucideTruck, LucidePackage, Wheat, Package, ChartCandlestick } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatbotInterface } from "@/components/ChatBotInterface";
import { ReportGenerator } from "@/components/ReportGenerator";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { ProductionData, MixData, DistributionRecord, FPUData } from "@/types"; // Adjust the import path

const Home = () => {
  const [producedBiochar, setProducedBiochar] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
    mixed: 0,
    shipped: 0,
    applied: 0,
    total: 0
  });

  const [biomassCollected, setBiomassCollected] = useState<{label: string, value: number}[]>([]);
  const [biocharStats, setBiocharStats] = useState({
    totalPacked: 0,
    totalShipped: 0
  });
  const [loading, setLoading] = useState(true);

  const formatWeight = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} ton`;
    }
    return `${value.toFixed(2)} kg`;
  };

  const formatVolume = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kL`;
    }
    return `${value.toFixed(2)} L`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch production data
        const productionQuery = await getDocs(collection(db, "productions"));
        let approved = 0, rejected = 0, pending = 0, total = 0;

        productionQuery.forEach(doc => {
          const data = doc.data() as ProductionData;
          const biocharQty = parseFloat(data.biocharQty) || 0;
          total += biocharQty;

          switch(data.assessment) {
            case "Approved":
              approved += biocharQty;
              break;
            case "Rejected":
              rejected += biocharQty;
              break;
            case "Pending":
              pending += biocharQty;
              break;
          }
        });

        // Fetch mix data
        const mixQuery = await getDocs(collection(db, "mixings"));
        let mixed = 0;

        mixQuery.forEach(doc => {
          const data = doc.data() as MixData;
          mixed += parseFloat(data.totalUnpackedMix) || 0;
        });

        // Fetch distribution data
        const distributionQuery = await getDocs(collection(db, "distributions"));
        let shipped = 0;

        distributionQuery.forEach(doc => {
          const data = doc.data() as DistributionRecord;
          shipped += parseFloat(data.distributionQty) || 0;
        });

        // Fetch biomass collection data
        const fpuQuery = await getDocs(collection(db, "collections"));
        const biomassMap = new Map<string, number>();

        fpuQuery.forEach(doc => {
          const data = doc.data() as FPUData;
          const source = data.fpuName;
          const weight = parseFloat(data.biomassDetails.weight) || 0;

          if (biomassMap.has(source)) {
            biomassMap.set(source, biomassMap.get(source)! + weight);
          } else {
            biomassMap.set(source, weight);
          }
        });

        // Convert biomass map to array
        const biomassArray = Array.from(biomassMap.entries()).map(([label, value]) => ({
          label,
          value
        }));

        setProducedBiochar({
          approved,
          rejected,
          pending,
          mixed,
          shipped,
          applied: 0, // You'll need to add this data source if needed
          total
        });

        setBiomassCollected(biomassArray);
        setBiocharStats({
          totalPacked: mixed,
          totalShipped: shipped
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const ProducedStatuses = [
    { label: "Approved", value: formatVolume(producedBiochar.approved), icon: CircleCheck, color: "text-green-500" },
    { label: "Rejected", value: formatVolume(producedBiochar.rejected), icon: LucideXCircle, color: "text-red-500" },
    { label: "Pending", value: formatVolume(producedBiochar.pending), icon: LucideAlertCircle, color: "text-yellow-500" },
    { label: "Mixed", value: formatWeight(producedBiochar.mixed), icon: Recycle, color: "text-muted-foreground" },
    { label: "Shipped", value: formatWeight(producedBiochar.shipped), icon: LucideTruck, color: "text-muted-foreground" },
    { label: "Applied", value: formatWeight(producedBiochar.applied), icon: LucidePackage, color: "text-muted-foreground" },
  ];

  const CollectedStatuses = biomassCollected.map(item => ({
    label: item.label + ":",
    value: formatWeight(item.value)
  }));

  const biocharStatistics = {
    statistics: [
      { icon: <Package className="w-6 h-6 text-muted-foreground" />, label: "Total Packed:", value: formatWeight(biocharStats.totalPacked) },
      { icon: <LucideTruck className="w-6 h-6 text-muted-foreground" />, label: "Total Shipped:", value: formatWeight(biocharStats.totalShipped) }
    ],
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center w-full min-h-screen p-6 bg-gray-50">
          <div className="w-full max-w-4xl mt-6 space-y-6">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-lg">
                <TabsTrigger
                    value="dashboard"
                    className="font-semibold rounded-lg text-sm data-[state=active]:bg-green-200 data-[state=active]:shadow-sm"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                    value="chatbot"
                    className="font-semibold rounded-lg text-sm data-[state=active]:bg-green-200 data-[state=active]:shadow-sm"
                >
                  Biochar AI Assistant
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard">
                <h2 className="text-2xl my-6 font-semibold text-center text-gray-700">
                  Site Summary
                </h2>
                {/* Total Produced Biochar */}
                <Card className="rounded-lg border shadow-sm p-4 bg-card text-card-foreground">
                  <CardContent className="flex flex-col items-center justify-between p-6 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-6 h-6 text-muted-foreground" />
                      <h3 className="font-semibold tracking-tight text-lg">Total Produced Biochar</h3>
                    </div>
                    <div className="text-lg font-semibold">{formatVolume(producedBiochar.total)}</div>
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
                      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
                        <Wheat className="w-6 h-6 text-muted-foreground" />
                        <h3 className="font-semibold tracking-tight text-lg whitespace-nowrap text-center">
                          Total Biomass Collected
                        </h3>
                      </div>
                      <div className="text-lg font-semibold">
                        {formatWeight(biomassCollected.reduce((sum, item) => sum + item.value, 0))}
                      </div>
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
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chatbot">
                <ChatbotInterface />
                <ReportGenerator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
  );
};

export default Home;