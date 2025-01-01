import { useState, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunicationFrequencyChart } from "@/components/reports/CommunicationFrequencyChart";
import { EngagementEffectivenessChart } from "@/components/reports/EngagementEffectivenessChart";
import { OverdueTrendsChart } from "@/components/reports/OverdueTrendsChart";
import { ActivityLog } from "@/components/reports/ActivityLog";
import { FilterBar } from "@/components/reports/FilterBar";
import { ExportButtons } from "@/components/reports/ExportButtons";

const ReportsPage = () => {
  const [company, setCompany] = useState("All");
  const [communication, setCommunication] = useState("All");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const handleFilter = useCallback(() => {
    console.log("Filtering with:", { company, communication, startDate, endDate });
  }, [company, communication, startDate, endDate]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Reports & Analytics</h1>
          <ExportButtons 
            company={company}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <FilterBar 
          company={company}
          setCompany={setCompany}
          communication={communication}
          setCommunication={setCommunication}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onFilter={handleFilter}
        />

        <div className="overflow-x-auto">
          <Tabs defaultValue="frequency" className="w-full">
            <TabsList className="w-full md:w-auto flex flex-wrap">
              <TabsTrigger value="frequency" className="flex-1 md:flex-none">
                COMMUNICATION FREQUENCY
              </TabsTrigger>
              <TabsTrigger value="effectiveness" className="flex-1 md:flex-none">
                ENGAGEMENT EFFECTIVENESS
              </TabsTrigger>
              <TabsTrigger value="overdue" className="flex-1 md:flex-none">
                OVERDUE TRENDS
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex-1 md:flex-none">
                ACTIVITY LOG
              </TabsTrigger>
            </TabsList>

            <TabsContent value="frequency">
              <div className="w-full overflow-x-auto">
                <CommunicationFrequencyChart 
                  company={company}
                  communication={communication}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </TabsContent>

            <TabsContent value="effectiveness">
              <div className="w-full overflow-x-auto">
                <EngagementEffectivenessChart />
              </div>
            </TabsContent>

            <TabsContent value="overdue">
              <div className="w-full overflow-x-auto">
                <OverdueTrendsChart />
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="w-full overflow-x-auto">
                <ActivityLog />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ReportsPage;