import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { LayoutGrid, ListTodo, Settings as SettingsIcon, Zap, Sparkles, Archive } from 'lucide-react';
import { useStore } from './store/useStore.ts';
import { Page } from './types.ts';
import Dashboard from './pages/Dashboard.tsx';
import TasksPage from './pages/TasksPage.tsx';
import SettingsPage from './pages/Settings.tsx';
import Focus from './pages/Focus.tsx';
import Assistant from './pages/Assistant.tsx';
import CompletedPage from './pages/CompletedPage.tsx';
import AuthPage from './pages/AuthPage.tsx';

const SplashScreen = ({ onFinish }: { onFinish: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("IGNITING CORE...");
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Progress sequence simulation
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setOpacity(0), 600); // Fade out transition
          setTimeout(onFinish, 1600); // Unmount after fade
          return 100;
        }
        return p + Math.random() * 8; // Randomize speed slightly
      });
    }, 150);

    // Tech text sequence
    const texts = [
        "IGNITING CORE...", 
        "SYNCHRONIZING NEURAL NET...", 
        "LOADING SOLAR MODULES...", 
        "OPTIMIZING WORKFLOW...", 
        "ESTABLISHING CONNECTION...", 
        "SYSTEM READY"
    ];
    let textIdx = 0;
    const textInterval = setInterval(() => {
        if (textIdx < texts.length - 1) {
            textIdx++;
            setText(texts[textIdx]);
        }
    }, 800);

    return () => {
        clearInterval(interval);
        clearInterval(textInterval);
    };
  }, [onFinish]);

  return (
    <div 
        className="fixed inset-0 z-[1000] bg-[#020410] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000"
        style={{ opacity }}
    >
        {/* Ambient Background (Deep Space / Nebula feel) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1c2e] via-[#020410] to-black opacity-60 z-0 animate-pulse-slow" />
        
        {/* Animated Dust/Grain Overlay for Cinematic feel */}
        <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] animate-grain" />

        <div className="relative z-10 flex flex-col items-center scale-110 md:scale-100">
            {/* Solar Gas Infinity Symbol Container */}
            <div className="relative w-80 h-40 flex items-center justify-center mb-10">
                {/* The 'Gas' Blobs - Solar Colors */}
                <div className="absolute w-32 h-32 bg-[#FF8C42] rounded-full blur-[50px] animate-orbit-1 opacity-50 mix-blend-screen" />
                <div className="absolute w-32 h-32 bg-[#F04393] rounded-full blur-[50px] animate-orbit-2 opacity-50 mix-blend-screen" />
                <div className="absolute w-40 h-40 bg-[#8D46E7] rounded-full blur-[60px] animate-orbit-3 opacity-40 mix-blend-screen" />
                
                {/* The Symbol Itself */}
                <span className="text-9xl font-black text-white/90 relative z-10 drop-shadow-[0_0_30px_rgba(240,67,147,0.6)] animate-pulse-slow font-mono">
                    ∞
                </span>
                
                {/* Core Flare */}
                <div className="absolute w-full h-1 bg-white/20 blur-xl top-1/2 -translate-y-1/2 animate-expand" />
            </div>

            {/* Cinematic Title Reveal */}
            <div className="overflow-hidden mb-12">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF8C42] via-[#F04393] to-[#8D46E7] animate-cinematic-reveal drop-shadow-2xl">
                    PRODUCTIVE
                </h1>
            </div>

            {/* Tech Status Line */}
            <div className="flex flex-col items-center gap-3 w-64 md:w-80">
                <div className="flex justify-between w-full text-[9px] font-black uppercase tracking-[0.3em] text-[#F04393]/80 font-mono">
                    <span className="animate-pulse">{text}</span>
                    <span>{Math.min(100, Math.round(progress))}%</span>
                </div>
                <div className="w-full h-[2px] bg-white/5 overflow-hidden relative rounded-full">
                    <div 
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#FF8C42] via-[#F04393] to-[#8D46E7] shadow-[0_0_20px_#F04393]" 
                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    />
                </div>
            </div>
        </div>
        
        <style>{`
            @keyframes orbit-1 {
                0% { transform: translate(-40px, -20px) scale(1); }
                33% { transform: translate(40px, 40px) scale(1.2); }
                66% { transform: translate(-20px, 40px) scale(0.9); }
                100% { transform: translate(-40px, -20px) scale(1); }
            }
            @keyframes orbit-2 {
                0% { transform: translate(40px, -30px) scale(1.1); }
                33% { transform: translate(-40px, 20px) scale(0.9); }
                66% { transform: translate(30px, 50px) scale(1.2); }
                100% { transform: translate(40px, -30px) scale(1.1); }
            }
            @keyframes orbit-3 {
                0% { transform: translate(0px, 50px) scale(0.8); }
                50% { transform: translate(0px, -50px) scale(1.1); }
                100% { transform: translate(0px, 50px) scale(0.8); }
            }
            @keyframes cinematic-reveal {
                0% { transform: translateY(100%); opacity: 0; letter-spacing: 0.3em; filter: blur(20px); }
                100% { transform: translateY(0); opacity: 1; letter-spacing: -0.05em; filter: blur(0px); }
            }
            @keyframes expand {
                0% { transform: scaleX(0); opacity: 0; }
                50% { transform: scaleX(1); opacity: 1; }
                100% { transform: scaleX(0); opacity: 0; }
            }
            @keyframes grain {
                0%, 100% { transform: translate(0, 0); }
                10% { transform: translate(-5%, -10%); }
                20% { transform: translate(-15%, 5%); }
                30% { transform: translate(7%, -25%); }
                40% { transform: translate(-5%, 25%); }
                50% { transform: translate(-15%, 10%); }
                60% { transform: translate(15%, 0%); }
                70% { transform: translate(0%, 15%); }
                80% { transform: translate(3%, 35%); }
                90% { transform: translate(-10%, 10%); }
            }
            .animate-orbit-1 { animation: orbit-1 8s infinite ease-in-out; }
            .animate-orbit-2 { animation: orbit-2 10s infinite ease-in-out; }
            .animate-orbit-3 { animation: orbit-3 12s infinite ease-in-out; }
            .animate-cinematic-reveal { animation: cinematic-reveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            .animate-expand { animation: expand 3s ease-in-out infinite; }
            .animate-grain { animation: grain 8s steps(10) infinite; }
        `}</style>
    </div>
  );
};

