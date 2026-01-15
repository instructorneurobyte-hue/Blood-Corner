
import React, { useState } from 'react';
import { EmergencyRequest, BloodGroup } from '../types';
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from '../constants';
import { AlertCircle, Plus, Clock, MapPin, Phone, CheckCircle2 } from 'lucide-react';

export default function EmergencyRequestPage({ 
  requests, 
  onAddRequest,
  onRemoveRequest
}: { 
  requests: EmergencyRequest[],
  onAddRequest: (req: EmergencyRequest) => void,
  onRemoveRequest: (id: string) => void
}) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: 'O+' as BloodGroup,
    district: 'যশোর',
    upazila: 'যশোর সদর',
    hospitalName: '',
    neededDate: '',
    contactNumber: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: EmergencyRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    onAddRequest(newReq);
    setFormData({
      patientName: '',
      bloodGroup: 'O+' as BloodGroup,
      district: 'যশোর',
      upazila: 'যশোর সদর',
      hospitalName: '',
      neededDate: '',
      contactNumber: '',
      description: ''
    });
    setShowForm(false);
    alert('অনুরোধ সফলভাবে পোস্ট করা হয়েছে!');
  };

  const handleResolved = (id: string, name: string) => {
    if (confirm(`${name}-এর জন্য কি রক্ত পাওয়া গেছে? নিশ্চিত করলে এই অনুরোধটি তালিকা থেকে মুছে যাবে।`)) {
      onRemoveRequest(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-3 italic">
            <AlertCircle className="text-red-600" size={32} /> জরুরি রক্তের অনুরোধসমূহ
          </h1>
          <p className="text-gray-600 mt-2 font-medium">আপনার এলাকার রক্তের চাহিদা দেখুন অথবা নতুন অনুরোধ পোস্ট করুন</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-black rounded-2xl shadow-lg hover:bg-red-700 transition-all active:scale-95"
        >
          {showForm ? 'ফরম বন্ধ করুন' : <><Plus size={20} /> অনুরোধ পোস্ট করুন</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-red-50 mb-12 animate-in fade-in slide-in-from-top-4 duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4 italic">রক্তের চাহিদার তথ্য পূরণ করুন</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">রোগীর নাম *</label>
              <input 
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none font-semibold text-slate-900"
                value={formData.patientName}
                onChange={e => setFormData({...formData, patientName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">রক্তের গ্রুপ *</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-black text-slate-900"
                value={formData.bloodGroup}
                onChange={e => setFormData({...formData, bloodGroup: e.target.value as BloodGroup})}
              >
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg} className="text-slate-900">{bg}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">কখন প্রয়োজন? *</label>
              <input 
                required
                type="date"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-semibold text-slate-900"
                value={formData.neededDate}
                onChange={e => setFormData({...formData, neededDate: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">জেলা *</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-slate-900"
                value={formData.district}
                onChange={e => setFormData({...formData, district: e.target.value})}
              >
                {DISTRICTS.map(d => <option key={d} value={d} className="text-slate-900">{d}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">উপজেলা *</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-slate-900"
                value={formData.upazila}
                onChange={e => setFormData({...formData, upazila: e.target.value})}
              >
                {(UPAZILAS[formData.district] || ['সদর']).map(u => <option key={u} value={u} className="text-slate-900">{u}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">হাসপাতালের নাম ও ঠিকানা *</label>
              <input 
                required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-semibold text-slate-900"
                value={formData.hospitalName}
                onChange={e => setFormData({...formData, hospitalName: e.target.value})}
                placeholder="যেমন: যশোর সদর হাসপাতাল"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">যোগাযোগের নাম্বার *</label>
              <input 
                required
                type="tel"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-semibold text-slate-900"
                value={formData.contactNumber}
                onChange={e => setFormData({...formData, contactNumber: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-bold text-gray-700 ml-1">অতিরিক্ত তথ্য (ঐচ্ছিক)</label>
              <input 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-semibold text-slate-900"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="যেমন: ১ ব্যাগ রক্ত প্রয়োজন..."
              />
            </div>
            <div className="md:col-span-3 pt-4">
              <button type="submit" className="w-full py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl hover:bg-red-700 transition-all active:scale-95 text-lg">
                অনুরোধ সাবমিট করুন
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {requests.length === 0 ? (
          <div className="md:col-span-3 bg-white py-24 text-center rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 font-bold text-lg">বর্তমানে কোনো রক্তের অনুরোধ নেই।</p>
          </div>
        ) : (
          requests.map(req => (
            <div key={req.id} className="bg-white rounded-3xl shadow-md border-l-8 border-red-600 overflow-hidden hover:shadow-2xl transition-all flex flex-col h-full group">
              <div className="p-6 flex-grow">
                <div className="flex justify-between items-start mb-5">
                  <h3 className="text-2xl font-black text-gray-900 leading-tight">{req.patientName}</h3>
                  <span className="bg-red-600 text-white px-3.5 py-1 rounded-xl text-sm font-black shadow-sm shrink-0 ml-2">{req.bloodGroup}</span>
                </div>
                <div className="space-y-4 text-gray-700 font-bold">
                  <p className="flex items-center gap-2.5 bg-red-50 p-2 rounded-lg text-red-700"><Clock size={18} /> প্রয়োজন: {req.neededDate}</p>
                  <p className="flex items-center gap-2.5 px-2"><MapPin size={18} className="text-gray-400" /> {req.hospitalName}</p>
                  <p className="flex items-center gap-2.5 px-2"><Phone size={18} className="text-gray-400" /> {req.contactNumber}</p>
                </div>
                {req.description && (
                  <div className="mt-6 p-4 bg-slate-50 rounded-2xl text-sm text-gray-500 italic relative">
                    <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-gray-400 border border-gray-100 rounded">নোট</span>
                    "{req.description}"
                  </div>
                )}
              </div>
              
              <div className="px-6 pb-6 mt-auto space-y-3">
                <button 
                  onClick={() => handleResolved(req.id, req.patientName)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700 border border-green-200 rounded-2xl text-sm font-black hover:bg-green-600 hover:text-white transition-all shadow-sm"
                >
                  <CheckCircle2 size={18} /> রক্ত পাওয়া গেছে
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${req.contactNumber}`} className="flex items-center justify-center gap-2 py-3 bg-slate-800 text-white text-sm font-black rounded-2xl hover:bg-slate-900 transition-all active:scale-95 shadow-lg">
                    <Phone size={16} /> কল দিন
                  </a>
                  <button className="py-3 bg-blue-50 text-blue-700 text-sm font-black rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">শেয়ার করুন</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
