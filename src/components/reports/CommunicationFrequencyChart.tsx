import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const frequencyData = [
  { name: "Email", count: 120 },
  { name: "LinkedIn Post", count: 80 },
  { name: "Email", count: 150 },
  { name: "Phone Call", count: 60 },
  { name: "Chat", count: 100 }
];

interface CommunicationFrequencyChartProps {
  company: string;
  communication: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
}

export const CommunicationFrequencyChart = ({
  company,
  communication,
  startDate,
  endDate,
}: CommunicationFrequencyChartProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Communication Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart 
              data={frequencyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name"
                tick={{ fill: '#666', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
              />
              <YAxis 
                tick={{ fill: '#666', fontSize: 12 }}
                domain={[0, 160]}
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={{ stroke: '#E5E7EB' }}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}`, 'Count']}
                labelStyle={{ color: '#666' }}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
                name="Communication Count"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};