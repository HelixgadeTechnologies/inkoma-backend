"use client";

import { useState } from "react";
import {
  MOCK_ADMIN_KPIS,
  MOCK_MODERATION_REPORTS,
  MOCK_ADMIN_USERS,
} from "@/config/mock-data";
import { AdminUserRecord, ModerationReport } from "@/types";
import {
  ShieldAlert,
  Users,
  BookOpen,
  Eye,
  DollarSign,
  TrendingUp,
  UserCheck,
  Ban,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AdminTab = "overview" | "users" | "moderation";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [users, setUsers] = useState<AdminUserRecord[]>(MOCK_ADMIN_USERS);
  const [reports, setReports] = useState<ModerationReport[]>(MOCK_MODERATION_REPORTS);
  const kpis = MOCK_ADMIN_KPIS;

  const handleRoleToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newRole = u.role === "writer" ? "reader" : "writer";
          return { ...u, role: newRole };
        }
        return u;
      })
    );
  };

  const handleStatusToggle = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === "active" ? "suspended" : "active";
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  const handleResolveReport = (reportId: string, action: "resolved" | "dismissed") => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          return { ...r, status: action };
        }
        return r;
      })
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-300 text-red-900 text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          Inkoma Platform Council
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
          Admin & Moderation Console
        </h1>
        <p className="text-sm text-stone-600">
          Monitor platform metrics, curate Griot privileges, and moderate folklore submissions.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "overview"
              ? "bg-stone-900 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Overview & KPIs
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "users"
              ? "bg-stone-900 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          User Management ({users.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("moderation")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeTab === "moderation"
              ? "bg-stone-900 text-white shadow-sm"
              : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
          Content Moderation Queue ({reports.filter((r) => r.status === "pending").length})
        </button>
      </div>

      {/* Tab 1: Overview KPIs */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Total Users</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                {kpis.totalUsers.toLocaleString()}
              </p>
              <div className="flex items-center gap-2 text-[11px] text-stone-400">
                <span>{kpis.totalWriters} Griots</span>
                <span>•</span>
                <span>{kpis.totalReaders} Readers</span>
              </div>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Folklore Stories</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                {kpis.totalStories.toLocaleString()}
              </p>
              <span className="text-[11px] text-stone-400">{kpis.totalChapters} Published Chapters</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Total Story Reads</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                {kpis.totalReads.toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold">+24% monthly surge</span>
            </div>

            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-xs space-y-1">
              <span className="text-xs text-stone-500 font-semibold">Total Patron Donations</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-serif">
                ${kpis.totalTipsDonatedUsd.toLocaleString()}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold">Paystack direct</span>
            </div>
          </div>

          {/* Quick Council Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-stone-900 text-white rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Sparkles className="w-4 h-4" /> Oral Dialect Digitization
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                94% of stories have verified root traditions. 67% feature community audio narration recorded in Akan, Yoruba, Zulu, or Swahili.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-amber-600" /> Moderation Health
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                1 pending report in the queue. Zero severe lore infringements recorded this cycle.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User Management Table */}
      {activeTab === "users" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4 overflow-hidden">
          <h2 className="text-lg font-bold text-stone-900 font-serif">
            All Registered Members ({users.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-2">Member</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Role</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Stories Authored</th>
                  <th className="py-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-2">
                      <div>
                        <span className="font-bold text-stone-900 block">{user.displayName}</span>
                        <span className="text-[11px] text-stone-400 font-mono">@{user.username}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-2 text-stone-600">{user.email}</td>
                    <td className="py-3.5 px-2">
                      <Badge
                        className={`text-[10px] ${
                          user.role === "writer"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : "bg-stone-100 text-stone-700 border border-stone-200"
                        }`}
                      >
                        {user.role === "writer" ? "Griot Author" : "Reader"}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          user.status === "active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-stone-700 font-medium">
                      {user.storiesAuthored}
                    </td>
                    <td className="py-3.5 px-2 text-right space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleRoleToggle(user.id)}
                        className="text-[11px] h-7 px-2 border-stone-300"
                      >
                        Toggle Griot
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusToggle(user.id)}
                        className={`text-[11px] h-7 px-2 ${
                          user.status === "active"
                            ? "border-red-200 text-red-600 hover:bg-red-50"
                            : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        {user.status === "active" ? "Suspend" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Moderation Queue */}
      {activeTab === "moderation" && (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h2 className="text-lg font-bold text-stone-900 font-serif">
              Flagged Content & Lore Moderation ({reports.length})
            </h2>
          </div>

          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-4 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-100 text-amber-900 text-[10px]">
                      {report.itemType}
                    </Badge>
                    <span className="text-xs font-bold text-stone-900">{report.title}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      report.status === "pending"
                        ? "bg-amber-100 text-amber-900"
                        : report.status === "resolved"
                        ? "bg-emerald-100 text-emerald-900"
                        : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {report.status.toUpperCase()}
                  </span>
                </div>

                <div className="text-xs text-stone-600 space-y-1">
                  <p>
                    <strong className="text-stone-700">Reason for Report:</strong> {report.reason}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Reported by {report.reportedBy} on {report.createdAt}
                  </p>
                </div>

                {report.status === "pending" && (
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-200">
                    <Button
                      size="sm"
                      onClick={() => handleResolveReport(report.id, "resolved")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 px-3 rounded-xl"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Remove Content / Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolveReport(report.id, "dismissed")}
                      className="border-stone-300 text-stone-700 text-xs h-8 px-3 rounded-xl hover:bg-stone-100"
                    >
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Dismiss Report
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
