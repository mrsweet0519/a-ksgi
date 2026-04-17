import { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Calendar,
  Download
} from 'lucide-react';
import { cn } from '../utils/cn';

const JwadamPage = () => {
  const [activeTab, setActiveTab] = useState('전체');

  // Dummy monthly meetings
  const meetings = [
    { id: 1, title: '4월 정기 좌담회', date: '2026-04-15', location: '제1회관', attendees: 32, target: 40, status: 'completed' },
    { id: 2, title: '4월 지역 좌담회 (A지역)', date: '2026-04-18', location: '박영희님 댁', attendees: 12, target: 15, status: 'pending' },
    { id: 3, title: '4월 지역 좌담회 (B지역)', date: '2026-04-20', location: '이순자님 댁', attendees: 0, target: 12, status: 'scheduled' },
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-900">좌담회 관리</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">월별 좌담회 일정 및 참석 현황을 관리합니다.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center gap-2">
            <Download className="w-4 h-4" /> 엑셀 다운로드
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" /> 새 좌담회 등록
          </button>
        </div>
      </section>

      {/* Tabs & Search */}
      <section className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['전체', '진행 완료', '예정', '미진행'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2 text-sm font-black rounded-lg transition-all",
                activeTab === tab 
                  ? "bg-white text-blue-600 shadow-sm" 
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="좌담회명 또는 장소 검색..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
      </section>

      {/* Meeting List */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="card card-hover">
            <div className="flex justify-between items-start mb-4">
              <div className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                meeting.status === 'completed' ? "bg-emerald-50 text-emerald-600" : 
                meeting.status === 'pending' ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"
              )}>
                {meeting.status === 'completed' ? '완료' : meeting.status === 'pending' ? '인원 확인 중' : '진행 예정'}
              </div>
              <button className="text-slate-300 hover:text-slate-500">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-black text-slate-800 mb-2">{meeting.title}</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Calendar className="w-4 h-4 text-slate-400" />
                {meeting.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Users className="w-4 h-4 text-slate-400" />
                {meeting.location}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-black mb-1">
                <span className="text-slate-500">참석 목표</span>
                <span className="text-blue-600">{meeting.attendees} / {meeting.target}명</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(meeting.attendees / meeting.target) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-slate-50 flex gap-2">
              <button className="flex-1 py-2 text-xs font-black text-slate-600 border border-slate-100 rounded-lg hover:bg-slate-50 transition-all">
                명단 보기
              </button>
              <button className="flex-1 py-2 text-xs font-black text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all">
                참석 입력
              </button>
            </div>
          </div>
        ))}
        
        {/* Add Card */}
        <button className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/10 transition-all group">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center mb-3 group-hover:border-blue-400 group-hover:bg-blue-50 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <span className="font-bold">새 일정을 만드세요</span>
        </button>
      </section>

      {/* Analysis Table Placeholder */}
      <section className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-black text-slate-800">월간 참석 추이 분석</h3>
          <button className="text-xs font-black text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all">
            상세 보고서 보기
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">날짜</th>
                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">좌담회명</th>
                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">신규인원</th>
                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">참석율</th>
                <th className="pb-4 text-xs font-black text-slate-400 uppercase tracking-widest">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { date: '04-15', name: '4월 정기 좌담회', new: 5, rate: '80%', status: 'success' },
                { date: '03-12', name: '3월 정기 좌담회', new: 3, rate: '75%', status: 'success' },
                { date: '02-14', name: '2월 정기 좌담회', new: 8, rate: '88%', status: 'success' },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 text-sm font-bold text-slate-500">{row.date}</td>
                  <td className="py-4 text-sm font-black text-slate-800">{row.name}</td>
                  <td className="py-4 text-sm font-bold text-blue-600">+{row.new}명</td>
                  <td className="py-4 text-sm font-black text-slate-700">{row.rate}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-600">
                      <CheckCircle2 className="w-3 h-3" /> 완료됨
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default JwadamPage;
