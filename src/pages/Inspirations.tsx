import { useState, useEffect, useMemo } from "react";
import { Heart, Bookmark, Share2, Crown, ChevronLeft, Search, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import dailyInspirations from "../content/daily-inspirations.json";

interface Inspiration {
  id: string;
  type: string;
  text: string;
  author?: string;
  tags: string[];
}

export default function Inspirations() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("likedInspirations");
    return saved ? JSON.parse(saved) : [];
  });
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("savedInspirations");
    return saved ? JSON.parse(saved) : [];
  });
  const [isPremium, setIsPremium] = useState(false); // Mock premium status

  useEffect(() => {
    localStorage.setItem("likedInspirations", JSON.stringify(likedIds));
  }, [likedIds]);

  useEffect(() => {
    localStorage.setItem("savedInspirations", JSON.stringify(savedIds));
  }, [savedIds]);

  const tabs = ["All", "Affirmations", "Quotes", "Mindfulness", "Favorites"];

  // Daily selection logic (same as Home)
  const dailyFeatured = useMemo(() => {
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    const index = seed % dailyInspirations.entries.length;
    return dailyInspirations.entries[index] as Inspiration;
  }, []);

  const filteredInspirations = useMemo(() => {
    let list = dailyInspirations.entries as Inspiration[];
    
    if (activeTab === "Affirmations") {
      list = list.filter(item => item.type === "affirmation");
    } else if (activeTab === "Quotes") {
      list = list.filter(item => item.type === "quote");
    } else if (activeTab === "Mindfulness") {
      list = list.filter(item => item.type === "mindfulness_prompt");
    } else if (activeTab === "Favorites") {
      list = list.filter(item => savedIds.includes(item.id));
    }

    return list;
  }, [activeTab, savedIds]);

  const toggleLike = (id: string) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSave = (id: string) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleShare = (text: string) => {
    if (navigator.share) {
      navigator.share({
        title: 'Calm Quest Inspiration',
        text: text,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert("Inspiration copied to clipboard!");
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "affirmation": return "Affirmation";
      case "quote": return "Quote";
      case "mindfulness_prompt": return "Mindfulness";
      default: return type;
    }
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case "affirmation": return "bg-primary-100 text-primary-700";
      case "quote": return "bg-secondary-100 text-secondary-700";
      case "mindfulness_prompt": return "bg-accent-100 text-accent-700";
      default: return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="pb-24 min-h-screen bg-calm-mist/30">
      <header className="px-6 pt-8 mb-6">
        <div className="flex justify-between items-center mb-6">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-neutral-100"
          >
            <ChevronLeft size={20} className="text-neutral-600" />
          </motion.button>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-neutral-100 text-neutral-600">
              <Search size={18} />
            </button>
          </div>
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-heading font-bold text-primary-900 mb-2"
        >
          Inspirations
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-neutral-500 font-body"
        >
          Words to ground your soul and find your center.
        </motion.p>
      </header>

      <div className="px-6 mb-8 sticky top-0 z-30 py-2 bg-calm-mist/80 backdrop-blur-md">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? "bg-primary-600 text-white shadow-md shadow-primary-200" 
                  : "bg-white text-neutral-500 hover:bg-neutral-50 border border-neutral-100"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-6">
        {/* Daily Featured */}
        <AnimatePresence mode="wait">
          {(activeTab === "All" || activeTab === getTypeLabel(dailyFeatured.type)) && (
            <motion.div 
              key="daily-featured"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-primary-800 to-primary-600 rounded-[2.5rem] p-8 text-white mb-8 relative overflow-hidden shadow-xl shadow-primary-100 ring-8 ring-primary-50/50"
            >
              <div className="absolute top-[-20px] right-4 text-[120px] font-heading opacity-10 leading-none pointer-events-none">
                "
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                    Featured Today
                  </span>
                </div>
                <p className={`text-2xl font-heading leading-relaxed mb-6 ${dailyFeatured.type === 'quote' ? 'italic' : ''}`}>
                  "{dailyFeatured.text}"
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <p className="text-sm opacity-90 font-medium">— {dailyFeatured.author || "Daily Wisdom"}</p>
                  <div className="flex gap-5">
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleLike(dailyFeatured.id)}>
                      <Heart size={22} fill={likedIds.includes(dailyFeatured.id) ? "white" : "none"} className={likedIds.includes(dailyFeatured.id) ? "text-white" : "text-white/70"} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleSave(dailyFeatured.id)}>
                      <Bookmark size={22} fill={savedIds.includes(dailyFeatured.id) ? "white" : "none"} className={savedIds.includes(dailyFeatured.id) ? "text-white" : "text-white/70"} />
                    </motion.button>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => handleShare(dailyFeatured.text)}>
                      <Share2 size={22} className="text-white/70" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List of other inspirations */}
        <div className="grid gap-6">
          <AnimatePresence>
            {filteredInspirations.filter(item => item.id !== dailyFeatured.id).map((item, index) => {
              const isLocked = !isPremium && index > 1; // Show first 2 free items + featured

              return (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className={`bg-white rounded-[2rem] p-8 shadow-sm border border-neutral-100 relative overflow-hidden transition-all hover:shadow-md ${
                    isLocked ? "bg-neutral-50/50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${getTypeClass(item.type)}`}>
                      {getTypeLabel(item.type)}
                    </span>
                    {isLocked && (
                      <span className="flex items-center gap-1.5 bg-accent-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-sm">
                        <Crown size={12} /> Premium
                      </span>
                    )}
                  </div>

                  <p className={`text-xl text-neutral-800 font-heading leading-relaxed mb-6 ${item.type === 'quote' ? 'italic' : ''} ${isLocked ? 'blur-[4px] select-none opacity-40' : ''}`}>
                    {isLocked ? "This inspiration is available for Premium members only. Unlock full access to find your calm." : `"${item.text}"`}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-neutral-50">
                    <span className={`text-sm text-neutral-400 font-medium ${isLocked ? 'opacity-0' : ''}`}>— {item.author || "Calm Quest"}</span>
                    {!isLocked && (
                      <div className="flex gap-5">
                        <motion.button 
                          whileTap={{ scale: 0.8 }} 
                          onClick={() => toggleLike(item.id)} 
                          className="text-neutral-300 hover:text-red-400 transition-colors"
                        >
                          <Heart size={20} fill={likedIds.includes(item.id) ? "currentColor" : "none"} className={likedIds.includes(item.id) ? "text-red-400" : ""} />
                        </motion.button>
                        <motion.button 
                          whileTap={{ scale: 0.8 }} 
                          onClick={() => toggleSave(item.id)} 
                          className="text-neutral-300 hover:text-primary-500 transition-colors"
                        >
                          <Bookmark size={20} fill={savedIds.includes(item.id) ? "currentColor" : "none"} className={savedIds.includes(item.id) ? "text-primary-500" : ""} />
                        </motion.button>
                        <motion.button 
                          whileTap={{ scale: 0.8 }} 
                          onClick={() => handleShare(item.text)}
                          className="text-neutral-300 hover:text-secondary-500 transition-colors"
                        >
                          <Share2 size={20} />
                        </motion.button>
                      </div>
                    )}
                  </div>
                  
                  {isLocked && (
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/pricing')}
                        className="bg-primary-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary-200"
                      >
                        Unlock All Inspirations
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredInspirations.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-300">
              <Bookmark size={32} />
            </div>
            <p className="text-neutral-500 font-body">No favorites yet. Save some inspirations to see them here.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
