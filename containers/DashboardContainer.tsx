"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  MessageSquare,
  TrendingUp,
  Activity,
  Calendar,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import dashboardStore from "@/stores/DashboardStore";

// const mockData = {
//   totalReviews: 124,
//   averageRating: 4.3,
//   monthlyReviews: 18,
//   activePercentage: 92,
//   reviewsOverTime: [
//     { month: "Jan", reviews: 12 },
//     { month: "Feb", reviews: 18 },
//     { month: "Mar", reviews: 22 },
//     { month: "Apr", reviews: 16 },
//     { month: "May", reviews: 25 },
//     { month: "Jun", reviews: 31 },
//   ],
//   ratingDistribution: [
//     { rating: "5★", count: 70 },
//     { rating: "4★", count: 30 },
//     { rating: "3★", count: 15 },
//     { rating: "2★", count: 6 },
//     { rating: "1★", count: 3 },
//   ],
// };

const KPI_CARD = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-secondary/50 transition-all">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-white/50 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-white">{value}</h3>
      </div>
      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
        {icon}
      </div>
    </div>
  </div>
);

const DashboardContainer = () => {
  const [range, setRange] = useState("6m");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

const [data, setData] = useState<any>({
  totalReviews: 0,
  averageRating: 0,
  monthlyReviews: 0,
  activePercentage: 0,
  reviewsOverTime: [],
  ratingDistribution: [],
});


  const fetchData = async(startDate: string, endDate: string) => {
    try {
      const resp = await dashboardStore.fetchDashboardKpi(startDate, endDate);
      if(resp.success){
        setData(resp.data);
      }
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
  let start = "";
  let end = "";

  const today = new Date();
  end = today.toISOString().split("T")[0];

  if (range === "7d") {
    const d = new Date();
    d.setDate(today.getDate() - 7);
    start = d.toISOString().split("T")[0];
  }

  if (range === "1m") {
    const d = new Date();
    d.setMonth(today.getMonth() - 1);
    start = d.toISOString().split("T")[0];
  }

  if (range === "6m") {
    const d = new Date();
    d.setMonth(today.getMonth() - 6);
    start = d.toISOString().split("T")[0];
  }

  if (range === "1y") {
    const d = new Date();
    d.setFullYear(today.getFullYear() - 1);
    start = d.toISOString().split("T")[0];
  }

  if (range !== "custom") {
    setStartDate(start);
    setEndDate(end);
  }

  if (range === "custom" && startDate && endDate) {
    fetchData(startDate, endDate);
  }

  if (range !== "custom") {
    fetchData(start, end);
  }

}, [range]);


useEffect(() => {
  if (range === "custom" && startDate && endDate) {
    fetchData(startDate, endDate);
  }
}, [startDate, endDate]);
  // const data = mockData;

  return (
    <div className="min-h-screen p-8 bg-black text-white space-y-10">

      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="text-white/50 text-sm mt-1">
            Monitor your business performance and customer feedback.
          </p>
          <div className="w-20 h-[3px] mt-3 rounded-full bg-secondary" />
        </div>

        {/* Date Filter */}
        <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-xl">

          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-secondary" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-black border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-secondary"
            >
              <option value="7d">Last 7 days</option>
              <option value="1m">Last 1 month</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last 1 year</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          {range === "custom" && (
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-secondary"
              />
              <span className="text-white/50 text-sm">to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-black border border-white/10 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:border-secondary"
              />
            </div>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPI_CARD
          title="Average Rating"
          value={`${data.averageRating} ★`}
          icon={<Star className="w-5 h-5" />}
        />
        <KPI_CARD
          title="Total Reviews"
          value={data.totalReviews}
          icon={<MessageSquare className="w-5 h-5" />}
        />
        <KPI_CARD
          title="This Month"
          value={data.monthlyReviews}
          icon={<TrendingUp className="w-5 h-5" />}
        />
        <KPI_CARD
          title="Active Reviews"
          value={`${data.activePercentage}%`}
          icon={<Activity className="w-5 h-5" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Reviews Growth */}
        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-6 text-white">
            Reviews Growth
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.reviewsOverTime}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="reviews"
                stroke="#7c3aed"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Distribution */}
        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-6 text-white">
            Rating Distribution
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.ratingDistribution}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="rating" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar
                dataKey="count"
                fill="#7c3aed"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default DashboardContainer;
