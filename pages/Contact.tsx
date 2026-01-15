
import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin, Camera, ImagePlus, X, Heart, Loader2, Sparkles, UploadCloud } from 'lucide-react';
import { DonationPost } from '../types';

interface ContactProps {
  posts: DonationPost[];
  onAddPost: (post: DonationPost) => void;
}

export default function Contact({ posts, onAddPost }: ContactProps) {
  const [formData, setFormData] = useState({ donorName: '', message: '' });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Advanced Image Compression
  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_DIM = 1000; 
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height *= MAX_DIM / width;
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width *= MAX_DIM / height;
            height = MAX_DIM;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        // Reduced quality to fit LocalStorage quotas
        resolve(canvas.toDataURL('image/jpeg', 0.5));
      };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (files.length + imagePreviews.length > 2) {
      alert('একসাথে সর্বোচ্চ ২টি ছবি যোগ করা যাবে।');
      return;
    }

    setIsProcessing(true);
    try {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        const base64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        const compressed = await compressImage(base64);
        newImages.push(compressed);
      }
      setImagePreviews(prev => [...prev, ...newImages]);
    } catch (err) {
      console.error(err);
      alert('ছবি প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreviews.length === 0) {
      alert('অনুগ্রহ করে অন্তত একটি ছবি যুক্ত করুন।');
      return;
    }
    
    try {
      const newPost: DonationPost = {
        id: Math.random().toString(36).substr(2, 9),
        donorName: formData.donorName,
        message: formData.message,
        images: imagePreviews,
        date: new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      onAddPost(newPost);
      setFormData({ donorName: '', message: '' });
      setImagePreviews([]);
      alert('আপনার স্মৃতি মেমোরি ওয়ালে যোগ হয়েছে!');
    } catch (err) {
      alert('মেমোরি সেভ করতে সমস্যা হচ্ছে (হয়তো ব্রাউজারের মেমোরি ফুল)। কিছু আগের পোস্ট ডিলিট করতে পারেন।');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider mb-8">
            <Sparkles size={14} /> Memories Last Forever
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 italic leading-tight">
            আমাদের <span className="text-red-600">মেমোরি ওয়াল</span> - রক্তদানের স্মৃতি
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
            আপনার মহৎ কাজের স্মৃতিগুলো এখানে শেয়ার করুন। আপনার একটি ছবি অন্যদের রক্তদানে উৎসাহিত করবে। আপনার শেয়ার করা স্মৃতি এই ওয়ালে স্থায়ীভাবে জমা থাকবে।
          </p>
          
          <div className="space-y-4">
             <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
               <div className="w-12 h-12 bg-red-50 text-red-600 flex items-center justify-center rounded-xl shrink-0"><Phone size={24} /></div>
               <div>
                 <p className="text-[10px] text-slate-400 font-black uppercase">জরুরি সেবা</p>
                 <p className="text-slate-800 font-black text-lg">০১৯৪৮২১৯১৫১</p>
               </div>
             </div>
             <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 flex items-center justify-center rounded-xl shrink-0"><MapPin size={24} /></div>
               <div>
                 <p className="text-[10px] text-slate-400 font-black uppercase">অবস্থান</p>
                 <p className="text-slate-800 font-black text-lg">যশোর টিটিসি, যশোর</p>
               </div>
             </div>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl border border-red-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
          <h3 className="text-2xl font-black text-gray-800 mb-8 italic">স্মৃতি শেয়ার করার ফরম</h3>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">আপনার নাম</label>
              <input 
                required 
                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl outline-none font-bold text-slate-900 transition-all placeholder:text-gray-300" 
                placeholder="নাম লিখুন" 
                value={formData.donorName} 
                onChange={e => setFormData({...formData, donorName: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">অনুভূতি বা বার্তা</label>
              <textarea 
                required 
                rows={3} 
                className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-red-500 focus:bg-white rounded-2xl outline-none font-bold text-slate-900 transition-all placeholder:text-gray-300" 
                placeholder="রক্তদান নিয়ে আপনার কথা..." 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase ml-1">ছবি আপলোড (সর্বোচ্চ ২টি)</label>
              <div className="flex flex-wrap gap-4">
                {imagePreviews.length < 2 && (
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()} 
                    disabled={isProcessing}
                    className="w-24 h-24 bg-red-50 border-2 border-dashed border-red-200 rounded-2xl flex flex-col items-center justify-center text-red-600 hover:bg-red-100 transition-all active:scale-95 disabled:opacity-50 group"
                  >
                    {isProcessing ? <Loader2 className="animate-spin" /> : (
                      <>
                        <UploadCloud size={32} className="group-hover:-translate-y-1 transition-transform" />
                        <span className="text-[8px] font-black mt-1">ছবি দিন</span>
                      </>
                    )}
                  </button>
                )}
                
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative w-24 h-24 group">
                    <img src={src} className="w-full h-full object-cover rounded-2xl border-2 border-red-100 shadow-md transition-transform group-hover:rotate-2" alt="Preview" />
                    <button 
                      type="button" 
                      onClick={() => removeImage(idx)} 
                      className="absolute -top-2 -right-2 bg-slate-900 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors z-20"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" multiple onChange={handleImageChange} />
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className="w-full py-4 bg-red-600 text-white font-black rounded-2xl shadow-xl hover:bg-red-700 hover:shadow-red-100 transition-all active:scale-95 text-lg disabled:opacity-50"
            >
              ওয়াল-এ পোস্ট করুন
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-12">
        <div className="flex items-center justify-between border-b-4 border-red-600/10 pb-6">
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3 italic">
            <Heart className="text-red-600 fill-red-600" /> আমাদের মেমোরি ওয়াল
          </h2>
          <span className="bg-red-600 text-white px-5 py-1.5 rounded-full text-sm font-black shadow-lg">{posts.length}টি স্মৃতি</span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
            <Camera className="mx-auto text-slate-100 mb-6" size={100} />
            <p className="text-slate-400 font-black text-xl">এখনও কোনো মেমোরি যোগ করা হয়নি।</p>
            <button onClick={() => window.scrollTo(0,0)} className="mt-4 text-red-600 font-black hover:underline">প্রথম পোস্টটি আপনিই করুন</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-[2.5rem] shadow-lg overflow-hidden border border-slate-50 flex flex-col group hover:shadow-2xl transition-all duration-500">
                <div className={`grid ${post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} gap-0.5 h-80 overflow-hidden bg-slate-100 relative`}>
                   <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur px-3 py-1 rounded-lg shadow-sm border border-white">
                      <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest">{post.date}</p>
                   </div>
                  {post.images.map((img, i) => (
                    <img key={i} src={img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  ))}
                </div>
                <div className="p-8">
                  <h4 className="font-black text-slate-900 text-xl mb-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div> {post.donorName}
                  </h4>
                  <p className="text-slate-600 italic font-bold leading-relaxed">"{post.message}"</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
