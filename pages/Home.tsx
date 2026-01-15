
import React from 'react';
import { Link } from 'react-router-dom';
import { Donor } from '../types';
import { UserPlus, Search, PhoneCall, Droplet, Camera } from 'lucide-react';

export default function Home({ donors }: { donors: Donor[] }) {
  const totalDonations = donors.reduce((sum, donor) => sum + (donor.donationCount || 0), 0);
  const successServiceCount = 11 + totalDonations;

  const stats = {
    total: donors.length,
    available: donors.filter(d => {
      if (!d.lastDonateDate) return true;
      const last = new Date(d.lastDonateDate);
      const today = new Date();
      return (today.getTime() - last.getTime()) / (1000 * 3600 * 24) >= 120;
    }).length,
    success: successServiceCount
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[450px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://th.bing.com/th/id/R.4181508fc86dddd6a92f6ee75adc55f3?rik=JJxZpfBoIknZuQ&riu=http%3a%2f%2fwww.edja.in%2fimages%2fblood.jpg&ehk=pAEHT0mIUCu7yeb4tinUGW%2fZra8r4mH%2fSLbFTNwPQRw%3d&risl=&pid=ImgRaw&r=0" 
            alt="Hero Background" 
            className="w-full h-full object-cover object-center filter brightness-[0.3] contrast-[1.1]"
          />
        </div>
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 md:mb-6 italic drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
            যশোর টিটিসি ব্লাড কর্নার
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-6 md:mb-10 font-black drop-shadow-md leading-relaxed opacity-90">
            “রক্ত দিয়ে জীবন বাঁচান” - আমাদের লক্ষ্য হলো রক্তদাতাদের একটি ডিজিটাল নেটওয়ার্ক তৈরি করে দ্রুত রক্তের সংযোগ নিশ্চিত করা।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-black transition-all shadow-xl transform hover:scale-105 active:scale-95 text-center text-lg italic tracking-tight">
              রক্তদাতা রেজিস্ট্রেশন
            </Link>
            <Link to="/emergency" className="w-full sm:w-auto px-10 py-4 bg-white text-red-600 hover:bg-gray-100 rounded-2xl font-black transition-all shadow-xl transform hover:scale-105 active:scale-95 text-center text-lg italic tracking-tight">
              জরুরি রক্ত লাগবে?
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 -mt-24 sm:-mt-32 relative z-20">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-red-600 text-center transition-transform hover:-translate-y-2 group">
            <div className="text-5xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform">{stats.total}</div>
            <div className="text-slate-400 font-black text-xs uppercase tracking-widest">নিবন্ধিত দাতা</div>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-green-500 text-center transition-transform hover:-translate-y-2 group">
            <div className="text-5xl font-black text-green-500 mb-2 group-hover:scale-110 transition-transform">{stats.available}</div>
            <div className="text-slate-400 font-black text-xs uppercase tracking-widest">প্রস্তুত রক্তদাতা</div>
          </div>
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border-t-8 border-blue-500 text-center transition-transform hover:-translate-y-2 group">
            <div className="text-5xl font-black text-blue-500 mb-2 group-hover:scale-110 transition-transform">{stats.success}+</div>
            <div className="text-slate-400 font-black text-xs uppercase tracking-widest">সফল মানবিক সেবা</div>
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center text-slate-800 mb-14 italic uppercase tracking-tighter">আমাদের সেবাসমূহ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link to="/donors" className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 hover:border-red-100 group transition-all hover:-translate-y-3">
            <div className="w-16 h-16 bg-red-50 rounded-[1.5rem] flex items-center justify-center text-red-600 mb-8 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
              <Droplet size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 italic">দাতা তালিকা</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">সব নিবন্ধিত রক্তদাতাদের এলাকাভিত্তিক তালিকা ও কন্টাক্ট ইনফো।</p>
          </Link>
          
          <Link to="/search" className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 hover:border-blue-100 group transition-all hover:-translate-y-3">
            <div className="w-16 h-16 bg-blue-50 rounded-[1.5rem] flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
              <Search size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 italic">রক্ত খুঁজুন</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">ব্লাড গ্রুপ ও উপজেলা অনুযায়ী ফিল্টার করে দাতা খুঁজে নিন।</p>
          </Link>

          <Link to="/emergency" className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 hover:border-orange-100 group transition-all hover:-translate-y-3">
            <div className="w-16 h-16 bg-orange-50 rounded-[1.5rem] flex items-center justify-center text-orange-600 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
              <PhoneCall size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 italic">জরুরি রিকোয়েস্ট</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">রক্তের চাহিদার তথ্য পোস্ট করুন দ্রুত সহযোগিতার জন্য।</p>
          </Link>

          <Link to="/contact" className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 hover:border-indigo-100 group transition-all hover:-translate-y-3">
            <div className="w-16 h-16 bg-indigo-50 rounded-[1.5rem] flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
              <Camera size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-4 italic">গ্যালারি</h3>
            <p className="text-slate-500 font-bold text-sm leading-relaxed">রক্তদানের সুন্দর মুহূর্ত ও মানবিক কার্যক্রমের ছবি।</p>
          </Link>
        </div>
      </section>

      {/* Awareness Section */}
      <section className="bg-slate-900 py-24 overflow-hidden relative">
        <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-600 via-transparent to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-20 relative z-10">
          <div className="flex-1 w-full">
            <div className="relative">
              <div className="absolute -inset-6 bg-red-600/10 blur-[80px] rounded-[4rem]"></div>
              <img 
                src="https://th.bing.com/th/id/OIP.BpEKc33Rwbl4wCaX24CpEQHaEK?w=290&h=180&c=7&r=0&o=7&pid=1.7&rm=3" 
                alt="Awareness" 
                className="rounded-[4rem] shadow-2xl w-full object-cover border-8 border-slate-800 relative z-10 hover:scale-[1.02] transition-transform duration-700" 
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-12 italic leading-tight">কেন <span className="text-red-600">রক্ত</span> দেবেন?</h2>
            <div className="space-y-8">
              {[
                "এক ব্যাগ রক্ত ৩ জন মুমূর্ষু রোগীর প্রাণ বাঁচাতে পারে।",
                "রক্তদান করলে হৃদরোগ ও স্ট্রোকের ঝুঁকি বহুগুণে কমে।",
                "দেহে নতুন রক্তকণিকা তৈরি হয় যা শরীরকে সতেজ রাখে।",
                "এটি একটি শ্রেষ্ঠ ইবাদত ও সর্বোচ্চ মানবিক সেবা।"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg shrink-0">
                    <Droplet size={24} />
                  </div>
                  <p className="text-slate-300 font-black text-xl group-hover:text-white transition-colors leading-snug">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-16">
              <Link to="/register" className="inline-flex items-center gap-4 px-16 py-6 bg-red-600 text-white font-black rounded-[2rem] hover:bg-red-700 transition-all shadow-2xl shadow-red-600/30 active:scale-95 text-2xl italic">
                <UserPlus size={32} /> আজই নিবন্ধন করুন
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
