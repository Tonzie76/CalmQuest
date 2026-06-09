import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Github } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, isLogin ? 'User' : name);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-calm-mist/30 flex flex-col justify-center py-12 px-6">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-calm-green rounded-3xl mx-auto mb-6 flex items-center justify-center text-white shadow-xl shadow-calm-green/20"
          >
            <Lock size={28} />
          </motion.div>
          <h2 className="text-3xl font-serif font-bold text-calm-green-dark">
            {isLogin ? 'Welcome back' : 'Join Calm Quest'}
          </h2>
          <p className="text-calm-mist-dark/60 mt-2">
            {isLogin ? 'Continue your journey to daily peace' : 'Start your 7-day free trial today'}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg border border-white p-8 rounded-[32px] shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-calm-green-dark uppercase tracking-wider ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-calm-mist-dark/30" size={18} />
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white border border-calm-mist/20 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-calm-green/20 transition-all"
                    placeholder="Emma Richardson"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-calm-green-dark uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-calm-mist-dark/30" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-calm-mist/20 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-calm-green/20 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-calm-green-dark uppercase tracking-wider ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-calm-mist-dark/30" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-calm-mist/20 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-calm-green/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-calm-green text-white py-4 rounded-2xl font-bold shadow-lg shadow-calm-green/20 hover:bg-calm-green-dark active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-calm-mist/10 text-center">
            <p className="text-sm text-calm-mist-dark/60 mb-4">Or continue with</p>
            <div className="flex space-x-4">
              <button className="flex-1 flex items-center justify-center space-x-2 bg-white border border-calm-mist/20 py-3 rounded-2xl hover:bg-calm-mist/5 transition-colors">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="" />
                <span className="text-xs font-bold">Google</span>
              </button>
              <button className="flex-1 flex items-center justify-center space-x-2 bg-white border border-calm-mist/20 py-3 rounded-2xl hover:bg-calm-mist/5 transition-colors">
                <Github size={16} />
                <span className="text-xs font-bold">GitHub</span>
              </button>
            </div>
          </div>
        </motion.div>

        <p className="mt-8 text-center text-sm text-calm-mist-dark/60">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-calm-green font-bold hover:underline"
          >
            {isLogin ? 'Sign up free' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
