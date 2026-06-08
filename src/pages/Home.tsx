import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import dailyInspirations from "../content/daily-inspirations.json";
import bgInspirations from "../assets/images/bg-inspirations.png";
import bgGames from "../assets/images/bg-games.png";
import bgMusic from "../assets/images/bg-music.png";

export default function Home() {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState("");
  const [inspiration, setInspiration] = useState<{ text: string; author?: string } | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Simple "daily" selection: use date as seed
    const today = new Date().toDateString();
    let seed = 0;
    for (let i = 0; i < today.length; i++) {
      seed += today.charCodeAt(i);
    }
    const index = seed % dailyInspirations.entries.length;
    const entry = dailyInspirations.entries[index];
    setInspiration({
      text: entry.text,
      author: (entry as any).author || "Daily Affirmation",
    });
  }, []);

  const pillars = [
    {
      id: "inspirations",
      name: "Inspirations",
      desc: "Daily affirmations",
      icon: "💭",
      color: "bg-[#fcf4e8]",
      bgImage: bgInspirations,
      path: "/inspirations",
    },
    {
      id: "games",
      name: "Games",
      desc: "Breathing & focus",
      icon: "🧘",
      color: "bg-[#eef7f0]",
      bgImage: bgGames,
      path: "/games",
    },
    {
      id: "music",
      name: "Music",
      desc: "Calming sounds",
      icon: "🎵",
      color: "bg-[#eef4ff]",
      bgImage: bgMusic,
      path: "/music",
    },
    {
      id: "progress",
      name: "Progress",
      desc: "Your journey",
      icon: "📊",
      color: "bg-[#f5ebe0]",
      path: "/progress",
    },
  ];

  return (
    <div className="px-6 pt-4">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary-700 leading-tight">{greeting}</h2>
          <p className="text-sm text-neutral-600">Let's find your calm today</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-400 flex items-center justify-center text-white font-semibold">
          A
        </div>
      </header>

      <section className="bg-gradient-to-br from-[#f5ebe0] to-[#eef7f0] rounded-3xl p-5 mb-6 border border-white/60">
        <h3 className="text-sm font-medium text-neutral-600 mb-3 font-body">
          How are you feeling right now?
        </h3>
        <div className="flex justify-between gap-2">
          {["😢", "😟", "😐", "🙂", "😊"].map((emoji, i) => (
            <button
              key={i}
              className={`w-11 h-11 rounded-full flex items-center justify-center text-xl transition-all ${
                i === 2 ? "bg-white border-2 border-primary-500 scale-110 shadow-sm" : "bg-white/50 border-2 border-transparent"
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </section>

      <div className="flex justify-between items-center bg-white rounded-2xl p-4 mb-6 shadow-sm border border-neutral-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="text-xl font-bold text-accent-600">7</span>
          <span className="text-sm text-neutral-600">day streak</span>
        </div>
        <button className="text-xs font-semibold text-accent-700 bg-accent-50 px-3 py-1.5 rounded-full">
          Keep going!
        </button>
      </div>

      {inspiration && (
        <section className="bg-gradient-to-br from-primary-700 to-primary-600 rounded-3xl p-6 text-white mb-8 relative overflow-hidden shadow-lg">
          <div className="absolute top-[-10px] right-4 text-8xl font-heading opacity-10 leading-none">
            "
          </div>
          <div className="relative z-10">
            <p className="text-xs uppercase tracking-widest opacity-70 mb-2 font-body">
              Today's Inspiration
            </p>
            <p className="text-xl font-heading italic leading-relaxed mb-3">
              "{inspiration.text}"
            </p>
            <p className="text-sm opacity-70">— {inspiration.author}</p>
          </div>
        </section>
      )}

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Your Calm Tools</h3>
        <button className="text-sm font-medium text-primary-600 flex items-center">
          See all <ChevronRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-8">
        {pillars.map((pillar) => (
          <button
            key={pillar.id}
            onClick={() => navigate(pillar.path)}
            className={`relative ${pillar.color} rounded-3xl p-5 flex flex-col items-center text-center transition-transform active:scale-95 overflow-hidden group h-36 justify-center`}
          >
            {pillar.bgImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ backgroundImage: `url(${pillar.bgImage})` }}
              />
            )}
            <span className="text-3xl mb-2 relative z-10">{pillar.icon}</span>
            <span className="text-sm font-semibold text-neutral-900 relative z-10">{pillar.name}</span>
            <span className="text-[10px] text-neutral-500 mt-0.5 relative z-10">{pillar.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