const Navigation = () => {
  const location = useLocation();
  const { widgets, userName } = useStore();
  
  const navItems = [
    { id: Page.Dashboard, icon: LayoutGrid, label: 'Dash' },
    { id: Page.Tasks, icon: ListTodo, label: 'Tasks' },
    ...(widgets.focus ? [{ id: Page.Focus, icon: Zap, label: 'Focus' }] : []),
    ...(widgets.focus ? [{ id: Page.Assistant, icon: Sparkles, label: 'AI' }] : []),
    { id: 'completed', icon: Archive, label: 'Archive' },
    { id: 'settings', icon: SettingsIcon, label: 'Settings' },
  ];

  return (
    <div className="
      fixed z-50 glass-panel transition-all duration-300 shadow-2xl border-white/10
      /* Mobile: Bottom Center, Horizontal */
      bottom-6 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 p-2 rounded-[2.5rem] max-w-[95vw] overflow-x-auto no-scrollbar
      /* Desktop: Left Center, Vertical */
      md:left-6 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:translate-x-0 md:flex-col md:gap-4 md:p-3 md:rounded-[2rem] md:w-auto md:max-w-none md:overflow-visible
    ">
      {navItems.map(item => {
        const isActive = location.pathname === (item.id === 'dashboard' ? '/' : `/${item.id}`);
        return (
          <Link
            key={item.id}
            to={item.id === 'dashboard' ? '/' : `/${item.id}`}
            className={`relative p-3 md:p-3.5 rounded-[1.5rem] transition-all duration-300 group flex items-center justify-center flex-shrink-0
              ${isActive ? 'bg-gradient-primary text-white shadow-lg scale-110' : 'hover:bg-white/10 text-white/40 hover:text-white hover:scale-105'}`}
          >
             <item.icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? 'fill-current' : ''}`} />
             {isActive && (
               <div className="absolute 
                 /* Mobile: Tooltip Top */
                 -top-14 left-1/2 -translate-x-1/2
                 /* Desktop: Tooltip Right */
                 md:top-1/2 md:left-full md:ml-4 md:translate-x-0 md:-translate-y-1/2 md:bottom-auto
                 bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 animate-in fade-in duration-200 shadow-xl pointer-events-none whitespace-nowrap hidden md:block z-[60]">
                 {item.label}
                 {/* Arrow adjustment */}
                 <div className="absolute w-2 h-2 bg-white rotate-45
                    /* Mobile Arrow */
                    -bottom-1 left-1/2 -translate-x-1/2
                    /* Desktop Arrow */
                    md:left-[-3px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto
                 " />
               </div>
             )}
          </Link>
        );
      })}

      {userName && (
        <>
            <div className="w-px h-8 md:w-8 md:h-px bg-white/10 mx-1 md:my-1 flex-shrink-0" />
            <div className="relative group px-1 flex-shrink-0">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-[#FF8C42] to-[#F04393] p-[2px] shadow-lg cursor-default transition-transform hover:scale-105">
                    <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center overflow-hidden">
                        <span className="text-sm font-black text-white">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                </div>
                 <div className="absolute 
                    /* Mobile Tooltip */
                    -top-14 left-1/2 -translate-x-1/2
                    /* Desktop Tooltip */
                    md:top-1/2 md:left-full md:ml-4 md:translate-x-0 md:-translate-y-1/2 md:bottom-auto
                    bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl pointer-events-none whitespace-nowrap mb-2 md:mb-0 z-[60]">
                     {userName}
                     <div className="absolute w-2 h-2 bg-white rotate-45
                        /* Mobile Arrow */
                        -bottom-1 left-1/2 -translate-x-1/2
                        /* Desktop Arrow */
                        md:left-[-3px] md:top-1/2 md:-translate-y-1/2 md:bottom-auto
                     " />
                 </div>
            </div>
        </>
      )}
    </div>
  );
};

const AppContent = () => {
  return (
    <>
      <div className="pt-24 px-4 md:px-8 max-w-[1600px] mx-auto min-h-screen
         /* Mobile Padding */
         pb-32
         /* Desktop Padding */
         md:pb-10 md:pl-32
      ">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/assistant" element={<Assistant />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Navigation />
    </>
  );
};

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { theme, brandColors, isAuthenticated } = useStore();

  useEffect(() => {
    // Apply theme colors to root
    const root = document.documentElement;
    root.style.setProperty('--brand-color-1', brandColors[0]);
    root.style.setProperty('--brand-color-2', brandColors[1]);
    root.style.setProperty('--brand-color-3', brandColors[2]);
  }, [brandColors]);

  // If splash is running, show it
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // If not authenticated, show auth page
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  // Otherwise show the main app
  return (
    <HashRouter>
       <AppContent />
    </HashRouter>
  );
};

export default App;