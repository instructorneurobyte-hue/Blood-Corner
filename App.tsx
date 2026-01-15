
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Donor, EmergencyRequest, DonationPost } from './types';
import Home from './pages/Home';
import About from './pages/About';
import DonorRegistration from './pages/DonorRegistration';
import DonorList from './pages/DonorList';
import SearchDonor from './pages/SearchDonor';
import EmergencyRequestPage from './pages/EmergencyRequestPage';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import { Menu, X, Droplets, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'হোম', path: '/' },
    { name: 'দাতা তালিকা', path: '/donors' },
    { name: 'রক্ত খুঁজুন', path: '/search' },
    { name: 'জরুরি রক্ত', path: '/emergency' },
    { name: 'গ্যালারি', path: '/contact' },
    { name: 'আমাদের সম্পর্কে', path: '/about' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="p-1.5 bg-red-50 rounded-lg">
                <Droplets className="text-red-600 w-7 h-7" />
              </span>
              <span className="text-xl font-bold text-gray-800 hidden sm:block">যশোর টিটিসি ব্লাড কর্নার</span>
              <span className="text-xl font-bold text-gray-800 sm:hidden">JTTC Blood</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                  location.pathname === link.path ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/register" className="ml-4 px-5 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95">
              দাতা হন
            </Link>
            <Link to="/admin" className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="অ্যাডমিন ও সিঙ্ক">
              <ShieldCheck size={20} />
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-red-600 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 shadow-xl">
          <div className="px-4 pt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  location.pathname === link.path ? 'text-red-600 bg-red-50' : 'text-gray-700 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/register" 
              onClick={() => setIsOpen(false)} 
              className="block px-4 py-3 text-base font-bold text-center text-white bg-red-600 rounded-xl mt-4"
            >
              রক্তদাতা হিসেবে নিবন্ধন
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div className="space-y-4">
        <h3 className="text-2xl font-bold flex items-center gap-2 italic">
          <Droplets className="text-red-500" /> যশোর টিটিসি ব্লাড কর্নার
        </h3>
        <p className="text-slate-300 leading-relaxed font-medium">
          একটি রক্তদান ও সেবামূলক অনলাইন প্ল্যাটফর্ম। আমাদের লক্ষ্য হলো রক্তের প্রয়োজনে দাতা ও গ্রহীতার মধ্যে দ্রুত সংযোগ স্থাপন করে মানবতা রক্ষা করা।
        </p>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-red-500">প্রয়োজনীয় লিংক</h4>
        <ul className="space-y-4 text-slate-300 font-bold">
          <li>
            <Link to="/donors" className="hover:text-red-500 transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> রক্তদাতা তালিকা
            </Link>
          </li>
          <li>
            <Link to="/emergency" className="hover:text-red-500 transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> জরুরি রক্তের অনুরোধ
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-500 transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> রক্তদানের গ্যালারি
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-red-500 transition-colors flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> আমাদের লক্ষ্য
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-bold mb-6 text-red-500">যোগাযোগ</h4>
        <div className="text-slate-100 space-y-5 font-bold">
          <a href="tel:01948219151" className="flex items-center gap-4 hover:text-red-400 transition-colors">
            <Phone size={20} className="text-red-500" /> ০১৯৪৮২১৯১৫১
          </a>
          <a href="mailto:jessoreblood@gmail.com" className="flex items-center gap-4 hover:text-red-400 transition-colors">
            <Mail size={20} className="text-red-500" /> jessoreblood@gmail.com
          </a>
          <div className="flex items-center gap-4 italic">
            <MapPin size={20} className="text-red-500" /> যশোর টিটিসি, যশোর
          </div>
        </div>
      </div>
    </div>
    <div className="text-center mt-16 pt-8 border-t border-slate-800 text-slate-500 text-sm font-medium">
      &copy; 2025 যশোর টিটিসি ব্লাড কর্নার। সর্বস্বত্ব সংরক্ষিত।
    </div>
  </footer>
);

export default function App() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<EmergencyRequest[]>([]);
  const [posts, setPosts] = useState<DonationPost[]>([]);

  useEffect(() => {
    try {
      const savedDonors = localStorage.getItem('jttc_donors');
      if (savedDonors) setDonors(JSON.parse(savedDonors));

      const savedRequests = localStorage.getItem('jttc_requests');
      if (savedRequests) setRequests(JSON.parse(savedRequests));

      const savedPosts = localStorage.getItem('jttc_donation_posts');
      if (savedPosts) setPosts(JSON.parse(savedPosts));
    } catch (e) {
      console.error("Failed to load from localstorage", e);
    }
  }, []);

  const handleRegister = (newDonor: Donor) => {
    const updated = [...donors, newDonor];
    setDonors(updated);
    localStorage.setItem('jttc_donors', JSON.stringify(updated));
  };

  const addEmergencyRequest = (req: EmergencyRequest) => {
    const updated = [req, ...requests];
    setRequests(updated);
    localStorage.setItem('jttc_requests', JSON.stringify(updated));
  };

  const removeEmergencyRequest = (id: string) => {
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    localStorage.setItem('jttc_requests', JSON.stringify(updated));
  };

  const handleAddPost = (post: DonationPost) => {
    const updated = [post, ...posts];
    setPosts(updated);
    localStorage.setItem('jttc_donation_posts', JSON.stringify(updated));
  };

  const handleDonorCall = (id: string) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updatedDonors = donors.map(d => 
      d.id === id ? { 
        ...d, 
        lastDonateDate: todayStr,
        donationCount: (d.donationCount || 0) + 1 
      } : d
    );
    setDonors(updatedDonors);
    localStorage.setItem('jttc_donors', JSON.stringify(updatedDonors));
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home donors={donors} />} />
            <Route path="/about" element={<About />} />
            <Route path="/donors" element={<DonorList donors={donors} onCall={handleDonorCall} />} />
            <Route path="/search" element={<SearchDonor donors={donors} onCall={handleDonorCall} />} />
            <Route path="/emergency" element={<EmergencyRequestPage requests={requests} onAddRequest={addEmergencyRequest} onRemoveRequest={removeEmergencyRequest} />} />
            <Route path="/register" element={<DonorRegistration onRegister={handleRegister} />} />
            <Route path="/contact" element={<Contact posts={posts} onAddPost={handleAddPost} />} />
            <Route path="/admin" element={<AdminDashboard donors={donors} requests={requests} setDonors={setDonors} setRequests={setRequests} setPosts={setPosts} posts={posts} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
