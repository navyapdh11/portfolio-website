"use client";

import { useState } from "react";
import Link from "next/link";
import { SuburbToggleTable } from "@/components/dashboard/SuburbToggleTable";
import { StateSelector } from "@/components/dashboard/StateSelector";
import { ServiceTypeSelector } from "@/components/dashboard/ServiceTypeSelector";
import { CoverageMap } from "@/components/dashboard/CoverageMap";
import { Save, RotateCcw, Search, ArrowLeft, MapPin, Zap, TrendingUp, DollarSign } from "lucide-react";

export default function DashboardPage() {
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "house-cleaning",
    "end-of-lease",
    "commercial",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingChanges, setPendingChanges] = useState<Map<string, boolean>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleSuburb = (suburbId: string, enabled: boolean) => {
    setPendingChanges((prev) => new Map(prev).set(suburbId, enabled));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setPendingChanges(new Map());
      alert(`Successfully saved ${pendingChanges.size} changes!`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBulkEnable = () => {
    // Simulate enabling all visible suburbs
    const sampleIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    sampleIds.forEach((id) => handleToggleSuburb(id, true));
  };

  const handleBulkDisable = () => {
    const sampleIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    sampleIds.forEach((id) => handleToggleSuburb(id, false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      {/* Header */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                    National Coverage Control
                  </h1>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                    🇦🇺 Nationwide
                  </span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Manage service availability across{" "}
                  <span className="font-semibold text-blue-600">10,247 suburbs</span> •{" "}
                  <span className="font-semibold text-green-600">8,323 active</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleBulkEnable}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm"
              >
                Enable All Visible
              </button>
              <button
                onClick={handleBulkDisable}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm"
              >
                Disable All Visible
              </button>
              <button
                onClick={() => setPendingChanges(new Map())}
                disabled={pendingChanges.size === 0}
                className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={pendingChanges.size === 0 || isSaving}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium text-sm shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : `Save ${pendingChanges.size} Changes`}
              </button>
            </div>
          </div>

          {/* Alert for pending changes */}
          {pendingChanges.size > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-700 dark:text-blue-400">
                You have <strong>{pendingChanges.size}</strong> pending changes. Click &quot;Save Changes&quot; to apply them nationwide.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<MapPin className="h-6 w-6 text-blue-600" />}
            title="Total Suburbs"
            value="10,247"
            change="+127 this month"
            changeType="positive"
          />
          <StatCard
            icon={<Zap className="h-6 w-6 text-green-600" />}
            title="Active Services"
            value="8,323"
            change="81% coverage"
            changeType="positive"
          />
          <StatCard
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            title="Growth Rate"
            value="+4.2%"
            change="vs last month"
            changeType="positive"
          />
          <StatCard
            icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
            title="Monthly Revenue"
            value="$39.1M"
            change="+$2.3M"
            changeType="positive"
          />
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StateSelector value={selectedState} onChange={setSelectedState} />
            <ServiceTypeSelector value={selectedServices} onChange={setSelectedServices} />
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by suburb name, postcode, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="mb-8">
          <CoverageMap
            state={selectedState}
            services={selectedServices}
            searchQuery={searchQuery}
            onSuburbClick={(suburb) => {
              setSearchQuery(suburb.name);
            }}
          />
        </div>

        {/* Suburb Toggle Table */}
        <SuburbToggleTable
          state={selectedState}
          services={selectedServices}
          searchQuery={searchQuery}
          onToggle={handleToggleSuburb}
          pendingChanges={pendingChanges}
        />

        {/* State Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <StateStatCard title="NSW" value="2,987" total={3247} color="blue" />
          <StateStatCard title="VIC" value="1,847" total={2156} color="green" />
          <StateStatCard title="QLD" value="1,456" total={1892} color="orange" />
          <StateStatCard title="WA" value="847" total={1234} color="purple" />
          <StateStatCard title="SA" value="623" total={847} color="pink" />
          <StateStatCard title="TAS" value="187" total={234} color="yellow" />
          <StateStatCard title="ACT" value="142" total={156} color="indigo" />
          <StateStatCard title="NT" value="234" total={481} color="red" />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change, changeType }: any) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="flex items-center justify-between mb-3">
        <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">{icon}</div>
      </div>
      <p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{title}</p>
      <p
        className={`text-xs font-medium mt-2 ${
          changeType === "positive" ? "text-green-600" : "text-red-600"
        }`}
      >
        {change}
      </p>
    </div>
  );
}

function StateStatCard({ title, value, total, color }: any) {
  const percentage = Math.round((parseInt(value.replace(/,/g, "")) / total) * 100);

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-all">
      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide">
        {title}
      </p>
      <div className="mt-2">
        <p className="text-2xl font-bold text-zinc-900 dark:text-white">{value}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">of {total.toLocaleString()}</p>
      </div>
      <div className="mt-2 w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full bg-gradient-to-r from-${color}-500 to-${color}-600 transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1">{percentage}%</p>
    </div>
  );
}
