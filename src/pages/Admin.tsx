import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, DollarSign, Globe, 
  Search, Filter, MoreHorizontal, Download, 
  ArrowUpRight, ArrowDownRight, User
} from 'lucide-react';
import adminData from '../content/admin-mock-data.json';

export default function Admin() {
  const { summary_stats, users } = adminData;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-6xl mx-auto px-6 pt-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500">Overview of Calm Quest performance and users</p>
          </div>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={18} />
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            label="Total Users" 
            value={summary_stats.total_users} 
            change="+12%" 
            up 
            icon={<Users className="text-blue-600" />}
            bg="bg-blue-50"
          />
          <StatCard 
            label="Active Users" 
            value={summary_stats.active_users} 
            change="+5%" 
            up 
            icon={<TrendingUp className="text-green-600" />}
            bg="bg-green-50"
          />
          <StatCard 
            label="Premium Subscriptions" 
            value={summary_stats.total_premium} 
            change="+8%" 
            up 
            icon={<DollarSign className="text-amber-600" />}
            bg="bg-amber-50"
          />
          <StatCard 
            label="Avg. Session" 
            value={`${summary_stats.avg_session_minutes}m`} 
            change="-2%" 
            icon={<Globe className="text-purple-600" />}
            bg="bg-purple-50"
          />
        </div>

        {/* User Table */}
        <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm mb-10">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <h3 className="font-bold text-slate-900 text-lg">User Management</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                />
              </div>
              <button className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100">
                <Filter size={18} />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Tier</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4">Total Sessions</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {user.avatar_initials}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
                        user.subscription_status === 'active' ? 'bg-green-100 text-green-700' :
                        user.subscription_status === 'trial' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {user.subscription_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-slate-600 capitalize">
                        {user.subscription_tier.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {user.join_date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-slate-700">{user.total_sessions}</span>
                        <div className="flex-1 h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${Math.min(100, (user.total_sessions / 420) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">Showing 20 users</p>
            <div className="flex space-x-2">
              <button disabled className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-400">Previous</button>
              <button disabled className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-400">Next</button>
            </div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Content Management</h3>
          </div>
          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              {['Inspirations', 'Exercises', 'Music'].map((tab) => (
                <button 
                  key={tab}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    tab === 'Inspirations' ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-200">
                      <Globe size={20} className="text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Sample Item #{i}</p>
                      <p className="text-xs text-slate-500">Last edited 2 days ago</p>
                    </div>
                  </div>
                  <button className="text-primary-600 font-bold text-sm hover:underline">Edit</button>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-sm hover:border-primary-300 hover:text-primary-600 transition-all">
                + Add New Content
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, change, up, icon, bg }: any) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 text-xs font-bold ${up ? 'text-green-600' : 'text-slate-400'}`}>
          <span>{change}</span>
          {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        </div>
      </div>
      <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</h4>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
