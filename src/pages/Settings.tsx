import React from 'react';
import { 
  Bell, Shield, Eye, Moon, 
  HelpCircle, Info, ChevronRight, LogOut 
} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sections = [
    {
      title: 'Preferences',
      items: [
        { icon: <Bell size={20} />, label: 'Notifications', value: 'On' },
        { icon: <Moon size={20} />, label: 'Dark Mode', value: 'System' },
        { icon: <Eye size={20} />, label: 'Privacy Mode', value: 'Off' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: <HelpCircle size={20} />, label: 'Help Center', value: null },
        { icon: <Info size={20} />, label: 'About Calm Quest', value: 'v1.0.4' },
        { icon: <Shield size={20} />, label: 'Terms of Service', value: null },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-20">
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-10">
          <h1 className="text-3xl font-heading font-bold text-primary-700">Settings</h1>
          <p className="text-calm-stone text-sm">Customize your experience</p>
        </header>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="text-[10px] font-bold text-calm-stone uppercase tracking-[0.2em] mb-4 ml-2">
                {section.title}
              </h3>
              <div className="bg-white/60 backdrop-blur-sm border border-white rounded-[32px] overflow-hidden">
                {section.items.map((item, j) => (
                  <button 
                    key={j}
                    className={`w-full p-5 flex items-center justify-between hover:bg-white transition-colors text-left ${
                      j !== section.items.length - 1 ? 'border-b border-calm-mist/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                        {item.icon}
                      </div>
                      <span className="font-bold text-primary-700 text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.value && (
                        <span className="text-xs text-calm-stone font-medium">{item.value}</span>
                      )}
                      <ChevronRight size={18} className="text-calm-mist-dark/20" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {isAuthenticated && (
            <button 
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-500 p-5 rounded-[32px] font-bold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors mt-8"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        <p className="text-center text-[10px] text-calm-stone mt-12 opacity-50">
          Made with ♥ for your peace of mind.
        </p>
      </div>
    </div>
  );
}
