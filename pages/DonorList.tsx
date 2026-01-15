
import React from 'react';
import { Donor } from '../types';
import { MapPin, Calendar, Phone, Briefcase } from 'lucide-react';

const isAvailable = (lastDate: string) => {
  if (!lastDate) return true; // যদি তারিখ না থাকে, তবে তিনি সক্ষম
  const last = new Date(lastDate);
  const today = new Date();
  const diffTime = today.getTime() - last.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 120;
};

const DonorCard: React.FC<{ donor: Donor, onCall: (id: string) => void }> = ({ donor, onCall }) => {
  const available = isAvailable(donor.lastDonateDate);
  
  const handleCallClick = () => {
    if (!available) {
      alert('দুঃখিত, এই রক্তদাতা বর্তমানে বিশ্রাম পিরিয়ডে আছেন। ১২০ দিন পর আবার চেষ্টা করুন।');
      return;
    }
    
    if (confirm(`${donor.name}-কে কল করতে চান? কল করলে তিনি ১২০ দিনের জন্য তালিকা থেকে 'অপেক্ষমাণ' হয়ে যাবেন এবং তার রক্তদানের সংখ্যা ১ বাড়বে।`)) {
      onCall(donor.id);
      window.location.href = `tel:${donor.phone}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex p-5 gap-4">
        <div className="flex-shrink-0 relative">
          <img src={donor.photo} alt={donor.name} className="w-24 h-24 rounded-lg object-cover border-2 border-gray-50 shadow-sm" />
          {/* Donation Count Badge */}
          <div className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-md border border-slate-700">
            {donor.donationCount || 0} বার
          </div>
          <div className="mt-2 text-center">
            <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold ${available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {available ? 'রক্তদানে সক্ষম' : 'এখন সম্ভব নয়'}
            </span>
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-800 leading-tight">{donor.name}</h3>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-black shrink-0 ml-2">{donor.bloodGroup}</span>
          </div>
          <div className="mt-3 space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2 font-medium"><MapPin size={14} className="text-red-400" /> {donor.upazila}, {donor.district}</p>
            <p className="flex items-center gap-2 font-medium"><Calendar size={14} className="text-blue-400" /> শেষ রক্তদান: {donor.lastDonateDate || 'তথ্য নেই'}</p>
            {donor.profession && <p className="flex items-center gap-2 font-medium"><Briefcase size={14} className="text-slate-400" /> {donor.profession}</p>}
          </div>
          <button 
            onClick={handleCallClick}
            disabled={!available}
            className={`mt-4 flex items-center justify-center gap-2 w-full py-2 text-sm font-bold rounded-lg transition-colors ${
              available 
                ? 'bg-slate-800 text-white hover:bg-slate-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-75'
            }`}
          >
            <Phone size={14} /> {available ? 'যোগাযোগ করুন' : 'কল করা সম্ভব নয়'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DonorList({ donors, onCall }: { donors: Donor[], onCall: (id: string) => void }) {
  const approvedDonors = donors.filter(d => d.isApproved);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">রক্তদাতা তালিকা</h1>
          <p className="text-gray-600">আমাদের নিবন্ধিত সকল মানবিক রক্তদাতাদের তালিকা</p>
        </div>
        <div className="bg-red-50 px-4 py-2 rounded-lg text-red-600 font-bold border border-red-100">
          মোট দাতা: {approvedDonors.length} জন
        </div>
      </div>

      {approvedDonors.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">বর্তমানে কোনো দাতা নিবন্ধিত নেই।</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedDonors.map(donor => (
            <DonorCard key={donor.id} donor={donor} onCall={onCall} />
          ))}
        </div>
      )}
    </div>
  );
}
