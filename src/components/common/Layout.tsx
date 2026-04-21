import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  ClipboardList, 
  Settings as SettingsIcon,
  Printer,
  ChevronRight,
  Heart,
  Sparkles
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const menuItems = [
    { name: '월간 대시보드', path: '/', icon: LayoutDashboard },
    { name: '좌담회 관리', path: '/zadankai', icon: Users },
    { name: '부서별 일정', path: '/meetings', icon: Calendar },
    { name: '멘토링 관리', path: '/mentoring', icon: UserPlus },
    { name: '여성부 행복총회', path: '/assembly', icon: Heart },
    { name: '지구별 제목회', path: '/chanting', icon: Sparkles },
    { name: '운영회의 기록', path: '/reports', icon: ClipboardList },
    { name: '시스템 설정', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col no-print fixed h-full z-10">
        <div className="p-8">
          <h1 className="text-2xl font-black text-blue-600 tracking-tight">KSGI 지부 파트너</h1>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Branch Management System</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center group px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                isActive 
                  ? "bg-blue-50 text-blue-700 shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn(
                    "w-5 h-5 mr-3 transition-colors",
                    isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                  )} />
                  <span>{item.name}</span>
                  {isActive && <ChevronRight className="ml-auto w-4 h-4 text-blue-400" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <span className="text-blue-700 font-bold">여</span>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">계수지부 여성부장</p>
                <p className="text-xs text-slate-500">운영 모드 활성 중</p>
              </div>
            </div>
            <button className="w-full text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-1">
              <SettingsIcon className="w-3 h-3" /> 환경 설정
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-8 flex items-center justify-between no-print">
          <div>
            <h2 className="text-lg font-bold text-slate-800">지부 운영 자동화 시스템</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-all" onClick={() => window.print()}>
              <Printer className="w-4 h-4" /> 인쇄하기
            </button>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
              월간 보고서 생성
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
