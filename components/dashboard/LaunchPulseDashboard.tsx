import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, TrendingUp, Users, DollarSign } from "lucide-react";

export function LaunchPulseDashboard() {
  const kpis = [
    { title: "Booking Completion Rate", value: "84%", trend: "+5%", icon: TrendingUp },
    { title: "Active Users (Last 24h)", value: "1,240", trend: "+12%", icon: Users },
    { title: "Total Revenue (AUD)", value: "$12,450", trend: "+8%", icon: DollarSign },
    { title: "Avg. Reasoning Time", value: "120ms", trend: "-15%", icon: BarChart },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            <kpi.icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.trend} from last period</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
