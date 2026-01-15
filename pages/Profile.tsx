
import React, { useState } from 'react';
import { Donor } from '../types';
import { Camera, Save, MapPin, Calendar, Smartphone, User, Droplets } from 'lucide-react';

export default function Profile({ donor, onUpdate }: { donor: Donor, onUpdate: (d: Donor) => void }) {
  const [formData, setFormData] = useState({...donor});
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
    alert('প্রোফাইল আপডেট করা হয়েছে!');
  };

  const isAvailable = (lastDate: string) => {
    if (!lastDate) return true;
    const last = new Date(lastDate);
    const today = new Date();
    return (today.getTime() - last.getTime()) / (1000 * 3600 * 24) >= 120;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="h-32 bg-gradient-to-r from-red-600 to-red-400"></div>
        <div className="px-8 pb-8 -mt-16">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-8">
            <div className="relative group">
              <img 
                src={donor.photo} 
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg" 
              />
              <div className="absolute -top-3 -right-3 bg-slate-900 text-white px-3 py-1 rounded-xl text-xs font-black shadow-lg border-2 border-white">
                {donor.donationCount || 0} বার দান করেছেন
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-slate-800 text-white rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} />
              </button>
            </div>
            <div className="flex-grow pb-2">
              <h1 className="text-3xl font-bold text-gray-800">{donor.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm font-bold">{donor.bloodGroup}</span>
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${isAvailable(donor.lastDonateDate) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {isAvailable(donor.lastDonateDate) ? 'রক্তদানে সক্ষম' : 'অপেক্ষমাণ'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              {isEditing ? 'বাতিল করুন' : 'প্রোফাইল এডিট'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-8">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">পূর্ণ নাম</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">মোবাইল নাম্বার</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">রক্তদানের মোট সংখ্যা</label>
                <input type="number" className="w-full p-3 bg-slate-50 border rounded-xl" value={formData.donationCount} onChange={e => setFormData({...formData, donationCount: parseInt(e.target.value) || 0})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">শেষ রক্তদান</label>
                <input type="date" className="w-full p-3 bg-slate-50 border rounded-xl" value={formData.lastDonateDate} onChange={e => setFormData({...formData, lastDonateDate: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">পেশা</label>
                <input className="w-full p-3 bg-slate-50 border rounded-xl" value={formData.profession} onChange={e => setFormData({...formData, profession: e.target.value})} />
              </div>
              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 text-white font-bold rounded-xl shadow-lg hover:bg-red-700 transition-colors">
                  <Save size={20} /> পরিবর্তন সংরক্ষণ করুন
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-700">
                  <Smartphone className="text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold">মোবাইল</p>
                    <p className="font-semibold">{donor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <MapPin className="text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold">ঠিকানা</p>
                    <p className="font-semibold">{donor.upazila}, {donor.district}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <Droplets className="text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold">মোট রক্তদান</p>
                    <p className="font-semibold">{donor.donationCount || 0} বার</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-gray-700">
                  <Calendar className="text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold">শেষ রক্তদান</p>
                    <p className="font-semibold">{donor.lastDonateDate || 'তথ্য নেই'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <User className="text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-bold">পেশা</p>
                    <p className="font-semibold">{donor.profession || 'সাধারণ'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-blue-100">
        <h4 className="font-bold text-blue-800 mb-2 italic">মনে রাখবেন</h4>
        <p className="text-blue-700 text-sm">
          রক্তদান করার পর দয়া করে তারিখটি আপডেট করুন। প্রতিবার সঠিক যোগাযোগের মাধ্যমে রক্তদান সম্পন্ন হলে আপনার প্রোফাইলে রক্তদানের সংখ্যা স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।
        </p>
      </div>
    </div>
  );
}
