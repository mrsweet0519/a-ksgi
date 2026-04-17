import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  UserPlus, 
  TrendingUp, 
  Image as ImageIcon, 
  FileText,
  PlusCircle,
  AlertCircle
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
import StatsCard from '../components/dashboard/StatsCard';
import { cn } from '../utils/cn';

const dummyData = [
  { name: '1월', attendees: 45, new: 5 },
  { name: '2월', attendees: 52, new: 8 },
  { name: '3월', attendees: 48, new: 4 },
  { name: '4월', attendees: 61, new: 12 },
];

const DashboardPage = () => {
  const [currentMonth] = useState('4월');

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <section className="flex items-end justify-between">
        <div>
          <p className="text-blue-600 font-bold mb-1">2026년 {currentMonth}</p>
          <h2 className="text-4xl font-black text-slate-900 leading-tight">지부 운영 현황 <span className="text-slate-300">|</span> 요약</h2>
        </div>
        <div className="flex gap-2">
          <button className="btn-primary flex items-center gap-2">
            <PlusCircle className="w-5 h-5" /> 새 일정 등록
          </button>
        </div>
      </section>

      {/* Stats Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="좌담회 총 인원"
          value="124명"
          description="지난달 대비 12% 증가"
          icon={Users}
          trend={{ value: 12, isUp: true }}
          color="blue"
        />
        <StatsCard 
          title="신규 참석자"
          value="15명"
          description="확대 진행률 85%"
          icon={UserPlus}
          trend={{ value: 5, isUp: true }}
          color="indigo"
        />
        <StatsCard 
          title="진행된 부원회"
          value="8회"
          description="여성부 4, 미래부 2, 기타 2"
          icon={Calendar}
          color="purple"
        />
        <StatsCard 
          title="멘토링 매칭"
          value="92%"
          description="미매칭 인원: 3명"
          icon={TrendingUp}
          trend={{ value: 2, isUp: true }}
          color="emerald"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-800">참석자 추이 분석</h3>
                <p className="text-sm text-slate-400 font-medium">최근 4개월간의 좌담회 참석 통계</p>
              </div>
              <select className="bg-slate-50 border-none text-sm font-bold text-slate-500 rounded-lg px-3 py-1.5 outline-none">
                <option>전체 부서</option>
                <option>여성부</option>
                <option>미래부</option>
              </select>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dummyData}>
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

          {/* Quick Automation Section */}
          <div className="card border-blue-100 bg-blue-50/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-800">사진으로 자동 정리하기</h3>
                <p className="text-sm text-slate-500 font-medium">명단이나 회의록 사진을 올리면 데이터가 자동으로 채워집니다.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors group">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <PlusCircle className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-sm font-bold text-slate-700">여기에 사진 올리기</p>
                <p className="text-xs text-slate-400 mt-1">파일 선택 또는 드래그</p>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white rounded-xl p-4 flex items-center gap-3 border border-slate-100 shadow-sm">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-700">최근 분석: 좌담회_명단.jpg</p>
                    <div className="w-full bg-slate-100 h-1 rounded-full mt-2">
                      <div className="bg-blue-600 h-1 rounded-full w-[100%] line-progress"></div>
                    </div>
                  </div>
                  <span className="text-xs font-black text-blue-600">완료</span>
                </div>
                <p className="text-xs text-slate-400 px-1 italic">* 인식된 명단이 자동으로 '좌담회 관리'에 추가되었습니다.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Features */}
        <div className="space-y-8">
          {/* Monthly Priority */}
          <div className="card overflow-hidden">
            <div className="p-6 pb-0">
              <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500" /> 이번 달 중점 과제
              </h3>
            </div>
            <div className="px-6 pb-6 space-y-4">
              {[
                { label: '청년스쿨 실질 명단 확정', status: 'done' },
                { label: '멘토링 1:1 근행회 일정 점검', status: 'pending' },
                { label: '3월 좌담회 결과 보고서 출력', status: 'pending' },
                { label: '신규 참석자 후속 접촉', status: 'pending' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group cursor-pointer">
                  <div className={cn(
                    "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                    item.status === 'done' ? "bg-blue-600 border-blue-600" : "border-slate-300 group-hover:border-blue-400"
                  )}>
                    {item.status === 'done' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className={cn(
                    "text-sm font-bold",
                    item.status === 'done' ? "text-slate-400 line-through" : "text-slate-700"
                  )}>{item.label}</span>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-center">
              <button className="text-xs font-black text-blue-600 hover:underline">일정 전체 보기 →</button>
            </div>
          </div>

          {/* Quick Report Generator */}
          <div className="card bg-gradient-to-br from-indigo-600 to-blue-700 text-white border-none shadow-xl shadow-blue-200">
            <h3 className="text-lg font-black mb-2">지부 운영회의 자료</h3>
            <p className="text-sm text-indigo-100 mb-6 font-medium leading-relaxed">준비된 데이터를 바탕으로 이번 달 회의 안건지를 즉시 생성합니다.</p>
            <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-black text-sm shadow-lg hover:shadow-white/20 transition-all active:scale-95">
              회의자료 초안 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
