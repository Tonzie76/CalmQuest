import { Outlet, NavLink } from "react-router-dom";
import { Home, Sparkles, Gamepad2, Music, User, Settings } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MusicPlayer } from "../components/MusicPlayer";
import { usePlayerStore } from "../store/usePlayerStore";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RootLayout() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/inspirations", icon: Sparkles, label: "Daily" },
    { to: "/games", icon: Gamepad2, label: "Games" },
    { to: "/music", icon: Music, label: "Music" },
    { to: "/progress", icon: User, label: "Me" },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-gray-50",
      currentTrack ? "pb-36" : "pb-20"
    )}>
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary-600">Calm Quest</h1>
        <NavLink to="/settings" className="text-gray-500">
          <Settings size={24} />
        </NavLink>
      </header>

      <main className="max-w-md mx-auto">
        <Outlet />
      </main>

      <MusicPlayer />

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center py-2 px-4 z-10 max-w-md mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-colors",
                isActive ? "text-primary-600" : "text-gray-400 hover:text-gray-600"
              )
            }
          >
            <Icon size={24} />
            <span className="text-xs">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
