import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, Settings, Award, Calendar, 
  ChevronRight, LogOut, CreditCard, Sparkles 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    navigate('/auth');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-20">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-serif font-bold text-calm-green-dark">My Profile</h1>
          <button className="p-2 bg-white rounded-full text-calm-mist-dark/40 shadow-sm">
            <Settings size={20} />
          </button>
        </header>

        {/* User Card */}
        <section className="bg-white/80 backdrop-blur-lg border border-white p-8 rounded-[32px] shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
               user.tier === 'free' ? 'bg-calm-mist/20 text-calm-mist-dark/60' : 'bg-amber-100 text-amber-600'
             }`}>
               {user.tier.replace('_', ' ')}
             </span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-calm-green rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
              {user.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-calm-green-dark">{user.name}</h2>
            <p className="text-calm-mist-dark/60 text-sm">{user.email}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-calm-mist/10 text-center">
            <div>
              <p className="text-xl font-bold text-calm-green">1</p>
              <p className="text-[10px] text-calm-mist-dark/40 uppercase font-bold tracking-wider">Day Streak</p>
            </div>
            <div>
              <p className="text-xl font-bold text-calm-green">0</p>
              <p className="text-[10px] text-calm-mist-dark/40 uppercase font-bold tracking-wider">Sessions</p>
            </div>
            <div>
              <p className="text-xl font-bold text-calm-green">0</p>
              <p className="text-[10px] text-calm-mist-dark/40 uppercase font-bold tracking-wider">Minutes</p>
            </div>
          </div>
        </section>

        {/* Action List */}
        <div className="space-y-4">
          {user.tier === 'free' && (
            <Link to="/pricing" className="block bg-gradient-to-br from-amber-400 to-amber-600 p-5 rounded-[24px] text-white shadow-lg shadow-amber-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">Upgrade to Premium</h3>
                    <p className="text-white/80 text-[11px]">Unlock full access to Calm Quest</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-white/60" />
              </div>
            </Link>
          )}

          <ProfileLink icon={<Award size={20} />} label="My Achievements" sub="View badges and milestones" />
          <ProfileLink icon={<Calendar size={20} />} label="Peace History" sub="Your daily progress log" />
          <ProfileLink icon={<CreditCard size={20} />} label="Subscription" sub="Manage your plan and billing" />
          
          <button 
            onClick={handleLogout}
            className="w-full bg-white/60 backdrop-blur-sm border border-white p-5 rounded-[24px] flex items-center space-x-4 text-left text-red-500 hover:bg-red-50 transition-colors"
          >
            <div className="w-10 h-10 bg-red-50 rounded-2xl flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <span className="font-bold text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfileLink({ icon, label, sub }: any) {
  return (
    <button className="w-full bg-white/60 backdrop-blur-sm border border-white p-5 rounded-[24px] flex items-center justify-between hover:bg-white hover:shadow-md transition-all text-left">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-calm-green/10 rounded-2xl flex items-center justify-center text-calm-green">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-calm-green-dark text-sm">{label}</h3>
          <p className="text-calm-mist-dark/60 text-[11px]">{sub}</p>
        </div>
      </div>
      <ChevronRight size={18} className="text-calm-mist-dark/20" />
    </button>
  );
}
