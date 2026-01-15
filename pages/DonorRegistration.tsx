
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Donor, BloodGroup } from '../types';
import { BLOOD_GROUPS, DISTRICTS, UPAZILAS } from '../constants';
import { UserPlus, Camera, Upload, X } from 'lucide-react';

export default function DonorRegistration({ onRegister }: { onRegister: (donor: Donor) => void }) {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'O+' as BloodGroup,
    gender: 'Male' as any,
    age: '',
    phone: '',
    district: 'যশোর',
    upazila: 'যশোর সদর',
    lastDonateDate: '',
    donationCount: '0',
    profession: '',
    photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        alert('ছবিটি ১ মেগাবাইটের বেশি বড় হওয়া যাবে না।');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, photo: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newDonor: Donor = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      age: parseInt(formData.age),
      donationCount: parseInt(formData.donationCount) || 0,
      isApproved: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    onRegister(newDonor);
    alert('রেজিস্ট্রেশন সফল হয়েছে! আপনাকে রক্তদাতা তালিকায় যুক্ত করা হয়েছে।');
    navigate('/donors');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-red-600 p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <h1 className="text-4xl font-black mb-4 italic">মানবিক রক্তদাতা নিবন্ধন</h1>
          <p className="opacity-90 font-black text-lg italic tracking-tight uppercase">“আপনার রক্তেই বাঁচবে কারোর শেষ নিঃশ্বাস”</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10">
          <div className="flex flex-col items-center mb-12">
            <div className="relative group">
              <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-8 border-red-50 bg-slate-50 flex items-center justify-center shadow-inner transition-transform group-hover:scale-105 duration-500">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="text-slate-300 w-16 h-16" />
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-red-600 text-white p-4 rounded-2xl shadow-2xl hover:bg-red-700 transition-all active:scale-95 border-4 border-white"
              >
                <Upload size={20} />
              </button>
              {imagePreview && (
                <button 
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-4 -right-4 bg-slate-900 text-white p-2 rounded-xl shadow-lg hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <label className="mt-5 text-xs font-black text-slate-400 uppercase tracking-widest">আপনার ছবি আপলোড করুন (সর্বোচ্চ ১ মেগাবাইট)</label>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">পূর্ণ নাম *</label>
              <input 
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 focus:bg-white outline-none bg-slate-50 text-slate-900 font-black text-lg transition-all"
                placeholder="নাম লিখুন"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">রক্তের গ্রুপ *</label>
              <select 
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 focus:bg-white outline-none bg-slate-50 font-black text-lg text-slate-900 appearance-none transition-all"
              >
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg} className="text-slate-900">{bg}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">লিঙ্গ *</label>
              <div className="flex gap-10 mt-2 ml-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleInputChange} className="w-6 h-6 text-red-600 border-2 border-slate-200" />
                  <span className="text-slate-800 font-black text-lg group-hover:text-red-600 transition-colors">পুরুষ</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleInputChange} className="w-6 h-6 text-red-600 border-2 border-slate-200" />
                  <span className="text-slate-800 font-black text-lg group-hover:text-red-600 transition-colors">নারী</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">বয়স *</label>
              <input 
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 outline-none bg-slate-50 text-slate-900 font-black text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">মোবাইল নাম্বার *</label>
              <input 
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 outline-none bg-slate-50 text-slate-900 font-black text-lg"
                placeholder="০১XXXXXXXXX"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">জেলা *</label>
              <select name="district" value={formData.district} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none bg-slate-50 text-slate-900 font-black text-lg">
                {DISTRICTS.map(d => <option key={d} value={d} className="text-slate-900">{d}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">উপজেলা *</label>
              <select name="upazila" value={formData.upazila} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none bg-slate-50 text-slate-900 font-black text-lg">
                {(UPAZILAS[formData.district] || ['সদর']).map(u => <option key={u} value={u} className="text-slate-900">{u}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">শেষ রক্তদানের তারিখ</label>
              <input type="date" name="lastDonateDate" value={formData.lastDonateDate} onChange={handleInputChange} className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 outline-none bg-slate-50 text-slate-900 font-black text-lg" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">অনুপ্রেরণামূলক বার্তা (ঐচ্ছিক)</label>
              <input 
                name="profession" 
                value={formData.profession} 
                onChange={handleInputChange} 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 focus:border-red-600 outline-none bg-slate-50 text-slate-900 font-bold italic" 
                placeholder="যেমন: রক্তদানে শান্তি পাই..."
              />
            </div>
          </div>

          <div className="mt-12">
            <button type="submit" className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-[1.5rem] shadow-2xl shadow-red-600/30 active:scale-95 text-2xl uppercase italic tracking-tighter">
              নিবন্ধন সম্পন্ন করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
