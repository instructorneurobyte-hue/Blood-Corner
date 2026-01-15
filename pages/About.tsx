
import React from 'react';
import { Target, Heart, Award, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 italic border-b-4 border-red-600 inline-block pb-2">আমাদের সম্পর্কে</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          যশোর টিটিসি ব্লাড কর্নার হলো একটি নির্ভরযোগ্য স্বেচ্ছাসেবী রক্তদাতা প্ল্যাটফর্ম। যেখানে বাংলাদেশের প্রতিটি জেলার রক্তদাতারা স্বেচ্ছায় রেজিস্ট্রেশন করতে পারে এবং রক্তের প্রয়োজনে রক্তগ্রহীতা তাদেরকে সহজে খুঁজে পায়। আমরা সম্পূর্ণ বিনামূল্যে সেবা প্রদান করি এবং মানবিকতার ভিত্তিতে কাজ করি।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
        <div className="flex justify-center bg-white rounded-3xl p-4 shadow-xl border border-gray-100">
          <img 
            src="https://th.bing.com/th/id/OIP.lYNbN1JUrvND6LoFkCR39QHaKf?w=189&h=267&c=7&r=0&o=7&pid=1.7&rm=3" 
            alt="Bangladesh Map" 
            className="rounded-2xl w-full h-auto max-h-[550px] object-contain transition-transform hover:scale-[1.02] duration-300" 
          />
        </div>
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm">
              <Target size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">আমাদের লক্ষ্য (Mission)</h3>
              <p className="text-gray-600">রক্তের অভাবে যেন কেউ মারা না যায়, সেই লক্ষ্যকে সামনে রেখে আমরা কাজ করে যাচ্ছি। প্রতিটি মানুষের জন্য জরুরি মুহূর্তে রক্তের সংস্থান সহজ করাই আমাদের মূল ব্রত।</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
              <Heart size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">আমাদের ভিশন (Vision)</h3>
              <p className="text-gray-600">সারা বাংলাদেশে একটি বিশাল রক্তদাতা নেটওয়ার্ক তৈরি করা যেখানে মানুষ সহজেই একে অপরের প্রয়োজনে এগিয়ে আসবে।</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-12 italic">কেন আমাদের সাথে থাকবেন?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Award className="mx-auto text-red-500" size={48} />
            <h4 className="text-xl font-bold">নিরাপদ ও নির্ভরযোগ্য</h4>
            <p className="text-slate-400">আমরা দাতার সঠিক তথ্য ও তাদের স্বাস্থ্য বিষয়ক তথ্যের সত্যতা যাচাই করি।</p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="mx-auto text-blue-500" size={48} />
            <h4 className="text-xl font-bold">সম্পূর্ণ বিনামূল্যে</h4>
            <p className="text-slate-400">রক্তদান বা রক্ত সংগ্রহের জন্য কোনো প্রকার চার্জ বা ফি আমরা গ্রহণ করি না।</p>
          </div>
          <div className="space-y-4 flex flex-col items-center">
            <div className="p-2 bg-green-500/10 rounded-full mb-2">
               <Users className="text-green-500" size={48} />
            </div>
            <h4 className="text-xl font-bold">বিশাল নেটওয়ার্ক</h4>
            <p className="text-slate-400">হাজারো রক্তদাতার বিশাল ভাণ্ডার নিয়ে আমরা সদা প্রস্তুত আপনার সেবায়।</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const Users = ({ className, size }: { className?: string, size?: number }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
