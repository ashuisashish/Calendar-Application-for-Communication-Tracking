import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const effectivenessData = [
  { name: "Email", value: 42 },
  { name: "Phone Call", value: 50 },
  { name: "LinkedIn Message", value: 150 },
  { name: "Webinar", value: 73 },
];

const COLORS = ["#1E88E5", "#00E676", "#FFC107", "#FF7043"];

export const EngagementEffectivenessChart = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Engagement Effectiveness</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={effectivenessData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name} (${value})`}
              >
                {effectivenessData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};