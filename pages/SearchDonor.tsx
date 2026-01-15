
import React, { useState, useMemo } from 'react';
import { Donor, BloodGroup } from '../types';
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from '../constants';
import { Search, MapPin, Calendar, Phone } from 'lucide-react';

const isAvailable = (lastDate: string) => {
  if (!lastDate) return true;
  const last = new Date(lastDate);
  const today = new Date();
  const diffDays = Math.ceil((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= 120;
};

export default function SearchDonor({ donors, onCall }: { donors: Donor[], onCall: (id: string) => void }) {
  const [filters, setFilters] = useState({
    bloodGroup: '' as BloodGroup | '',
    district: '',
    upazila: ''
  });

  const filteredDonors = useMemo(() => {
    return donors.filter(donor => {
      const matchGroup = !filters.bloodGroup || donor.bloodGroup === filters.bloodGroup;
      const matchDistrict = !filters.district || donor.district === filters.district;
      const matchUpazila = !filters.upazila || donor.upazila === filters.upazila;
      return matchGroup && matchDistrict && matchUpazila && donor.isApproved;
    });
  }, [donors, filters]);

  const handleCall = (id: string, name: string, phone: string, available: boolean) => {
    if (!available) {
      alert('দুঃখিত, এই রক্তদাতা বর্তমানে বিশ্রাম পিরিয়ডে আছেন।');
      return;
    }
    if (confirm(`${name}-কে কল করতে চান? নিশ্চিত করলে তার রক্তদানের সংখ্যা ১ বাড়বে।`)) {
      onCall(id);
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 italic">কাঙ্ক্ষিত রক্তদাতা খুঁজুন</h1>
        <p className="text-gray-600 mt-2 font-medium">ব্লাড গ্রুপ ও এলাকা অনুযায়ী ফিল্টার করুন</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 mb-12 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">রক্তের গ্রুপ</label>
          <select 
            className="w-full p-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-bold text-slate-900"
            value={filters.bloodGroup}
            onChange={e => setFilters({...filters, bloodGroup: e.target.value as BloodGroup})}
          >
            <option value="" className="text-slate-900">সকল গ্রুপ</option>
            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg} className="text-slate-900">{bg}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">জেলা</label>
          <select 
            className="w-full p-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-bold text-slate-900"
            value={filters.district}
            onChange={e => setFilters({...filters, district: e.target.value, upazila: ''})}
          >
            <option value="" className="text-slate-900">সকল জেলা</option>
            {DISTRICTS.map(d => <option key={d} value={d} className="text-slate-900">{d}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500 uppercase ml-1">উপজেলা</label>
          <select 
            className="w-full p-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-bold text-slate-900"
            value={filters.upazila}
            onChange={e => setFilters({...filters, upazila: e.target.value})}
            disabled={!filters.district}
          >
            <option value="" className="text-slate-900">সকল উপজেলা</option>
            {filters.district && (UPAZILAS[filters.district] || []).map(u => <option key={u} value={u} className="text-slate-900">{u}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button 
            onClick={() => setFilters({bloodGroup: '', district: '', upazila: ''})}
            className="w-full p-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors active:scale-95"
          >
            ফিল্টার রিসেট
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDonors.length > 0 ? (
          filteredDonors.map(donor => {
            const available = isAvailable(donor.lastDonateDate);
            return (
              <div key={donor.id} className="bg-white p-5 rounded-3xl shadow-md border border-gray-50 flex gap-4 hover:shadow-xl transition-all">
                <div className="relative shrink-0">
                  <img src={donor.photo} className="w-24 h-24 rounded-2xl object-cover shadow-sm border border-gray-100" />
                  <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-md border border-slate-700">
                    {donor.donationCount || 0} বার
                  </div>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">{donor.name}</h3>
                      <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded-lg font-black text-sm shrink-0 ml-2">{donor.bloodGroup}</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-600 space-y-1">
                      <p className="flex items-center gap-1.5 font-semibold"><MapPin size={12} className="text-red-500" /> {donor.upazila}</p>
                      <p className="flex items-center gap-1.5 font-semibold"><Calendar size={12} className="text-blue-500" /> দান: {donor.lastDonateDate || 'তথ্য নেই'}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${available ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                      {available ? 'রক্তদানে সক্ষম' : 'অপেক্ষমাণ'}
                    </span>
                    <button 
                      onClick={() => handleCall(donor.id, donor.name, donor.phone, available)}
                      className={`p-2 rounded-xl transition-all ${available ? 'bg-slate-800 text-white hover:bg-red-600' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
                    >
                      <Phone size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="md:col-span-3 py-24 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <Search className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 font-bold text-lg">দুঃখিত, কোনো দাতা পাওয়া যায়নি।</p>
          </div>
        )}
      </div>
    </div>
  );
}
