import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const overdueData = [
  { date: "2024-01-01", ENTNT: 5, GOOGLE: 3, MICROSOFT: 7 },
  { date: "2024-01-02", ENTNT: 2, GOOGLE: 4, MICROSOFT: 6 },
  { date: "2024-01-03", ENTNT: 3, GOOGLE: 2, MICROSOFT: 5 },
  { date: "2024-01-04", ENTNT: 4, GOOGLE: 5, MICROSOFT: 3 },
  { date: "2024-01-05", ENTNT: 1, GOOGLE: 3, MICROSOFT: 4 },
  { date: "2024-01-06", ENTNT: 6, GOOGLE: 2, MICROSOFT: 5 },
  { date: "2024-01-07", ENTNT: 3, GOOGLE: 4, MICROSOFT: 2 },
];

export const OverdueTrendsChart = () => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Overdue Communication Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overdueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="ENTNT"
                stroke="#1E88E5"
                dot={{ fill: "#1E88E5" }}
              />
              <Line
                type="monotone"
                dataKey="GOOGLE"
                stroke="#00E676"
                dot={{ fill: "#00E676" }}
              />
              <Line
                type="monotone"
                dataKey="MICROSOFT"
                stroke="#FFC107"
                dot={{ fill: "#FFC107" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};