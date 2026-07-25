"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { LEAD_STATUS_LABELS } from "@/lib/admin/constants";
import type { LeadStatus } from "@/types/admin";

const CHART_COLORS = [
  "#38bdf8",
  "#818cf8",
  "#a78bfa",
  "#fbbf24",
  "#34d399",
  "#d4af37",
  "#f87171",
];

interface LeadStatusChartProps {
  data: { status: LeadStatus; count: number }[];
}

export function LeadStatusChart({ data }: LeadStatusChartProps) {
  const chartData = data
    .filter((d) => d.count > 0)
    .map((d) => ({
      name: LEAD_STATUS_LABELS[d.status],
      value: d.count,
    }));

  if (chartData.length === 0) {
    return (
      <p className="flex h-64 items-center justify-center text-sm text-brand-slate">
        No lead data yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={90}
          label={({ name, value }) => `${name}: ${value}`}
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#0a2540",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

interface RevenueLineChartProps {
  data: { month: string; revenue: number }[];
}

export function RevenueLineChart({ data }: RevenueLineChartProps) {
  const hasData = data.some((d) => d.revenue > 0);

  if (!hasData) {
    return (
      <p className="flex h-64 items-center justify-center text-sm text-brand-slate">
        No paid invoices yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [
            `GHS ${Number(value ?? 0).toLocaleString()}`,
            "Revenue",
          ]}
          contentStyle={{
            background: "#0a2540",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
        />
        <Bar dataKey="revenue" fill="#d4af37" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface SimpleBarChartProps {
  data: { label: string; value: number }[];
  valueLabel?: string;
}

export function SimpleBarChart({ data, valueLabel = "Amount" }: SimpleBarChartProps) {
  if (data.length === 0) {
    return (
      <p className="flex h-64 items-center justify-center text-sm text-brand-slate">
        No data yet
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="label" tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [Number(value ?? 0).toLocaleString(), valueLabel]}
          contentStyle={{
            background: "#0a2540",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
          }}
        />
        <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
