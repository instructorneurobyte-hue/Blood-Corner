
import React, { useMemo } from 'react';
import { Donor, EmergencyRequest, DonationPost } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Droplets, AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

// Fix for line 230 in App.tsx: Update props to include all passed values
export default function AdminDashboard({ 
  donors, 
  requests,
  setDonors,
  setRequests,
  setPosts,
  posts
}: { 
  donors: Donor[], 
  requests: EmergencyRequest[],
  setDonors: React.Dispatch<React.SetStateAction<Donor[]>>,
  setRequests: React.Dispatch<React.SetStateAction<EmergencyRequest[]>>,
  setPosts: React.Dispatch<React.SetStateAction<DonationPost[]>>,
  posts: DonationPost[]
}) {
  const stats = useMemo(() => {
    const bloodGroupCounts = donors.reduce((acc, donor) => {
      acc[donor.bloodGroup] = (acc[donor.bloodGroup] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalDonors: donors.length,
      availableDonors: donors.filter(d => {
        if(!d.lastDonateDate) return true;
        const last = new Date(d.lastDonateDate);
        const today = new Date();
        return (today.getTime() - last.getTime()) / (1000 * 3600 * 24) >= 120;
      }).length,
      pendingRequests: requests.filter(r => r.status === 'Pending').length,
      bloodData: Object.entries(bloodGroupCounts).map(([name, value]) => ({ name, value })),
    };
  }, [donors, requests]);

  const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];

  const handleDeleteDonor = (id: string) => {
    if (confirm('আপনি কি নিশ্চিত?')) {
      const updated = donors.filter(d => d.id !== id);
      setDonors(updated);
      localStorage.setItem('jttc_donors', JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-800 italic">অ্যাডমিন কন্ট্রোল প্যানেল</h1>
        <p className="text-gray-500 font-bold">পুরো সিস্টেমের দাতা ও অনুরোধ ডাটা ব্যবস্থাপনা</p>
      </div>
      
      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Users size={28} /></div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">মোট দাতা</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.totalDonors}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-green-50 text-green-600 rounded-2xl group-hover:bg-green-600 group-hover:text-white transition-all"><CheckCircle size={28} /></div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">প্রস্তুত দাতা</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.availableDonors}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl group-hover:bg-red-600 group-hover:text-white transition-all"><Droplets size={28} /></div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">ব্লাড গ্রুপ সংখ্যা</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.bloodData.length}</h3>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all"><AlertCircle size={28} /></div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">বাকি রিকোয়েস্ট</p>
              <h3 className="text-3xl font-black text-slate-800">{stats.pendingRequests}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Analytics */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 mb-12">
        <h3 className="text-xl font-black mb-10 italic flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div> ব্লাড গ্রুপ অনুযায়ী পরিসংখ্যান
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.bloodData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 'bold'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontWeight: 'bold'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                {stats.bloodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Donor Management Table */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black italic">দাতা ডাটাবেস ব্যবস্থাপনা</h3>
          <span className="text-xs font-black text-slate-400 uppercase bg-white px-4 py-2 rounded-full border border-slate-100">সর্বমোট: {donors.length} জন</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <tr>
                <th className="px-10 py-6">দাতা</th>
                <th className="px-10 py-6">গ্রুপ</th>
                <th className="px-10 py-6">যোগাযোগ</th>
                <th className="px-10 py-6">অবস্থান</th>
                <th className="px-10 py-6 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
              {donors.map(donor => (
                <tr key={donor.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 flex items-center gap-4">
                    <img src={donor.photo} className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform" alt={donor.name} />
                    <span className="text-slate-900">{donor.name}</span>
                  </td>
                  <td className="px-10 py-6"><span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-xl text-xs">{donor.bloodGroup}</span></td>
                  <td className="px-10 py-6 text-slate-500">{donor.phone}</td>
                  <td className="px-10 py-6 text-slate-500">{donor.upazila}</td>
                  <td className="px-10 py-6 text-right">
                    <button 
                      onClick={() => handleDeleteDonor(donor.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all"
                    >
                      <ShieldAlert size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
