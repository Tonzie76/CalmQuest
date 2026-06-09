import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Shield, ArrowRight } from 'lucide-react';
import pricingData from '../content/pricing-copy.json';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const { user, upgradeTier, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { plans, trial, faq } = pricingData;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (tier: string) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    if (tier === 'free') {
      navigate('/');
      return;
    }

    setIsProcessing(true);
    // Mock Stripe Checkout
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);

    upgradeTier(tier as any);
    alert(`Successfully upgraded to ${tier.replace('_', ' ')}!`);
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-calm-mist/30 pb-20">
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
          <p className="text-primary-700 font-bold">Securely connecting to Stripe...</p>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <header className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold text-calm-green-dark mb-4"
          >
            {trial.headline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-calm-mist-dark/70 text-lg max-w-2xl mx-auto"
          >
            {trial.body}
          </motion.p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Free Plan */}
          <PlanCard 
            plan={plans.free} 
            isCurrent={user?.tier === 'free'}
            onSelect={() => handleSubscribe('free')}
          />
          
          {/* Monthly Plan */}
          <PlanCard 
            plan={plans.premium_monthly} 
            isCurrent={user?.tier === 'premium_monthly'}
            highlighted
            onSelect={() => handleSubscribe('premium_monthly')}
          />
          
          {/* Yearly Plan */}
          <PlanCard 
            plan={plans.premium_yearly} 
            isCurrent={user?.tier === 'premium_yearly'}
            onSelect={() => handleSubscribe('premium_yearly')}
          />
        </div>

        {/* FAQ Section */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-calm-green-dark mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faq.map((item, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm border border-white p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-calm-green-dark mb-2">{item.question}</h3>
                <p className="text-sm text-calm-mist-dark/70 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function PlanCard({ plan, highlighted, isCurrent, onSelect }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`relative bg-white/80 backdrop-blur-md border rounded-[32px] p-8 flex flex-col shadow-xl ${
        highlighted ? 'border-calm-green ring-4 ring-calm-green/5' : 'border-white'
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-calm-green text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          {plan.badge}
        </div>
      )}
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-calm-green-dark mb-1">{plan.name}</h3>
        <div className="flex items-baseline space-x-1">
          <span className="text-3xl font-serif font-bold text-calm-green-dark">{plan.price}</span>
          <span className="text-sm text-calm-mist-dark/50">{plan.period}</span>
        </div>
        <p className="text-xs text-calm-mist-dark/60 mt-4 leading-relaxed">{plan.description}</p>
      </div>

      <div className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature: any, i: number) => (
          <div key={i} className="flex items-start space-x-3">
            <div className={`mt-0.5 flex-shrink-0 ${feature.included ? 'text-calm-green' : 'text-calm-mist-dark/20'}`}>
              {feature.included ? <Check size={16} strokeWidth={3} /> : <div className="w-4 h-4" />}
            </div>
            <span className={`text-xs ${feature.included ? 'text-calm-mist-dark/80' : 'text-calm-mist-dark/30 italic'}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={onSelect}
        disabled={isCurrent}
        className={`w-full py-4 rounded-2xl font-bold text-sm transition-all flex items-center justify-center space-x-2 ${
          isCurrent 
            ? 'bg-calm-mist-dark/10 text-calm-mist-dark/40 cursor-default'
            : highlighted
              ? 'bg-calm-green text-white shadow-lg shadow-calm-green/20 hover:bg-calm-green-dark active:scale-95'
              : 'bg-white border border-calm-mist/20 text-calm-green-dark hover:bg-calm-mist/10 active:scale-95 shadow-sm'
        }`}
      >
        <span>{isCurrent ? 'Current Plan' : plan.cta}</span>
        {!isCurrent && <ArrowRight size={16} />}
      </button>
    </motion.div>
  );
}
