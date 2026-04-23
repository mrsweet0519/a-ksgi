import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  UserPlus, 
  TrendingUp, 
  ImageIcon, 
  FileText,
  PlusCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  ClipboardList,
  Target,
  ChevronRight,
  LayoutDashboard,
  GraduationCap,
  Heart,
  Settings,
  CheckCircle2
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/dashboard/StatsCard';
import { cn } from '../utils/cn';
import { mockDashboardStats, mockZadankais } from '../data/mockData';

const chartData = [
  { name: '1월', attendees: 45, new: 5 },
  { name: '2월', attendees: 52, new: 8 },
  { name: '3월', attendees: 48, new: 4 },
  { name: '4월', attendees: 61, new: 12 },
];

const DashboardPage = () => {
  const [currentMonth] = useState('4월');
  const navigate = useNavigate();

  const quickLinks = [
    { title: '좌담회 관리', icon: Users, path: '/zadankai', color: 'blue' },
    { title: '청년스쿨 관리', icon: GraduationCap, path: '/youth-school', color: 'indigo' },
    { title: '멘토링 관리', icon: Heart, path: '/mentoring', color: 'rose' },
    { title: '부서별 부원회', icon: ClipboardList, path: '/meetings', color: 'purple' },
    { title: '운영회의 자료', icon: FileText, path: '/operations-meeting', color: 'emerald' },
    { title: '출력 센터', icon: LayoutDashboard, path: '/reports', color: 'amber' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold mb-1">
            <Target className="w-4 h-4" />
            <span>2026년 {currentMonth} 운영 관제 모드</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 leading-tight">지부 운영 현황 <span className="text-slate-300">|</span> 리더보드</h2>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2" onClick={() => navigate('/settings')}>
            <Settings className="w-5 h-5" /> 설정
          </button>
          <button className="btn-primary flex items-center gap-2" onClick={() => navigate('/zadankai')}>
            <PlusCircle className="w-5 h-5" /> 새 일정 등록
          </button>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="좌담회 총 인원"
          value={`${mockDashboardStats.totalAttendees}명`}
          description="이번 달 목표 인원 대비 92%"
          icon={Users}
          trend={{ value: 12, isUp: true }}
          color="blue"
        />
        <StatsCard 
          title="신규 참석자"
          value={`${mockDashboardStats.newAttendees}명`}
          description={`후속 연락 대상: ${mockDashboardStats.followUpNeededCount}명`}
          icon={UserPlus}
          trend={{ value: 5, isUp: true }}
          color="indigo"
        />
        <StatsCard 
          title="진행된 부원회"
          value={`${mockDashboardStats.departmentMeetingCount}회`}
          description="여성부 4, 미래부 2, 기타 2"
          icon={Calendar}
          color="purple"
        />
        <StatsCard 
          title="멘토링 매칭률"
          value={`${mockDashboardStats.mentoringMatchingRate}%`}
          description={`미매칭 인원: ${mockDashboardStats.mentoringUnmatchedCount}명`}
          icon={TrendingUp}
          trend={{ value: 2, isUp: true }}
          color="emerald"
        />
      </section>

      {/* Youth & Mentoring Focused Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-100/50 p-4 rounded-3xl border border-slate-200/50">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">청년 실질 대상</p>
            <p className="text-lg font-black text-slate-800">{mockDashboardStats.youthSchoolTargetCount}명</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">청년 후속 관리</p>
            <p className="text-lg font-black text-slate-800">{mockDashboardStats.youthFollowUpCount}명</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">멘토링 매칭 완료</p>
            <p className="text-lg font-black text-slate-800">{mockDashboardStats.mentoringCompletedCount}건</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">멘토 미매칭</p>
            <p className="text-lg font-black text-slate-800">{mockDashboardStats.mentoringUnmatchedCount}명</p>
          </div>
        </div>
      </section>

      {/* Quick Access Menu */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickLinks.map((link) => (
          <button 
            key={link.path}
            onClick={() => navigate(link.path)}
            className="flex flex-col items-center p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-premium hover:border-blue-200 transition-all group"
          >
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform",
              link.color === 'blue' ? "bg-blue-50 text-blue-600" :
              link.color === 'indigo' ? "bg-indigo-50 text-indigo-600" :
              link.color === 'rose' ? "bg-rose-50 text-rose-600" :
              link.color === 'purple' ? "bg-purple-50 text-purple-600" :
              link.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
              "bg-amber-50 text-amber-600"
            )}>
              <link.icon className="w-6 h-6" />
            </div>
            <span className="text-xs font-black text-slate-700">{link.title}</span>
          </button>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chart Area */}
          <div className="card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-800">참석자 추이 분석</h3>
                <p className="text-sm text-slate-400 font-medium">최근 4개월간의 좌담회 참석 통계</p>
              </div>
              <div className="flex gap-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div> 참석자
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                  <div className="w-2 h-2 bg-slate-300 rounded-full"></div> 신규
                </span>
              </div>
            </div>
            
            <div className="h-[300px] min-h-[300px] w-full min-w-0">
              <ResponsiveContainer width="100%" height={300} minWidth={0}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorAttendees" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      padding: '12px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="attendees" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorAttendees)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Schedules */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" /> 이번 달 남은 주요 일정
              </h3>
              <button className="text-xs font-black text-blue-600 hover:underline">전체 일정 보기</button>
            </div>
            <div className="space-y-4">
              {mockZadankais.filter(z => z.status === 'scheduled').map(schedule => (
                <div key={schedule.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                      <span className="text-[10px] font-black text-slate-400 uppercase">APR</span>
                      <span className="text-lg font-black text-slate-800">{schedule.date.split('-')[2]}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-800 group-hover:text-blue-600 transition-colors">{schedule.sessionNumber}</h4>
                      <p className="text-xs font-bold text-slate-400 mt-0.5">{schedule.place} | {schedule.targetGroup}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
              {mockZadankais.filter(z => z.status === 'scheduled').length === 0 && (
                <p className="text-sm text-slate-400 text-center py-4 italic">예정된 일정이 없습니다.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar: To-Do & Quick Report */}
        <div className="space-y-8">
          {/* Monthly Priority (To-Do) */}
          <div className="card overflow-hidden">
            <div className="p-6 pb-0">
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" /> 필수 체크 항목
              </h3>
            </div>
            <div className="px-6 pb-6 space-y-4">
              {[
                { label: '청년스쿨 실질 명단 확정', status: 'done' },
                { label: '멘토링 1:1 근행회 일정 점검', status: 'pending' },
                { label: '3월 좌담회 결과 보고서 출력', status: 'pending' },
                { label: '신규 참석자 후속 접촉', status: 'pending', count: mockDashboardStats.followUpNeededCount },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                    item.status === 'done' ? "bg-blue-600 border-blue-600" : "border-slate-300 group-hover:border-blue-400"
                  )}>
                    {item.status === 'done' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <div className="flex-1">
                    <span className={cn(
                      "text-sm font-bold",
                      item.status === 'done' ? "text-slate-400 line-through" : "text-slate-700"
                    )}>{item.label}</span>
                    {item.count && !item.status.includes('done') && (
                      <span className="ml-2 text-[10px] font-black bg-rose-50 text-rose-500 px-1.5 py-0.5 rounded-full">{item.count}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full bg-slate-50 p-4 border-t border-slate-100 text-center text-xs font-black text-blue-600 hover:bg-slate-100 transition-colors">
              업무 체크리스트 전체 보기 →
            </button>
          </div>

          {/* Quick Report Generator */}
          <div className="card bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-xl shadow-blue-200">
            <div className="p-1 bg-white/20 rounded-lg w-fit mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black mb-2">지부 운영회의 자료</h3>
            <p className="text-sm text-indigo-100 mb-6 font-medium leading-relaxed">입력된 데이터를 바탕으로 이번 달 지부 회의용 보고서를 즉시 생성합니다.</p>
            <button 
              onClick={() => navigate('/operations-meeting')}
              className="w-full bg-white text-blue-700 py-3 rounded-xl font-black text-sm shadow-lg hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group"
            >
              회의자료 초안 생성 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
