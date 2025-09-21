"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const salesData = [
  { month: "Jan", sales: 850, revenue: 12500 },
  { month: "Feb", sales: 920, revenue: 13800 },
  { month: "Mar", sales: 1100, revenue: 16200 },
  { month: "Apr", sales: 980, revenue: 14700 },
  { month: "May", sales: 1250, revenue: 18750 },
  { month: "Jun", sales: 1400, revenue: 21000 },
]

const categoryData = [
  { name: "Electronics", value: 45, color: "#059669" },
  { name: "Fashion", value: 25, color: "#10b981" },
  { name: "Home & Garden", value: 20, color: "#34d399" },
  { name: "Others", value: 10, color: "#6ee7b7" },
]

interface AnalyticsChartProps {
  type: "sales" | "revenue" | "categories"
  title: string
}

export function AnalyticsChart({ type, title }: AnalyticsChartProps) {
  if (type === "categories") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-4 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (type === "revenue") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
              <Line type="monotone" dataKey="revenue" stroke="#059669" strokeWidth={2} dot={{ fill: "#059669" }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [value, "Sales"]} />
            <Bar dataKey="sales" fill="#059669" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
