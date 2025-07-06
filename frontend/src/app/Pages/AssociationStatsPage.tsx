import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WasteStat {
  month: string;
  weight: number;
}

const COLORS = ['#4ade80', '#22c55e', '#16a34a', '#166534', '#14532d'];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Statistics() {
  const [data, setData] = useState<WasteStat[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/waste/statistics")
      .then(res => res.json())
      .then((data: any[]) => {
        const formatted: WasteStat[] = data.map((item) => ({
          month: MONTH_NAMES[item._id.month - 1],
          weight: item.totalWeight,
        }));
        setData(formatted);
      });
  }, []);

  return (
    <div className="grid gap-8 p-6">
      <h1 className="text-xl font-bold">Waste Statistics</h1>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="weight" fill="#34d399" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="weight"
            nameKey="month"
            outerRadius={120}
            fill="#10b981"
            label
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}