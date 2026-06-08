import { Outlet, NavLink } from "react-router-dom";
import { Home, Sparkles, Gamepad2, Music, User } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function RootLayout() {
  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/inspirations", icon: Sparkles, label: "Inspire" },
    { to: "/games", icon: Gamepad2, label: "Games" },
    { to: "/music", icon: Music, label: "Music" },
    { to: "/progress", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5f1] pb-24">
      <main>
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-neutral-200 flex justify-around items-center py-3 px-4 z-50 max-w-[430px] mx-auto rounded-t-3xl shadow-[0_-1px_3px_rgba(0,0,0,0.04)]">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 transition-all duration-300",
                isActive ? "text-primary-600 scale-110" : "text-neutral-400 hover:text-neutral-600"
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
