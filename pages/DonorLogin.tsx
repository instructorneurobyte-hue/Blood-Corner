
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Phone, Key } from 'lucide-react';

export default function DonorLogin({ onLogin }: { onLogin: (phone: string, pin: string) => boolean }) {
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(phone, pin);
    if (success) {
      navigate('/profile');
    } else {
      setError('ভুল মোবাইল নাম্বার অথবা পিন। (অ্যাডমিন: admin/1234)');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-red-600 p-8 text-white text-center">
          <LogIn className="mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold">লগইন করুন</h1>
          <p className="text-red-100 mt-1">আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">{error}</div>}
          
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">মোবাইল নাম্বার / ইউজারনেম</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                placeholder="০১XXXXXXXXX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700">পিন / পাসওয়ার্ড</label>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                placeholder="••••"
                value={pin}
                onChange={e => setPin(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all transform hover:scale-[1.02]"
          >
            অ্যাকাউন্টে প্রবেশ করুন
          </button>

          <p className="text-center text-gray-600 text-sm">
            অ্যাকাউন্ট নেই? <Link to="/register" className="text-red-600 font-bold hover:underline">রেজিস্ট্রেশন করুন</Link>
          </p>
          
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded-lg text-center">
            অ্যাডমিন ডেমো: <strong>admin</strong> / <strong>1234</strong>
          </div>
        </form>
      </div>
    </div>
  );
}
