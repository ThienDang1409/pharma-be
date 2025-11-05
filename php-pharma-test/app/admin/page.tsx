"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminDashboard() {
  const [stats] = useState({
    totalNews: 48,
    totalEvents: 12,
    totalProducts: 156,
    totalUsers: 24,
    pendingApprovals: 5,
    recentUploads: 23,
  });

  const recentActivity = [
    {
      id: 1,
      type: "news",
      action: "created",
      title: "New Product Launch Announcement",
      user: "Admin",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "event",
      action: "updated",
      title: "analytica 2026 Event Details",
      user: "Editor",
      time: "5 hours ago",
    },
    {
      id: 3,
      type: "news",
      action: "deleted",
      title: "Old Press Release",
      user: "Admin",
      time: "1 day ago",
    },
    {
      id: 4,
      type: "product",
      action: "created",
      title: "PTWS 1420 Dissolution Tester",
      user: "Manager",
      time: "2 days ago",
    },
    {
      id: 5,
      type: "event",
      action: "created",
      title: "ACHEMA 2026 Registration",
      user: "Editor",
      time: "3 days ago",
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "created":
        return "text-green-600 bg-green-50";
      case "updated":
        return "text-blue-600 bg-blue-50";
      case "deleted":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "news":
        return "📰";
      case "event":
        return "📅";
      case "product":
        return "📦";
      default:
        return "📄";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                View Site
              </Link>
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total News */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total News</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalNews}
                </p>
              </div>
              <div className="text-5xl">📰</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/news"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                Manage News →
              </Link>
            </div>
          </div>

          {/* Total Events */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Events
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalEvents}
                </p>
              </div>
              <div className="text-5xl">📅</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/events"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                Manage Events →
              </Link>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Products
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="text-5xl">📦</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/products"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                Manage Products →
              </Link>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.totalUsers}
                </p>
              </div>
              <div className="text-5xl">👥</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/users"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                Manage Users →
              </Link>
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-2 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Pending Approvals
                </p>
                <p className="text-3xl font-bold text-orange-600 mt-2">
                  {stats.pendingApprovals}
                </p>
              </div>
              <div className="text-5xl">⏳</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/approvals"
                className="text-orange-600 hover:text-orange-800 text-sm font-semibold"
              >
                View Pending →
              </Link>
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Recent Uploads
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {stats.recentUploads}
                </p>
              </div>
              <div className="text-5xl">🖼️</div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                href="/admin/uploads"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                View Uploads →
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/news/add"
                className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-center transition-colors"
              >
                ➕ Add News Article
              </Link>
              <Link
                href="/admin/events/add"
                className="block w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold text-center transition-colors"
              >
                ➕ Add Event
              </Link>
              <Link
                href="/admin/products/add"
                className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-center transition-colors"
              >
                ➕ Add Product
              </Link>
              <Link
                href="/test-upload"
                className="block w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold text-center transition-colors"
              >
                🖼️ Upload Images
              </Link>
              <Link
                href="/admin/settings"
                className="block w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold text-center transition-colors"
              >
                ⚙️ Settings
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="text-3xl">{getTypeIcon(activity.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${getActionColor(
                          activity.action
                        )}`}
                      >
                        {activity.action.toUpperCase()}
                      </span>
                      <span className="text-xs text-gray-500">
                        by {activity.user}
                      </span>
                    </div>
                    <p className="text-gray-800 font-medium">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <Link
                href="/admin/activity"
                className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
              >
                View All Activity →
              </Link>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            System Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm text-gray-600">API Status</p>
                <p className="font-semibold text-gray-800">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm text-gray-600">Database</p>
                <p className="font-semibold text-gray-800">Connected</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-sm text-gray-600">Storage</p>
                <p className="font-semibold text-gray-800">Available (82%)</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
